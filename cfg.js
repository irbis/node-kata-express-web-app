import {dirname, sep} from "path";
import {fileURLToPath} from "url";

const __dirname = dirname(fileURLToPath(import.meta.url)) + sep
export const cfg = {
    port: process.env.PORT || 3000,
    dir: {
        root: __dirname,
        static: __dirname + 'static' + sep,
        views: __dirname + 'views' + sep
    },
    mongo: {
        mongoUsername: process.env.MONGO_USERNAME,
        mongoPassword: process.env.MONGO_PASSWORD,
        mongoServer: process.env.MONGO_SERVER,
        mongoDatabase: process.env.MONGO_DATABASE,
        minPoolSize: '1',
        maxPoolSize: '5'
    }
}