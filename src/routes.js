const {
  addNoteHandler,
  getAllBooksHandler,
  getBooksByIdHandler,
} = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addNoteHandler,
  },
  {
    method: 'GET',
    path: '/books',
    handler: getAllBooksHandler,
  },
  {
    method: 'GET',
    path: '/books/{id}',
    handler: getBooksByIdHandler,
  },
  {
    method: 'PUT',
    path: '/books/{id}',
    handler: () => {},
  },
];

module.exports = routes;
