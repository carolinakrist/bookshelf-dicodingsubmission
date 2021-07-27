const UNCOMPLETED_LIST_BOOK_ID = "incompleteBookshelfList";
const COMPLETED_LIST_BOOK_ID = "completeBookshelfList"; 
const BOOK_ITEMID = "bookId";

function addBookshelf() {
    const uncompletedBooklist = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);

    const textBooktitle = document.getElementById("inputBookTitle").value;
    const textBookauthor = document.getElementById("inputBookAuthor").value;
    const textBookyear = document.getElementById("inputBookYear").value;
    
    const bookShelf = makeBookshelf(textBooktitle, textBookauthor, textBookyear);

    const bookObject = composeBookObject(textBooktitle, textBookauthor, textBookyear, false);

    bookShelf[BOOK_ITEMID] = bookObject.id;
    incompleteBookshelfList.push(bookObject);

    uncompletedBooklist.append(bookShelf);
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
    const book = findBookshelf(bookElement[BOOK_ITEMID]);
    book.isCompleted = true;
    newBookshelf[BOOK_ITEMID] = book.id;


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
    
    const book = findBookshelf(bookElement[BOOK_ITEMID]);
    book.isCompleted = false;
    newBookshelf[BOOK_ITEMID] = book.id;


    listUncompleted.append(newBookshelf);
    bookElement.remove();
    updateDataToStorage();
}

function createUndoButton() {
    return createButton("green", "Belum Selesai Dibaca", function(event){
        undoBookfromCompleted(event.target.parentElement.parentElement);
    });
}