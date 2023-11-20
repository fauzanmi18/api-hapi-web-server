// const books = require('../books/books')
const Books = require('../config/model')

const addBook = async(request, h) => {
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
    // const id = Math.random().toString(36).substring(2)
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

    if(parseInt(readPage) > parseInt(pageCount)){
        const response = h.response({
        status: 'fail',
        message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        });
        response.code(400)
        return response
    }

    const newBook = {
       id:'', name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt
    }
    
    try {
        const insert = await Books.create(newBook)
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
              bookId: insert.id,
              name: insert.name
            },
        })
        response.code(201)
        return response
    } catch (error) {
        const response = h.response({
            status: 'fail',
            message: 'Buku gagal ditambahkan',
            error
        })
        response.code(500)
        return response
    }
}

module.exports = {addBook}