import convertHourToMinutes from "../utils/convertHourToMinutes";
import db from "../database/connection";
import { Request,Response } from "express";
interface scheduleItem {
    week_day: number,
    from: string,
    to: string,
}

export default class classesControler{
    async index (req:Request, res:Response) {
        try {
            const filters = req.query

            console.log(req.query) 

            if (!filters.week_day || !filters.subject || !filters.time){

                return res.status(400).json({
                    error: "Missing filter to search classes."
                })
            }

            const week_day = filters.week_day as string
            const subject = filters.subject as string
            const time = filters.time as string

            const timeInMinute = convertHourToMinutes(time)

            const classes = await db('classes')
                .whereExists(function(){
                    this.select('classe_schedule.*')
                        .from('classe_schedule')
                        .whereRaw('`classe_schedule`.`class_id` = `classes`.`id`')
                        .whereRaw('`classe_schedule`.`week_day` = ??',[Number(week_day)])
                        .whereRaw('`classe_schedule`.`from` <= ??', [Number(timeInMinute)])
                        .whereRaw('`classe_schedule`.`to` > ??', [Number(timeInMinute)])
                })
                .where('classes.subject','=',subject)
                .join('users', 'classes.user_id','=','users.id')
                .select(['classes.*','users.*'])


            res.json(classes)

        } catch (error) {
            console.log(error)

            return res.status(400).json({
                error: "Unexpected erro while search a class."
            })

        }
    }
    async create (req:Request, res:Response) {
        const { name, avatar, bio, whatsapp, subject, cost, schedule } = req.body

        console.log(req.body)

        const trx = await db.transaction();

        try {

            const insertedUsersIds = await trx('users').insert({
                name,
                avatar,
                bio,
                whatsapp
            })

            const user_id = insertedUsersIds[0]

            const insertedClassesIds = await trx('classes').insert({
                subject,
                cost,
                user_id
            })

            const class_id = insertedClassesIds[0]

            const classSchedule = schedule.map((scheduleItem: scheduleItem) => {
                return {
                    class_id,
                    week_day: scheduleItem.week_day,
                    from: convertHourToMinutes(scheduleItem.from),
                    to: convertHourToMinutes(scheduleItem.to)
                }
            })

            const insertedClassesSchedulesIds = await trx('classe_schedule').insert(classSchedule)

            await trx.commit();

            return res.status(201).json({
                user_id,
                class_id
            })

        } catch (error) {

            console.log(error)

            await trx.rollback();

            return res.status(400).json({
                error: "Unexpected erro while creating a new class."
            })

        }


    }
}