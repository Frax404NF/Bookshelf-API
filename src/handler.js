const { nanoid } = require('../node_modules/nanoid');
const books = require('./books');

const addbookhandler = (request, h) => {
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = request.payload;

  if (name === undefined) {
    const response = h.response({
      status: 'fail',
      messege: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);

    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      messege: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);

    return response;
  }

  const id = nanoid(16);
  const generateAt = new Date().toISOString();
  const updatedAt = generateAt;
  const finished = (pageCount === readPage);

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    generateAt,
    updatedAt,
  };

  books.push(newBook);

  const isSuccess = books.filter((book) => book.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      messege: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'fail',
    messege: 'Gagal menambahkan buku. Mohon isi nama buku',
  });
  response.code(500);
  return response;
};

const getAllBooksHandler = (request, h) => {
  const {
    name, reading, finished,
  } = request.query;

  let booksFilter = books;

  if (name !== undefined) {
    booksFilter = booksFilter.filter((book) => book.name
      .toLowerCase().includes(name.toLowerCase()));
  }

  if (reading !== undefined) {
    booksFilter = booksFilter.filter((book) => book.reading === !!Number(reading));
  }

  if (finished !== undefined) {
    booksFilter = booksFilter.filter((book) => book.finished === !!Number(finished));
  }

  const response = h.response({
    status: 'success',
    data: {
      books: booksFilter.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      })),
    },
  });

  response.code(200);
  return response;
};

const getBooksByIdHandler = (request, h) => {
  const { id } = request.params;

  const book = books.filter((n) => n.id === id)[0];

  if (book !== undefined) {
    return {
      status: 'success',
      data: {
        book,
      },
    };
  }

  const response = h.response({
    status: 'fail',
    messege: 'Buku tidak ditemukan',
  });

  response.code(404);
  return response;
};

  const editBookByIdHandler{

  };

module.exports = {
  addbookhandler,
  getAllBooksHandler,
  getBooksByIdHandler,
};
