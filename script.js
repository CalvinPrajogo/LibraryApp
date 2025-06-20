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
        bookDiv.setAttribute("data-book-id", book.id);
        bookDiv.innerHTML = `
            <h3>${book.title}</h3>
            <p>Author: ${book.author}</p>
            <p>Pages: ${book.pages}</p>
            <button class="remove-book">Remove</button>`;
        libraryContainer.appendChild(bookDiv);
    })
}

// Prompt the user for book info to add book
function getBookInfo() {
    dialog = document.createElement("dialog");
    dialog.innerHTML = `
        <h2>Add Book</h2>
        <form action="#" method="post" id="book-form">
            <label for="title">Title:</label>
            <input type="text" id="title" name="title">
            <label for="author">Author:</label>
            <input type="text" id="author" name="author">
            <label for="pages">Number of Pages:</label>
            <input type="text" id="pages" name="pages">
            <button type="submit">Add</button>
        </form>`;
    
    document.body.appendChild(dialog);

    // Add event handler to get data - make sure its in the function where dialog exists
    dialog.querySelector("#book-form").addEventListener("submit", function(e) {
        e.preventDefault(); // Prevent form submission (default behavior)

        const formData = new FormData(this);
        const title = formData.get("title");
        const author = formData.get("author");
        const pages = formData.get("pages");

        addBook(title, author, pages);
        displayLibrary(); // Display library with added book
        dialog.close();
    })

    dialog.showModal();
}

// Remove button functionality
document.addEventListener("click", function(e) {
    if (e.target.classList.contains("remove-book")) {
        const bookDiv = e.target.closest(".book")
        const bookId = bookDiv.dataset.bookId;

        for (let i = 0; i < myLibrary.length; i++) {
            if (myLibrary[i].id == bookId) {
                myLibrary.splice(i, 1);
            }
        }
        // Display updated library
        displayLibrary();
    }
})

displayLibrary();