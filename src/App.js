var userData;
var currentDeck = 0;
// var username;
// var email;  
// var password; 
// var deckTitle; 
// var deckDescription; 
// var newDeckDescription; 
// var newDeckTitle;
// var term; 
// var definition; 
var right_answers = 0; 

function attachHandler(){
  document.getElementById("submitButton").addEventListener("click", submit);
  document.getElementById("loginButton").addEventListener("click", login);
  document.getElementById("createDeckButton").addEventListener("click", createDeck);
  document.getElementById("addToDeck").addEventListener("click", addToDeck);
  document.getElementById("done").addEventListener("click", addNewCard(event));
  document.getElementById("right").addEventListener("click", grade);
}

function createDeck (){
  const deck = {
    deckName : document.getElementById("deckName").value, 
    deckDescription : document.getElementById("deckDescription").value
  }

  createSet(deck.deckName, deck.deckDescription, userData._id);
  userData = getUserData(userData.login.username);
  currentDeck = userData.sets.length - 1;
  
  //decks.push(deck);
 // return deck; 
}

//sets[currentDeck].cards.length 
//front= term, back=definition
function loadDecks(){
    for(var i = 0; i < userData.sets.length; i++){
    deckContainer.innerHTML+=`<div class = "mydeck">
    <div class="card border-light mb-3" style="max-width: 18rem;">
        <div class="card-header">Deck Title ${userData.sets[currentDeck].title}</div>
        <div class="card-body">
          <p class="card-text">Deck description ${userData.sets[currentDeck].description}</p>
        </div>
      </div>
    </div>`
    }
  }

function addToDeck() {
  const card = {
    term : document.getElementById("term").value, 
    definition : document.getElementById("definition").value
  }
  createCard(card.Definition, card.term, userData.sets[currentDeck]._id,userData._id);
  userData = getUserData(userData.login.username);
}

function login(){
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value; 
  userData = verifyLogin(username,password)
  return {
    username, password
  } 
}

function onClick() {
  right_answers += 1; 
  console.log(right_answers);

}
function submit(){
  const username = document.getElementById("username").value; 
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value; 

  createUser(username,email,password);
  userData = getUserData(username);
}

async function getUserData(username) {
  const url = "/api/getuserdata?username=" + username;
  const user = await fetch(url);
  const userInfo = await user.json();

  return userInfo;
}

async function createUser(username, email, password) {
  const url = "/api/createuser?username=" + username + "&password="+password+"&email="+email;
  const createuser = await fetch(url);

  return createUser;
}

async function createSet(title, description, owner) {
  const url = "/api/createset?title=" + title + "&description="+description+"&owner="+owner;
  const createSet = await fetch(url);
  return createSet;
}

async function createCard(term, definition, owner) {
  const url = "/api/createcard?term=" + term + "&definition="+definition+"&owner="+owner;
  const createCard = await fetch(url);
  return createCard;
}

async function deleteUser(username) {
  const url = "/api/deleteuser?username=" + username;
  const deleteUser = await fetch(url);
  return deleteUser;
}

async function verifyLogin(username, password) {
  const url = "/api/verifylogin?username=" + username + "&password=" + password;
  const verify = await fetch(url);
  return verify;
}

