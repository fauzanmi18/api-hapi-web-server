const Hapi = require('@hapi/hapi')
const routes = require('./router/routes')

const init = async() => {
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