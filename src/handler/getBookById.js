const books = require('../books/books')

const getBookDetail = (request, h) => {
    const {id} = request.params

    const book = books.filter((b) => b.id === id)[0]
   
    if (book !== undefined) {
        return {
                status: 'success',
                data: {
                    book: book
                },
            }
        }
    
        const response = h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan',
        });
        response.code(404)
        return response
}

module.exports = {getBookDetail}