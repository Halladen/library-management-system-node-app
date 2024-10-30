const express = require("express");
const bodyParser = require("body-parser");

const books = [
  {
    bookName: "Rudest Book Ever",
    bookAuthor: "Shwetabh Gangwar",
    bookPages: 200,
    bookPrice: 240,
    bookState: "Available",
  },
  {
    bookName: "Do Epic Shit",
    bookAuthor: "Ankur Wariko",
    bookPages: 200,
    bookPrice: 240,
    bookState: "Available",
  },
];

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.render("home", { data: books });
});

app.post("/", (req, res) => {
  const inputBookName = req.body.bookName;
  const inputBookAuthor = req.body.bookAuthor;
  const inputBookPages = req.body.bookPages;
  const inputBookPrice = req.body.bookPrice;
  if (inputBookName && inputBookAuthor && inputBookPages && inputBookPrice) {
    books.push({
      bookName: inputBookName,
      bookAuthor: inputBookAuthor,
      bookPages: inputBookPages,
      bookPrice: inputBookPrice,
      bookState: "Available",
    });
  }

  res.render("home", { data: books });
});

app.post("/issue", (req, res) => {
  let requestedBookName = req.body.bookName;
  books.forEach((book) => {
    if (book.bookName == requestedBookName) {
      book.bookState = "Issued";
    }
  });
  res.render("home", { data: books });
});

app.post("/return", (req, res) => {
  let requestedBookName = req.body.bookName;
  books.forEach((book) => {
    if (book.bookName == requestedBookName) {
      book.bookState = "Available";
    }
  });
  res.render("home", { data: books });
});

app.post("/delete", (req, res) => {
  let requestedBookName = req.body.bookName;

  const updatedBooks = books.filter(
    (book) => book.bookName !== requestedBookName
  );
  books.length = 0;
  books.push(...updatedBooks);
  res.render("home", { data: books });
});

app.listen(3000, (req, res) => {
  console.log("App is running on port 3000");
});
