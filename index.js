import express from 'express'
import compression from 'compression'

import { homeRouter } from "./routers/home.js";
import { messageRouter } from "./routers/message.js";
import { simpleFormRouter } from "./routers/simpleForm.js";

import { fileURLToPath } from 'url'
import { dirname, sep } from 'path'

// configuration
const __dirname = dirname(fileURLToPath(import.meta.url)) + sep
const cfg = {
    port: process.env.PORT || 3000,
    dir: {
        root: __dirname,
        static: __dirname + 'static' + sep,
        views: __dirname + 'views' + sep
    }
}

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

// static files
app.use(express.static(cfg.dir.static))

// not found by default
app.use((req, res) => {
    res.status(404).send('Not found')
})

app.listen(cfg.port, () => {
    console.log(`Example app listening at http://localhost:${cfg.port}`)
})