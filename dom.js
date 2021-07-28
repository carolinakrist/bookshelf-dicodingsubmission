const UNCOMPLETED_LIST_BOOK_ID = "incompleteBookshelfList";
const COMPLETED_LIST_BOOK_ID = "completeBookshelfList"; 
const BOOK_ITEMID = "bookId";

function addBookshelf() {
    const uncompletedBooklist = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);
    const listCompleted = document.getElementById(COMPLETED_LIST_BOOK_ID);

    const textBooktitle = document.getElementById("inputBookTitle").value;
    const textBookauthor = document.getElementById("inputBookAuthor").value;
    const textBookyear = document.getElementById("inputBookYear").value;
    const isCompleted = document.getElementById("inputBookIsComplete").checked;

    const bookShelf = makeBookshelf(textBooktitle, textBookauthor, textBookyear, isCompleted);
    const bookObject = composeBookObject(textBooktitle, textBookauthor, textBookyear, isCompleted);
    
    bookShelf[BOOK_ITEMID] = bookObject.id;
    incompleteBookshelfList.push(bookObject);

    if (isCompleted) {
        listCompleted.append(bookShelf);
    } else {
        uncompletedBooklist.append(bookShelf);
    }

    updateDataToStorage();
}

function makeBookshelf(title, author, year, isCompleted) {

    const textTitle = document.createElement("h3");
    textTitle.innerText = title;

    const textAuthor = document.createElement("p");
    textAuthor.classList.add("authors");
    textAuthor.innerText = author

    const textYear = document.createElement("p");
    textYear.classList.add("years");
    textYear.innerText = year

    const button = document.createElement("div");
    button.classList.add("action");

    const bookitem = document.createElement("article");
    bookitem.classList.add("book_item")
    bookitem.append(textTitle, textAuthor, textYear, button);

    if(isCompleted){
        button.append(
            createUndoButton(),
            createRedButton());
    } else {
        button.append(
            createGreenButton(),
            createRedButton()
        );
    }
    
    return bookitem;
}


function createButton(buttonTypeClass, buttonText, eventListener) {
    const button = document.createElement("button");
    button.classList.add(buttonTypeClass);
    button.innerText = buttonText;
    button.addEventListener("click", function (event) {
        eventListener(event);
    });
    return button;
}

function addBookToCompleted(bookElement){
    const listCompleted = document.getElementById(COMPLETED_LIST_BOOK_ID);
    const bookTitle = bookElement.querySelector(".book_item > h3").innerText;
    const bookAuthor = bookElement.querySelector(".book_item > .authors").innerText;
    const bookYear = bookElement.querySelector(".book_item > .years").innerText;

    const newBookshelf = makeBookshelf(bookTitle, bookAuthor, bookYear, true);
    const bookshelf = findBookshelf(bookElement[BOOK_ITEMID]);
    bookshelf.isCompleted = true;
    newBookshelf[BOOK_ITEMID] = bookshelf.id;


    listCompleted.append(newBookshelf);

    bookElement.remove();
    updateDataToStorage();
}

function createGreenButton() {
    return createButton("green", "Selesai Dibaca", function(event){
        addBookToCompleted(event.target.parentElement.parentElement);
    });

}

function removeBookFromCompleted(bookElement) {
    const bookPosition = findBookIndex(bookElement[BOOK_ITEMID]);
    incompleteBookshelfList.splice(bookPosition, 1);

    bookElement.remove();
    updateDataToStorage();
}

function createRedButton() {
    return createButton("red", "Hapus Buku", function(event){
        removeBookFromCompleted(event.target.parentElement.parentElement);
    });
}

function undoBookfromCompleted(bookElement){
    const listUncompleted = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);
    const bookTitle = bookElement.querySelector(".book_item > h3").innerText;
    const bookAuthor = bookElement.querySelector(".book_item > .authors").innerText;
    const bookYear = bookElement.querySelector(".book_item > .years").innerText;

    const newBookshelf = makeBookshelf(bookTitle, bookAuthor, bookYear, false)
    
    const bookshelf = findBookshelf(bookElement[BOOK_ITEMID]);
    bookshelf.isCompleted = false;
    newBookshelf[BOOK_ITEMID] = bookshelf.id;


    listUncompleted.append(newBookshelf);
    bookElement.remove();
    updateDataToStorage();
}

function createUndoButton() {
    return createButton("green", "Belum Selesai Dibaca", function(event){
        undoBookfromCompleted(event.target.parentElement.parentElement);
    });
}


const searchBook = document.getElementById("searchSubmit");
searchBook.addEventListener("click", (event) => {
    const searchBook1 = document.getElementById("searchBookTitle").value.toLowerCase;
    const searchBook2 = document.querySelectorAll("article");
    event.preventDefault();

    for (bookshelf of searchBook2) {
        const bookTitle = bookshelf.firstElementChild.textContent.toLowerCase();
        
        if(bookTitle.indexOf(searchBook1) != -1) {
            bookshelf.style.display = "block";
            console.log(bookTitle);
        } else {
            bookshelf.style.display = "none";
        }
    }
});



