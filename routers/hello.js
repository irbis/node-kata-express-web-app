import { Router } from 'express'

export const helloRouter = Router()

helloRouter.get("/", (req, res, next) => {
    res.render('message', { title: 'Hello again' })
})

helloRouter.get("/:name", (req, res, next) => {
    res.render('message', { title: `Hello ${req.params.name}` })
})