const Hapi = require('@hapi/hapi')
const routes = require('./router/routes')
const db = require('./config/database')
// const Books = require('./config/model')


const init = async() => {
    try {
        await db.authenticate({ logging: false })
        console.log('Database connected...')
    } catch (error) {
        console.log('failed to connect to database')
        console.log(error)
    }

    const server = Hapi.server({
        host: 'localhost',
        port: 9000,
        routes: {
            cors: {
                origin: ['*']
            }
        }
    })

    server.route(routes)

    await server.start()
    console.log(`Server running: ${server.info.uri}`)
}
init()