// const books = require('../books/books')

const Books = require("../config/model");

const deleteBook = async(request, h) => {
    const { id } = request.params
   
    try {
      const existingBook = await Books.findOne({
          where: {
              id: id,
          },
      });

      if (!existingBook) {
          const response = h.response({
              status: 'fail',
              message: 'Buku tidak ditemukan',
          });
          response.code(404);
          return response;
      }
      
      await existingBook.destroy();

      const response = h.response({
          status: 'success',
          message: 'Buku berhasil dihapus',
      });
      response.code(200);
      return response;
  } catch (error) {
      console.error('Error while deleting book:', error);
      const response = h.response({
          status: 'fail',
          message: 'Gagal menghapus buku',
      });
      response.code(500);
      return response;
  }
}

module.exports = {deleteBook}