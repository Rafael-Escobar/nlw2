import express from "express";
import classesControler from "./controllers/classesControler";
import connectionsControler from "./controllers/connectionsControler";

const routes = express.Router()

const classesControlers = new classesControler()
const connectionControlers = new connectionsControler()

routes.post('/classes', classesControlers.create)

routes.get('/classes', classesControlers.index)

routes.post('/connections', connectionControlers.create)

routes.get('/connections', connectionControlers.index)

export default routes;