const { addBook } = require("../handler/addBook")
const { deleteBook } = require("../handler/deleteBook")
const { editBooks } = require("../handler/editBook")
const { getBook } = require("../handler/getBook")
const { getBookDetail } = require("../handler/getBookById")

const routes = [
    {
        method: 'GET',
        path: '/books',
        handler: getBook
    },
    {
        method: 'POST',
        path: '/books',
        handler: addBook
    },
    {
        method: 'GET',
        path: '/books/{id}',
        handler: getBookDetail
    },
    {
        method: 'PUT',
        path: '/books/{id}',
        handler: editBooks
    },
    {
        method: 'DELETE',
        path: '/books/{id}',
        handler: deleteBook
    }
]

module.exports = routes