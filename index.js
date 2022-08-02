import express from 'express'
import compression from 'compression'

import { homeRouter } from "./routers/home.js";
import { messageRouter } from "./routers/message.js";
import { simpleFormRouter } from "./routers/simpleForm.js";
import { questionsRouter } from "./routers/questions.js";
import { mongoStatus, mongoConnect, mongoClose } from "./routers/mongostatus.js";
import { cfg } from "./cfg.js";

const app = express()

// compression and x-powered-by
app.use(compression())
app.disable('x-powered-by')

// template engine EJS
app.set('view engine', 'ejs')
app.set('views', cfg.dir.views)

// body parsing
app.use(express.urlencoded({ extended: true }))

// routing and middleware
app.use('/', homeRouter) // home page
app.use('/message', messageRouter) // message section
app.use('/simpleform', simpleFormRouter) // simple form section
app.use('/questions', questionsRouter) // questions sections
app.use('/_mongostatus', mongoStatus) // mongo status tech section

// static files
app.use(express.static(cfg.dir.static))

// not found by default
app.use((req, res) => {
    res.status(404).send('Not found')
})

app.listen(cfg.port, () => {
    mongoConnect()
        .catch(err => {
            console.log(`Error while connecting to the database: ${err.message}`)
            process.exit(-1)
        })
        .then(version => {
            console.log(`Successfully connected to the mongoDB! Recordset version is ${version}`)
            console.log(`Example app listening at http://localhost:${cfg.port}`)
        })
})

process.on('exit', () => {
    mongoClose()
})