'use strict';

import UI from "./view.js";
import Store from "./model.js";

// Book Class: Represents a Book
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

// Event: Display Books
document.addEventListener('DOMContentLoaded', () => {

    const books = Store.getBooks();

    books.forEach((book) => UI.addBookToList(book));

});

// Event: Add a Book
document.querySelector('#book-form').addEventListener('submit', (e) => {
    // Prevent actual submit
    e.preventDefault();
    // Get form values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    // Validate
    if (title == '' || author === '' || isbn === '') {
        UI.showAlert('Please fill in all fields', 'danger');
    } else {
        // Instatiate Book
        const book = new Book(title, author, isbn);

        // Add Book to UI
        UI.addBookToList(book);

        // Add Book to Store
        Store.addBook(book);

        // show success message
        UI.showAlert('The book is added', 'success');

        // Clear fields
        UI.clearFileds();
    }

});

// Event: Remove a Book
document.querySelector('#book-list').addEventListener('click', (e) => {
    // Remove book from UI
    UI.deleteBook(e.target);

    // Remove book from Store
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    // show success message
    UI.showAlert('The book is removed', 'success');
});