const myLibrary = [];

function Book(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.id = crypto.randomUUID();
}

function addBook(title, author, pages) {
    myLibrary.push(new Book(title, author, pages))
}

// Add dummy books to test display
addBook("The Hobbit", "J.R.R. Tolkien", 310);
addBook("1984", "George Orwell", 328);
addBook("To Kill a Mockingbird", "Harper Lee", 281);

// Display the library on the html page
function displayLibrary() {
    const libraryContainer = document.querySelector("#library-container");
    libraryContainer.innerHTML = ""; // Clear previous content
    myLibrary.forEach(book => {
        const bookDiv = document.createElement("div");
        bookDiv.classList.add("book");
        bookDiv.innerHTML = `
            <h3>${book.title}</h3>
            <p>Author: ${book.author}</p>
            <p>Pages: ${book.pages}</p>`;
        libraryContainer.appendChild(bookDiv);
    })
}

displayLibrary();