// const books = require('../books/books')
const Books = require('../config/model')

const editBooks = async(request, h) => {
    const { id } = request.params
    // const updatedAt = new Date().toLocaleString('en-US',{ timeZone: 'Asia/Jakarta' })
    try {
        const existingBook = await Books.findOne({
            where: {
                id: id,
            },
        })

        if (!existingBook) {
            const response = h.response({
                status: 'fail',
                message: 'Buku tidak ditemukan',
            })
            response.code(404)
            return response
        }

        const {
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            reading,
        } = request.payload

        const updatedBook = await existingBook.update({
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            reading
        })

        const response = h.response({
            status: 'success',
            message: 'Buku berhasil diperbarui',
            data: {
                book: {
                    id: updatedBook.id,
                    name: updatedBook.name,
                    publisher: updatedBook.publisher
                },
            },
        })
        response.code(200)
        return response
    } catch (error) {
        console.error('Error while updating book:', error)
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku',
        })
        response.code(500)
        return response
    }
}

module.exports = {editBooks}