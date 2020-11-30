export default {
  render(book) {
    return {
      id: book.id,
      title: book.title,
      brief: book.brief,
      pages: book.pages,
      isbn: book.isbn,
      price: book.price,
      summary: book.summary,
      date_publication: book.date_publication,
    }
  },

  renderMany(books) {
    return books.map(book => this.render(book))
  }
}