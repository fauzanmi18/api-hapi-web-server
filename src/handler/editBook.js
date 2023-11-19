const books = require('../books/books')

const editBooks = (request, h) => {
    const { id } = request.params
    const updatedAt = new Date().toISOString()
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

    if(!name){
        const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Mohon isi nama buku',
        });
        response.code(400)
        return response
    }

    if(readPage > pageCount){
        const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
        });
        response.code(400)
        return response
    }

    const index = books.findIndex((b) => b.id === id)
    if(index !== -1){
        books[index] = {
            ...books[index],
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            reading,
            updatedAt
          }
          const response = h.response({
            status: 'success',
            message: 'Buku berhasil diperbarui'
          })
          response.code(200)
          return response
        }

    const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan',
    })
    response.code(404)
    return response
}

module.exports = {editBooks}