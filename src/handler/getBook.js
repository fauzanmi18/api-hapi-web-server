// const books = require('../books/books')
// const db = require('../config/database')
const Books = require('../config/model')

const getBook = async(request, h) => {
    const { name, reading, finished } = request.query

    try {
        const searchCriteria = {}
        if (name) {
            searchCriteria.name = name
        }
        if (reading) {
            searchCriteria.reading = reading
        }
        if (finished) {
            searchCriteria.finished = finished
        }

        const page = parseInt(request.query.page) || 1
        const perPage = parseInt(request.query.perPage) || 10

        const offset = (page - 1) * perPage

        const cekBuku = await Books.findAndCountAll({
            where: searchCriteria,
            limit: perPage,
            offset
            // attributes: ['id', 'name', 'publisher'],
        })

        const totalPages = Math.ceil(cekBuku.count / perPage)
        if(page > totalPages){
            const response = h.response({
                status: 'error',
                message: 'Page not found'
            })
            response.code(404)
            return response
        }

        const response = h.response({
            status: 'success',
            data: cekBuku.rows,
            perPage,
            currentPage: page,
            totalPages: totalPages,
            nextPage: page < totalPages ? page + 1 : null,
            lastPage: totalPages
        })
        response.code(200)
        return response
    } catch (error) {
        console.log('error while getting books', error)
        const response = h.response({
        status: 'error',
        message: 'Error terjadi'
        })
        response.code(500)
        return response
    }
    
}

module.exports = {getBook}
