import db from "../database/connection";
import { Request, Response } from "express";

export default class connectionsControler {

    async index(req: Request, res: Response) {
        try {
            
            const totalConnection= await db('connections').count('* as total')

            const {total} = totalConnection[0]

            return res.json({total})



        } catch (error) {
            console.log(error)

            return res.status(400).json({
                error: "Unexpected erro while search a connections."
            })
        }
    }
    async create(req: Request, res: Response) {
        
        const {user_id} = req.body

        console.log(req.body)

        const trx = await db.transaction();

        try {

            const insertedConnection = await trx('connections').insert({
                user_id
            })
            await trx.commit();

            return res.status(201).json({
                insertedConnection
            })

        } catch (error) {

            console.log(error)

            await trx.rollback();

            return res.status(400).json({
                error: "Unexpected erro while create a connections."
            })
        }
    }
}