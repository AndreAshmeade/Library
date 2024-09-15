const libraryEl = document.getElementById("library");
const errElement = document.getElementById("errors");
const btnNewBook = document.getElementById("btnNewBook");
const btnAddBook = document.getElementById("btnAddBook");

let bookSelf = [];

function Book(title, author, pages, desc) {
  this.id = Math.random().toString(36).substr(2, 9);
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.desc = desc;
  this.wasRead = false;
}

const render = () => {
  libraryEl.innerHTML = "";
  for (let i = 0; i < bookSelf.length; i++) {
    let book = bookSelf[i];
    let bookEl = document.createElement("div");
    bookEl.setAttribute("class", "book-card");
    bookEl.innerHTML = `
   <div class="card-header">
    <h3 class="title">${book.title}</h3>
    <h4 class="author">${book.author}</h4>
    <h5 class="pages">${book.pages}</h5>
   <div class="card-body">
    <p class="card-text">
      ${book.desc}
    </p>
    <p class="read-status">
     ${book.wasRead ? "Mark as unread" : "Mark as read"}
    </p>
    <button class="remove-btn" onclick="removeBook(${i})">Remove</button>
    </div>
  </div>
    `;
    libraryEl.appendChild(bookEl);
  }
};

const saveToLocalStorage = () => {
  localStorage.setItem("bookSelf", JSON.stringify(bookSelf));
};

const removeBook = (e) => {
  const { bookId } = e.target.dataset;
  bookSelf.filter((book) => book.id !== bookId);
  saveToLocalStorage();
  render();
};

const addBookToLibrary = () => {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = parseInt(document.getElementById("pages").value, 10);
  const desc = document.getElementById("desc").value;
  let book = new Book(title, author, pages, desc);
  bookSelf.push(book);
  render();
};

btnNewBook.addEventListener("click", function () {
  let newBookForm = document.getElementById("new-book-form");
  newBookForm.style.display = "block";
});

document
  .querySelector("#new-book-form")
  .addEventListener("click", function (event) {
    event.preventDefault();
    addBookToLibrary();
  });
