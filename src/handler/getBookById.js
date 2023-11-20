const books = require('../books/books')
const Books = require('../config/model')

const getBookDetail = async(request, h) => {
    const {id} = request.params

    try {
        const book = await Books.findAll({
            where:{
                id: id
            }
        })

        if(book.length > 0){
            const response = h.response({
                status: 'Success',
                data: book
            })
            response.code(200)
            return response
        }

        const response = h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan',
        });
        response.code(404)
        return response
    } catch (error) {
        const response = h.response({
        status: 'error',
        message: 'Error terjadi',
        error
        });
        response.code(500)
        return response
    }
}

module.exports = {getBookDetail}