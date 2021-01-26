const toyForm = document.querySelector('.add-toy-form')
const toyCollection = document.querySelector('#toy-collection')

let addToy = false

const getToyData = () => {
  fetch('http://localhost:3000/toys')
  .then(res => res.json())
  .then((toysArray) => {
    toysArray.forEach((toy) => {
      turnToyToHTML(toy)
    })
  })
}
getToyData()



const turnToyToHTML = (toy) => {

  // create a div element for card
  const cardDiv = document.createElement('div')
  cardDiv.className = "card"

  // create an h2 tag
  const toyName = document.createElement('h2')
  toyName.innerText = toy.name

  // create an image tag
  const toyImage = document.createElement('img')
  toyImage.src = toy.image
  toyImage.alt = toy.name
  toyImage.className = "toy-avatar"

  // create a p tag
  const toyLikes = document.createElement('p')
  toyLikes.innerText = toy.likes

  // create a button tag
  const likeButton = document.createElement('button')
  likeButton.className = "like-btn"
  likeButton.innerText = "Like"

  // create attributes


  // slap on dom
  cardDiv.append(toyName, toyImage, toyLikes, likeButton)
  toyCollection.append(cardDiv)

  likeButton.addEventListener('click', (e) => {

    let newNumber = toy.likes + 1

    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        likes: newNumber
      })
    })
    .then(res => res.json())
    .then((updatedToy) => {
      // update the DOM
      toyLikes.innerText = updatedToy.likes
      // update the object in memory
      toy.likes = updatedToy.likes
    })
  })
}



toyForm.addEventListener('submit', (e) => {
  e.preventDefault()
  let newToyName = e.target.name.value
  let newToyImg = e.target.image.value
  fetch(`http://localhost:3000/toys`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: newToyName,
      image: newToyImg,
      likes: 0
    })
  })
  .then(res => res.json())
  .then((createdToy) => {
    turnToyToHTML(createdToy)
    e.target.reset()
  })
})

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});