const toyList = document.querySelector("#toy-collection")
const addToyForm = document.querySelector(".add-toy-form")

let addToy = false;


function getToyData() {
  return fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then((toysArray) => {
    toysArray.forEach((toy) => {
      renderToy(toy)
    })
  })
}



addToyForm.addEventListener('submit', function(evt) {
  evt.preventDefault()
  let toyName = evt.target.name.value
  let toyURL = evt.target.url_name.value

  fetch("http://localhost:3000/toys", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Accept: "application/json"
        },
        body: JSON.stringify({
            "name": toyName,
            "image": toyURL,
            "likes": 0
        })
    })
        .then(res => res.json())
        .then((addToy) => {
            turnObjToLi();
            evt.target.reset()
        })





  fetch("http://localhost:3000/toys", )
})




function renderToy(toy) {
  const cardDiv = document.createElement("div")
  //  h2 tag with the toy's name
  const nameHeader = document.createElement("h2")
  // img tag with the src of the toy's image attribute and the class name "toy-avatar"
  const toyImg = document.createElement("img")
  // p tag with how many likes that toy has
  const likesP = document.createElement("p")
  // button tag with a class "like-btn"
  const likeButton = document.createElement("button")

  toyImg.className = "toy-avatar"
  cardDiv.classList.add("card")
  likeButton.classList.add("like-btn")
  toyImg.classList.add("toy-avatar")

  nameHeader.innerText = toy.name
  toyImg.src= toy.image
  likesP.innerText = `${toy.likes} Likes`

  cardDiv.append(nameHeader, toyImg, likesP, likeButton)
  toyList.append(cardDiv)
}


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
