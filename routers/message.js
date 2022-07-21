import { Router } from 'express'

export const messageRouter = Router()

const SECTION_TITLE = 'Message section'

messageRouter.get("/", (req, res, next) => {
    res.render('message',
        {
            title: SECTION_TITLE,
            message: null
        })
})

messageRouter.get("/:name", (req, res, next) => {
    res.render('message',
        {
            title: SECTION_TITLE,
            message: `Hello ${req.params.name}`
        })
})