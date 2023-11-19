const books = require('../books/books')

const getBook = (request, h) => {
    const { name, reading, finished } = request.query
    let cekBuku = [...books]
    
    if (reading) {
        cekBuku = cekBuku.filter(book => book.reading == (reading == 1))
    }

    if (finished) {
        cekBuku = cekBuku.filter(book => book.finished == (finished == 1))
    }

    if (name) {
        cekBuku = cekBuku.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()));
    }

    const response = h.response({
        status: 'success',
        data: {
          books: cekBuku.map((book) => ({
            id: book.id,
            name: book.name,
            publisher: book.publisher
          })),
        },
    })
    response.code(200)
    return response
}

module.exports = {getBook}
