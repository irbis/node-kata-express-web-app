import express from 'express'
import compression from 'compression'
import {helloRouter} from "./routers/hello.js";

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

app.get('/', (req, res) => {
    res.redirect('/hello')
})

app.use('/hello', helloRouter)

// static files
app.use(express.static(cfg.dir.static))

// not found by default
app.use((req, res) => {
    res.status(404).send('Not found')
})

app.listen(cfg.port, () => {
    console.log(`Example app listening at http://localhost:${cfg.port}`)
})