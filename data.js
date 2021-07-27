const STORAGE_KEY = "BOOKSHELF_APPS";
 
let incompleteBookshelfList = [];
 
function isStorageExist() /* boolean */ {
   if(typeof(Storage) === undefined){
       alert("Browser kamu tidak mendukung local storage");
       return false
   }
   return true;
}
 
function saveData() {
   const parsed = JSON.stringify(incompleteBookshelfList);
   localStorage.setItem(STORAGE_KEY, parsed);
   document.dispatchEvent(new Event("ondatasaved"));
}
 
function loadDataFromStorage() {
   const serializedData = localStorage.getItem(STORAGE_KEY);
   
   let data = JSON.parse(serializedData);
   
   if(data !== null)
       incompleteBookshelfList = data;
 
   document.dispatchEvent(new Event("ondataloaded"));
}
 
function updateDataToStorage() {
   if(isStorageExist())
       saveData();
}
 
function composeBookObject(book, timestamp, isCompleted) {
   return {
       id: +new Date(),
       book,
       timestamp,
       isCompleted
   };
}
 
function findBookshelf(bookId) {
   for(bookshelf of incompleteBookshelfList){
       if(bookshelf.id === bookId)
           return bookshelf;
   }
   return null;
}
 
 
function findBookIndex(bookId) {
   let index = 0
   for (bookshelf of incompleteBookshelfList) {
       if(bookshelf.id === bookId)
           return index;
 
       index++;
   }
 
   return -1;
}
function refreshDataFromIncompleteBookshelfList() {
    const listUncompleted = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);
    let listCompleted = document.getElementById(COMPLETED_LIST_BOOK_ID);

    for (bookshelf of incompleteBookshelfList){
        const newBookshelf = makeBookshelf(bookshelf.book, bookshelf.timestamp, bookshelf.isCompleted);
        newBookshelf[BOOK_ITEMID] = bookshelf.id;

        if(bookshelf.isCompleted){
            listCompleted.append(newBookshelf);
        } else {
            listUncompleted.append(newBookshelf);
        }
    }
}