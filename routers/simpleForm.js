import { Router } from 'express'

export const simpleFormRouter = Router()

const SECTION_TITLE = 'Simple Form'

simpleFormRouter.get("/", (req, res, next) => {
    res.render('simpleForm',
        {
            title: SECTION_TITLE,
            data: req.query
        })
})

simpleFormRouter.post("/", (req, res, next) => {
    res.render('simpleForm',
        {
            title: SECTION_TITLE,
            data: req.body
        })
})
