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



/*


"searchBookTitle").value;
function searchBook(){
    const searchButton = document.getElementById("searchBookTitle").value;
    const elementArticle = document.querySelectorAll('article');
    for (title of elementArticle)( {
        if (title.childNodes[0].innerText.toLowerCase().includes(searchTitle.toLowerCase())) {
            title.setAttribute("style", "display : block;");
                } else {
            title.setAttribute("style", "display: none;");        
        }
    }
}

function searchBook(){
    const searchForm = document.getElementById("searchBook");
    textInput = document.getElementById("searchBookTitle");
    const bookTitle =document.getElementById("book_item");
    const books = document.querySelectorAll("h3");
    console.log(h3);
    for (let i=0; i<h3.length; i++){
        const ahref = document.querySelectorAll("a")[i];
    }

}

<1. Ambil nilai dari input judul buku yang ingin dicari

    const searchButton = document.getElementById("searchBookTitle").value;

2. Ambil element pembungkus element judul yaitu article

    const elementArticle = document.querySelectorAll('article');

3. Lakukan perulangan pada variabel elementArticle dengan for of

    for (title of elementArticle) {

4. Buat perbandingan apakah nilai title sama dengan nilai input search, 
saat pengecekan ambil nilai judul dengan childNodes[0].innerText, karna kita ingin mengambil nilai h3. 

5. Rubah teks dari h3 ke kecil semua dengan .toLowerCase()

6. Gunakan method .includes() dengan parameter nilai yang diambil 
dari variabel searchButton yang juga sudah di rubah ke kecil semua.

    if (title.childNodes[0].innerText.toLowerCase().includes(searchTitle.toLowerCase())) {

7. Jika bernilai true, set attribut style pada element article dengan nilai display: block, jika false set attribut style menjadi display: none;

           title.setAttribute("style", "display : block;");

            } else {

            title.setAttribute("style", "display: none;");        

        }*/