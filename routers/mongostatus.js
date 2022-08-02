import { Router } from 'express'

import { MongoClient, ServerApiVersion } from 'mongodb'
import { cfg } from "../cfg.js";


const __mongoUri = `mongodb+srv://${cfg.mongo.mongoUsername}:${cfg.mongo.mongoPassword}@${cfg.mongo.mongoServer}/?retryWrites=true&w=majority`
const mongoClient = new MongoClient(__mongoUri,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverApi: ServerApiVersion.v1,
        minPoolSize: Number(cfg.mongo.minPoolSize),
        maxPoolSize: Number(cfg.mongo.maxPoolSize)
    })

function createResponseOk(res, version) {
    return res.json({
            connectionStatus: "ok",
            datasetVersion: version
        })
}

function createResponseErr(res, err) {
    return res.json({
            connectionStatus: err.message,
            datasetVersion: null
        })
}

async function getDatasetVersion(mongoClient) {
    const mongoDatabase = await mongoClient.db(cfg.mongo.mongoDatabase)
    const versionCollection = await mongoDatabase.collection('version')
    const versions = await versionCollection.find({}).toArray()

    return versions[0].version
}

export const mongoStatus = Router()

export function mongoConnect() {
    return mongoClient.connect()
        .catch(err => { return err })
        .then(() => getDatasetVersion(mongoClient))
}

export function mongoClose() {
    mongoClient.close().then(() => {})
}

mongoStatus.get("/", (req, res) => {
    getDatasetVersion(mongoClient)
        .then(version => createResponseOk(res, version))
        .catch(err => createResponseErr(res, err))
})