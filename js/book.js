const libraryEl = document.getElementById("library");
const errElement = document.getElementById("errors");
const btnNewBook = document.getElementById("btnNewBook");
const btnAddBook = document.getElementById("btnAddBook");

let bookSelf = [];

function Book(title, author, pages, desc, read) {
  this.id = Math.random().toString(36).substr(2, 9);
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.desc = desc;
  this.read = read;
}

Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

function toggleRead(index) {
  console.log("toggle");
  bookSelf[index].toggleRead();
  saveToLocalStorage();
  render();
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
    <h5 class="pages">${book.pages} pages</h5>
   <div class="card-body">
    <p class="card-text">
      ${book.desc}
    </p>
    <p class="read-status">
     ${book.read ? "Mark as read" : "Mark as unread"}
    </p>
    <button  onclick="removeBook(${i})">Remove</button>
    <button  onclick="toggleRead(${i})"> Toggle Read </button>
   </div>
  </div>
    `;
    libraryEl.appendChild(bookEl);
  }
};

const saveToLocalStorage = () => {
  localStorage.setItem("bookSelf", JSON.stringify(bookSelf));
};

const removeBook = (index) => {
  bookSelf.splice(index, 1);
  saveToLocalStorage();
  render();
};

const addBookToLibrary = () => {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = parseInt(document.getElementById("pages").value, 10);
  const desc = document.getElementById("desc").value;
  const read = document.getElementById("read").checked;
  let book = new Book(title, author, pages, desc, read);
  bookSelf.push(book);
  saveToLocalStorage();
  render();
};

document
  .querySelector("#new-book-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    addBookToLibrary();
  });
