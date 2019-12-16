//handlers for objects (DOM) for each page
function attachHandler(pageid) {
  if (pageid === 1) {
    document.getElementById("submitButton").addEventListener("click", signup);
  }
  if (pageid === 2) {
    document
      .getElementById("makeNewDeck")
      .addEventListener("click", createDeckPage);
    loadDecks();
  }
  if (pageid === 3) {
    document
      .getElementById("createDeckButton")
      .addEventListener("click", createDeck);
  }
  if (pageid === 4) {
    document.getElementById("addToDeck").addEventListener("click", addToDeck);
    document.getElementById("done").addEventListener("click", goToDecks);
  }
  if (pageid === 5) {
    //TODO
    document.getElementById("flip-button").addEventListener("click", loadCards);
    document
      .getElementById("next-card-button")
      .addEventListener("click", nextCardDisplay);
    loadCards();
    document.getElementById("back").addEventListener("click", returnHome);
  }
}

//when user signs up
async function signup() {
  // get vars from html forms
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  //create a user with these params
  await createUser(username, email, password).then(async (res) => {
     const userData = await getUserData(username);
      localStorage.setItem("currentUser", JSON.stringify(userData));
    if(res != "0"){
     
      //send them to homepage
       document.location = "homepage.html";
    }
    else{
      alert("Invalid!");
    }
  });
 
}

//create user by calling api
async function createUser(username, email, password) {
  //set url and send username, email and password, as req querys
  const url =
    "https://pacific-inlet-67317.herokuapp.com/api/createuser?username=" +
    username +
    "&password=" +
    password +
    "&email=" +
    email;
  console.log(url);
    //fetch
  const createuser = await fetch(url);
  const created = await createuser.text();
  console.log(created);
  return created;
}

//create deck and push to local storage
async function createDeck() {
  const deck = {
    deckName: document.getElementById("deckName").value,
    deckDescription: document.getElementById("deckDescription").value
  };
  const ud = JSON.parse(localStorage.getItem("currentUser"));
  const createSetResponse = await createSet(
    deck.deckName,
    deck.deckDescription,
    ud._id
  );
  if (createSetResponse) {
    userData = await getUserData(ud.login.username);
    localStorage.setItem("currentUser", JSON.stringify(userData));
    currentDeck = userData.sets.length - 1;
    localStorage.setItem("currentDeck", currentDeck);
    document.location = "addcards.html";
  }
}

//set html page to home on click
function returnHome() {
  document.location = "homepage.html";
}

//load users decks into local storage from database
function loadDecks() {
  localStorage.setItem("currentCard", 0);
  const ud = JSON.parse(localStorage.getItem("currentUser"));
  const deckContainer = document.getElementById("deck-container");
  for (var i = 0; i < ud.sets.length; i++) {
    deckContainer.innerHTML += `<div class = "mydeck">
    <div class="card border-light mb-3" style="max-width: 18rem;">
        <div class="card-header"><a href="carddisplay.html?id=${i}">${ud.sets[i].title}</a></div>
        <div class="card-body">
          <p class="card-text">${ud.sets[i].description}</p>
        </div>
      </div>
    </div>`;
  }
}

//go to decks page on click
function goToDecks() {
  document.location = "homepage.html";
}

//get the next card in the deck to display
function nextCardDisplay() {
  const cardind = 1 + Number.parseInt(localStorage.getItem("currentCard"));
  const ud = JSON.parse(localStorage.getItem("currentUser"));
  const cards =
    ud.sets[Number.parseInt(localStorage.getItem("currentDeck"))].cards;

  if (cards.length > cardind) {
    localStorage.setItem("currentCard", cardind);
    localStorage.setItem("isfront", "true");
    loadCards();
  }
}
//load cards in a deck onto local storage from db
function loadCards() {
  console.log("doc.loc:" + document.location);
  const spliturl = document.location.href.split("=");
  const deckid = Number.parseInt(spliturl[1]);
  localStorage.setItem("currentDeck",deckid);
  const ud = JSON.parse(localStorage.getItem("currentUser"));
  // const currentDeckInd = localStorage.getItem("currentDeck");
  let currentCardInd = localStorage.getItem("currentCard");
  if (!currentCardInd) {
    currentCardInd = 0;
    localStorage.setItem("currentCard", currentCardInd);
    localStorage.setItem("isfront", true);
  }
  const card = ud.sets[deckid].cards[currentCardInd];
  const isfront = "true" === localStorage.getItem("isfront");

  const cardBodyHtml = document.getElementById("card-body");
  const fronthtml = `<h5 class="card-title text-center">${card.front}</h5>`;
  const backhtml = `<div class="text-center">${card.back}</div>`;
  cardBodyHtml.innerHTML = `${isfront ? fronthtml : backhtml}`;
  localStorage.setItem("isfront", isfront ? "false" : "true");
}

//add card to deck on local storage and on database
async function addToDeck() {
  console.log("addToDeck is called");
  const card = {
    term: document.getElementById("term").value,
    definition: document.getElementById("definition").value
  };
  const ud = JSON.parse(localStorage.getItem("currentUser"));
  const cd = JSON.parse(localStorage.getItem("currentDeck"));

  const createCardResponse = await createCard(
    card.definition,
    card.term,
    ud.sets[cd]._id,
    ud._id
  );
  if (createCardResponse) {
    userData = await getUserData(ud.login.username);
    localStorage.setItem("currentUser", JSON.stringify(userData));
    document.location = "addcards.html";
  }
}

//login and verify user
async function login() {
  //get parameters
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  userData = await verifyLogin(username, password);
  console.log(userData);
  //set local storage
  localStorage.setItem("currentUser", JSON.stringify(userData));
  if (userData == "0") {
    alert("Invalid login");
  } else {
    //redirect if login correct
    document.location = "homepage.html";
  }
}

//get grade
function grade() {
  right_answers += 1;
  console.log(right_answers);
}

//switch page to page for creating decks
function createDeckPage() {
  document.location = "createdeck.html";
}

async function submit() {
 // console.log("yes");
  // get vars from html forms
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  //create a user with these params
  await createUser(username,email,password).then(async(response)=>{
    userData = await getUserData(username);	    
    console.log(response);
   if(response != "0"){
     userData = await getUserData(username);
      //send them to homepage
  document.location = "homepage.html";
   }
    else{
      alert("User invalid. Try again.");
    }
 	  });
 
}

//get user data from api
async function getUserData(username) {
  //send username as param in url
  const url =
    "https://pacific-inlet-67317.herokuapp.com/api/getuserdata?username=" +
    username;
  //fetch
  const user = await fetch(url);
    //get verify content type to tell if is json or text
    const contentType = user.headers.get("content-type");
    //send text if content is text, send json if content is json
    if (contentType && contentType.indexOf("application/json") !== -1) {
      return user.json();
    } else {
      return user.text();
    }
}

//create user by calling api
async function createUser(username, email, password) {
  //set url and send params in req
  const url =
    "https://pacific-inlet-67317.herokuapp.com/api/createuser?username=" +
    username +
    "&password=" +
    password +
    "&email=" +
    email;
  console.log(url);
  //fetch and send
  const createuser = await fetch(url);
  const created = await createuser.text();
  console.log(created);
  return created;
}

//create set by calling api
async function createSet(title, description, owner) {
  //send params in req 
  const url =
    "https://pacific-inlet-67317.herokuapp.com/api/createset?title=" +
    title +
    "&description=" +
    description +
    "&owner=" +
    owner;
  //fetch and send
  const createSet = await fetch(url);
  const response = await createSet.text();
  return response;
}

//call api to create card
async function createCard(definition, term, setindex, owner) {
   //set url and send term, defenition, owner and set
  const url =
    "https://pacific-inlet-67317.herokuapp.com/api/createcard?term=" +
    term +
    "&definition=" +
    definition +
    "&owner=" +
    owner +
    "&set=" +
    setindex;
  //fetch and return response
  const createCard = await fetch(url);
  const response = await createCard.text();
  return response;
}

//delete call database to user
async function deleteUser(username) {
  //set the url and send given username as req query 
  const url =
    "https://pacific-inlet-67317.herokuapp.com/api/deleteuser?username=" +
    username;
  //fetch and return res
  const deleteUser = await fetch(url);
  return deleteUser;
}

//verify if a user exists and if correct password was entered
async function verifyLogin(username, password) {
  //set url and send username and password as req querys
  const url =
    "https://pacific-inlet-67317.herokuapp.com/api/verifylogin?username=" +
    username +
    "&password=" +
    password;
  //fetch
  const verify = await fetch(url);
  //get verify content type to tell if is json or text
  const contentType = verify.headers.get("content-type");
  //send text if content is text, send json if content is json
  if (contentType && contentType.indexOf("application/json") !== -1) {
    return verify.json();
  } else {
    return verify.text();
  }
}
