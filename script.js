const openBtn = document.getElementById("addButton");
const modal = document.getElementById("modal");
const insideModal = document.querySelector(".modal-inner");
const submit = document.getElementById("submit");

let myLibrary = [];

//opens add book form
openBtn.addEventListener("click", () => {
  modal.classList.add("open");
});

//closes add book form if a click is registered outside of the form container
modal.addEventListener("click", (event) => {
  if (!insideModal.contains(event.target)) {
    modal.classList.remove("open");
  }
});

//Book class
class Book {
  constructor(title, author, pages, isRead) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.info = () =>
      `${this.title} by ${this.author}, ${this.pages} pages, ${
        this.isRead ? "read" : "not read"
      }`;
  }
}

function addBookToLib(book) {
  myLibrary.push(book);
  updateLocalStorage();
  renderLibrary();
}

//Adds a book to the library
function renderLibrary() {
  const bookContainer = document.querySelector(".book-grid-container");
  bookContainer.innerHTML = "";

  myLibrary.forEach((book, index) => {
    const bookGrid = document.createElement("div");
    bookGrid.classList.add("bookGrid");

    const titleP = document.createElement("p");
    titleP.innerText = book.title;

    const authorP = document.createElement("p");
    authorP.innerText = book.author;

    const pagesP = document.createElement("p");
    pagesP.innerText = book.pages;

    const readButton = document.createElement("button");
    readButton.classList.add("button");
    readButton.innerText = book.isRead ? "Read" : "Not Read";
    readButton.classList.add(book.isRead ? "buttonRead" : "notRead");
    readButton.addEventListener("click", () => {
      book.isRead = !book.isRead;
      readButton.innerText = book.isRead ? "Read" : "Not Read";
      readButton.classList.toggle("buttonRead");
      readButton.classList.toggle("notRead");
      updateLocalStorage();
      renderLibrary();
    });

    const removeButton = document.createElement("button");
    removeButton.classList.add("button");
    removeButton.innerText = "Remove";
    removeButton.classList.add("buttonRemove");
    removeButton.classList.add("button");
    removeButton.addEventListener("click", () => {
      myLibrary.splice(index, 1);
      updateLocalStorage();
      renderLibrary();
    });

    bookGrid.append(titleP, authorP, pagesP, readButton, removeButton);
    bookContainer.appendChild(bookGrid);
  });
}

//grabs values once submit is clicked
function onSubmit() {
  const bookTitle = document.getElementById("bookTitle").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const isRead = document.getElementById("read").checked;

  const newBook = new Book(bookTitle, author, pages, isRead);
  addBookToLib(newBook);

  modal.classList.remove("open");
}

//clears the form
submit.addEventListener("click", () => {
  onSubmit();

  document.getElementById("bookTitle").value = "";
  document.getElementById("author").value = "";
  document.getElementById("pages").value = "";
  document.getElementById("read").checked = false;
});

//Updates localStorage with current books so it doesn't disappear if refreshed
function updateLocalStorage() {
  // Save to localStorage
  localStorage.setItem("books", JSON.stringify(myLibrary));
}

//Load books from localStorage
window.addEventListener("DOMContentLoaded", () => {
  const savedBooks = JSON.parse(localStorage.getItem("books"));

  if (savedBooks) {
    myLibrary = savedBooks.map(
      (bookData) =>
        new Book(
          bookData.title,
          bookData.author,
          bookData.pages,
          bookData.isRead
        )
    );
    renderLibrary();
  }
});
