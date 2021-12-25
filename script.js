// target html elements
const form = document.querySelector('#form')
const cards = document.querySelector('.cards')

// array to store Book objects
let myLibrary = [];

// add event listeners to different buttons
// call addBook function when "Add to library" button is clicked
form.addEventListener('submit', addBook)
// delete a book from myLibrary when 'Delete' button is clicked
document.addEventListener('click', function(e){
  if(e.target && e.target.className == 'delete-button'){
        let data = parseFloat(e.target.parentNode.getAttribute('data-book'))
        myLibrary.splice(data, 1)
        displayBooks(myLibrary)
   }
});
// toggle between 'Read' and 'Not Read' for a book
document.addEventListener('click', function(e){
  if(e.target && e.target.className == 'check-status'){
        if (e.target.checked === true) {
          e.target.offsetParent.previousSibling.innerHTML = '<b>Status: </b>Read'
        }
        else {
          e.target.offsetParent.previousSibling.innerHTML = '<b>Status: </b>Not Read'
        }
   }
});

// helper functions
// gather data from the form when submitted (but prevent from actually submitting)
function addBook(e) {
  e.preventDefault()
  const title  = form['title'].value
  const author  = form['author'].value
  const genre  = form['genre'].value
  const pages = form['pages'].value
  let status  = form['status'].checked 
  if (status === true) {
    status = 'Read'
  }
  else 
  status = 'Not Read'
  // create new Book object
  let newBook = new Book(title, author, genre, pages, status)
  // add new object to myLibrary array
  myLibrary.push(newBook)
  // call other functions
  displayBooks(myLibrary)
  clearValues()
}

// create constructor for Book objects
function Book(title, author, genre, pages, status) {
  this.title = title
  this.author = author
  this.genre = genre
  this.pages = pages
  this.status = status
}

// clear input fields after submitting
function clearValues() {
  form['title'].value = ''
  form['author'].value = ''
  form['genre'].value = ''
  form['pages'].value = ''
  form['status'].checked = false
}

// clear input fields on reload
window.onload = clearValues()

// take myLibrary array, iterate over each object and create a new card for each book
function displayBooks(myLibrary) {
  cards.innerHTML = ''
  for (i = 0; i < myLibrary.length; i++) {
    let newBook = document.createElement('div')
    newBook.classList.add('card')
    newBook.setAttribute('data-book', i)
    let newTitle = document.createElement('h3')
    newTitle.classList.add('title')
    newTitle.textContent = myLibrary[i].title
    newBook.appendChild(newTitle)
    let newInfo = document.createElement('div')
    newInfo.classList.add('info')
    let newAuthor = document.createElement('p')
    newAuthor.classList.add('author')
    newAuthor.innerHTML = `<b>Author: </b>${myLibrary[i].author}`
    newInfo.appendChild(newAuthor)
    let newGenre = document.createElement('p')
    newGenre.classList.add('genre')
    newGenre.innerHTML = `<b>Genre: </b>${myLibrary[i].genre}`
    newInfo.appendChild(newGenre)
    let newPages = document.createElement('p')
    newPages.classList.add('pages')
    newPages.innerHTML = `<b>Number of Pages: </b>${myLibrary[i].pages}`
    newInfo.appendChild(newPages)
    let newToggle = document.createElement('div')
    newToggle.classList.add('toggle')
    let newStatus = document.createElement('p')
    newStatus.innerHTML = `<b>Status: </b>${myLibrary[i].status}`
    newToggle.appendChild(newStatus)
    let newLabel = document.createElement('label')
    newLabel.classList.add('switch')
    newToggle.appendChild(newLabel)
    let newCheckbox = document.createElement('INPUT')
    newCheckbox.setAttribute("type", "checkbox")
    newCheckbox.classList.add('check-status')
    if (myLibrary[i].status === 'Read') {
      newCheckbox.checked = true
    }
    newLabel.appendChild(newCheckbox)
    let newSpan = document.createElement('span')
    newSpan.classList.add('slider', 'round')
    newLabel.appendChild(newSpan)
    newToggle.appendChild(newLabel)
    newInfo.appendChild(newToggle)
    newBook.appendChild(newInfo)
    let newButton = document.createElement('button')
    newButton.classList.add('delete-button')
    newButton.textContent = 'Delete'
    newBook.appendChild(newButton)
    cards.appendChild(newBook)
  }
}
