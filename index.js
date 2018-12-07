document.addEventListener("DOMContentLoaded", function() {});

const listPanel = document.querySelector("#list-panel");
// const API = "http://localhost:3000/books";

const showPanel = document.querySelector("#show-panel");

// const book = document.createElement("p");
const list = document.querySelector("#list");

const userID = 1;
const username = "pouros";

let books;

// const fetchData = function() {
//   fetch(API)
//     .then(function(response) {
//       return response.json();
//     })
//     .then(function(result) {
//       books = result;
//       console.log(books);
//       renderBookList();
//     });
// };
// const renderBookList = function() {
//   bookList.innerHTML = "";

//   books.forEach(book => {
//     const bookItem = document.createElement("li");
//     bookItem.innerHTML = book.title;
//     bookList.append(bookItem);
//     renderBookDetail(book);
//   });
//   console.log(books);
// };

// const renderBookDetail = function(book) {
//   showPanel.innerHTML = "";
//   console.log(books);

//   const title = document.createElement("p");
//   title.innerHTML = book.title;
//   const img_url = document.createElement("img");
//   img_url.src.innerHTML = book.img_url;
//   const description = document.createElement("p");
//   description.innerHTML = book.description;
//   const list = document.createElement("ul");

//   if (book.users) {
//     book.users.forEach(function(user) {
//       const userLi = document.createElement("li");
//       userLi.innerText = user.username;
//       // user.id = `${user.id}`;
//       list.append(userLi);
//     });
//   }

//   showPanel.append(title, img_url, description, list);
// };

// fetchData();

function fetchAllBooks() {
  fetch("http://localhost:3000/books")
    .then(response => response.json())
    .then(jsonData => {
      jsonData.forEach(book => renderList(book));
    });
}

function renderList(book) {
  let newListItem = document.createElement("li");
  newListItem.innerHTML = `<a href="#" id="${
    book.id
  }" style="text-decoration: none;"> ${book.title} </a>`;
  list.appendChild(newListItem);

  newListItem.addEventListener("click", function(event) {
    event.preventDefault();
    fetchBook(event.target.id);
    console.log(event.target.id);
  });
}

function fetchBook(id) {
  fetch(`http://localhost:3000/books/${id}`)
    .then(response => response.json())
    .then(book => {
      console.log(book);
      renderDetails(book);
    });
}

function renderDetails(book) {
  showPanel.innerHTML = ``;
  let title = document.createElement("p");
  title.innerHTML = `Title: "${book.title}"`;
  let description = document.createElement("p");
  description.innerHTML = `Description: "${book.description}"`;
  let image = document.createElement("img");
  image.src = `${book.img_url}`;
  let list = document.createElement("ul");

  // if (book.users) {
  book.users.forEach(function(user) {
    let listedUser = document.createElement("li");
    listedUser.innerText = `${user.username}`;
    listedUser.id = `${user.id}`;
    list.appendChild(listedUser);
  });
  // }

  function updateBook(id) {
    fetch(`http://localhost:3000/books/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ user_id: userID }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(book => {
        //something happens
        renderDetails(book);
        // console.log(book)
      });
  }

  let button = document.createElement("input");
  button.type = "button";
  button.value = "Like";
  button.addEventListener("click", function(event) {
    updateBook(book.id);
  });

  showPanel.appendChild(title);
  showPanel.appendChild(description);
  showPanel.appendChild(image);
  showPanel.appendChild(list);
  showPanel.appendChild(button);
}
fetchAllBooks();
