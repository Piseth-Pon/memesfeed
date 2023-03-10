// GENERATE RANDOM DATA
const CATEGORIES_GENERATE = CATEGORIES.map((item) => {
  return item.name
})
const CONTENT_GENERATE = DATA.map((item) => {
  return [item.name, item.url]
})
const IMAGES_GENERATE = DATA.map((item) => {
  return item.url
})

// Dom Nodes
const accountBtn = document.querySelector('#accountBtn')
const modal = document.querySelector('.modal')
const addMemeBtn = document.querySelector('#addMemeBtn')
const memeWrapper = document.querySelector('.memeWrapper')
const meme = document.querySelector('.meme')
const modalForm = document.querySelector('#modalForm')
const p = document.querySelector('#modalForm p')
const select = document.querySelector('#category')
const newsFeedForm = document.querySelector('#newsFeedForm')
const alert = document.querySelector('#alert')


// ***** CONTENT LOADED ******
window.addEventListener('DOMContentLoaded', main)
accountBtn.addEventListener('click', handleLogin)
newsFeedForm.addEventListener('submit', handleCreateNewMeme)


// ***** FUNCTION ******
function main() {
  generateContent()
  createCategoryOption()
  checkCharacter(100)
}


function generateContent() {
  for (let i = 0; i < 6; i++) {
    let index = Math.floor(Math.random() * 100)
    let content = CONTENT_GENERATE[index][0]
    let image = CONTENT_GENERATE[index][1]
    let category = CATEGORIES_GENERATE[Math.floor(Math.random() * CATEGORIES_GENERATE.length)]
    let color = CATEGORIES.find((cat) => cat.name === category).color

    createNewMeme(content, image, category, color)
  }
}

function createNewMeme(content, image, category, color) {
  
  const newMeme = document.createElement('div')
  newMeme.classList.add('meme')
  newMeme.innerHTML = `
    <img src="${image}" alt="random">
    <p class="content">${content}</p>
    <span class="category" style="background-color: ${color};">${category}</span>
  `
  memeWrapper.insertBefore(newMeme, memeWrapper.firstElementChild)
  displayAlert()
}

function createCategoryOption() {
  const options = CATEGORIES.map((option) => {
    return `<option value="${option.name}">${option.name}</option>`
  })
  
  for (let option of options) {
    select.innerHTML += option
  }
}

function checkCharacter(maxCharacters) {
  const textarea = document.querySelector('textarea')
  const span = document.querySelector('#remainedChar')
  // const submitBtn = document.querySelector('#newsFeedForm button')
  let remainedChar = maxCharacters
  span.textContent = remainedChar + "/100"
  textarea.addEventListener('input', () => {
    let inputtedChar = textarea.value.length
    let remainedChar = maxCharacters - inputtedChar
    span.textContent = remainedChar + "/100"
  })
}

function handleCreateNewMeme(e) {
  e.preventDefault()
  // console.log('create new meme')
  let content = e.target.elements.newsfeedContent.value
  let category = e.target.elements.category.value
  let color = CATEGORIES.find((cat) => cat.name === category).color
  let image = IMAGES_GENERATE[Math.floor(Math.random() * 100)]
  createNewMeme(content, image, category, color)

  // reset
  e.target.elements.newsfeedContent.value = ""
  e.target.elements.category.value = ""
  checkCharacter(100)
}


function displayAlert() {
  alert.textContent = "New Meme is Created Successfully!!!"
  alert.classList.toggle('hidden')

  setTimeout(function () {
    alert.textContent = ""
    alert.classList.toggle('hidden')
  }, 1000)
}



function handleLogin() {
  modal.classList.toggle('hidden')
  
  modalForm.addEventListener('submit', (e) => {
    e.preventDefault()
    username = e.target.children.username.value
    password = e.target.children.password.value

    isSuccess = checkProfile(username, password)
    if (isSuccess) {
      document.querySelector('#newsFeed').classList.remove('hidden')
    }
  })
}

function checkProfile(name, pwd) {
  
  const account = USERACCOUNTS.find((account) => account.name == name)
  if ( account && account.password === pwd) {
    console.log('existed')
    accountBtn.children[0].textContent = name
    accountBtn.children[1].name = 'person-outline'

    // accountBtn.nextElementSibling.classList.toggle('hidden')
    modal.classList.toggle('hidden')
    p.textContent = ""
  } else {
    console.log('please log in again')
    
    p.textContent = 'Username or password is not correct'
    // modalForm.appendChild(p)
  }
  
  // console.log(modalForm)
  return true
}


