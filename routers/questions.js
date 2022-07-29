import {Router} from 'express'
import fetch from 'node-fetch'

export const questionsRouter = Router()

const SECTION_TITLE = 'Fetch questions'
const quizAPI = 'https://opentdb.com/api.php?type=multiple&amount=1&category='
const categoriesId = [9, 18, 30]

questionsRouter.get("/", (req, res, next) => { getQuestions(res) })

async function getQuestions(res) {

    const queryResults = await Promise.allSettled(
        categoriesId.map( id => fetch(quizAPI + id) )
    )

    const questionObjects = await Promise.allSettled(
        queryResults
            .filter( q => q && q.status === 'fulfilled' && q.value)
            .map( q => q.value.json() )
    )

    const questions = questionObjects
        .filter(q => q && q.status === 'fulfilled' &&
            q.value && q.value.results && q.value.results[0])
        .map( q => q.value.results[0])

    res.render('questions',
        {
            title: SECTION_TITLE,
            questions: questions
        })
}
