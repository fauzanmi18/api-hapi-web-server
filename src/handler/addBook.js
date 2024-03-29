const books = require('../books/books')

const addBook = (request, h) => {
    const { 
        name, 
        year, 
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading 
    } = request.payload
    const id = Math.random().toString(36).substring(2)
    const insertedAt = new Date().toISOString()
    const updatedAt = insertedAt
    const finished = pageCount == readPage

    if(!name){
        const response = h.response({
        status: 'fail',
        message: 'Gagal menambahkan buku. Mohon isi nama buku',
        });
        response.code(400)
        return response
    }

    if(readPage > pageCount){
        const response = h.response({
        status: 'fail',
        message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        });
        response.code(400)
        return response
    }

    const newBook = {
        id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt
    }
    
    books.push(newBook)
    const cekInsert = books.filter((book) => book.id === id).length > 0
    if(cekInsert){
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
              bookId: id,
            },
        })
        response.code(201)
        return response
    }
    const response = h.response({
        status: 'fail',
        message: 'Buku gagal ditambahkan',
    })
    response.code(500)
    return response

}

module.exports = {addBook}