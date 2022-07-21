import { Router } from 'express'

export const homeRouter = Router()

const SECTION_TITLE = 'Home Page'

homeRouter.get("/", (req, res, next) => {
    res.render('home', { title: SECTION_TITLE })
})