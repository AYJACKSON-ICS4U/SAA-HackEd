let userData;
let currentDeck = 0;
let right_answers = 0; 

async function createDeck (){
  const deck = {
    deckName : document.getElementById("deckName").value, 
    deckDescription : document.getElementById("deckDescription").value
  }

  await createSet(deck.deckName, deck.deckDescription, userData._id).then(async()=>{
    userData = await getUserData(userData.login.username);
    currentDeck = userData.sets.length - 1;
  });
}

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
  
  async function doVerifyLogin(u, p){

    userData = await verifyLogin(username,password);

    console.log("data: " + userData);
    if(userData == "0"){
      alert("Invalid login");
    }  
  }

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value; 
  doVerifyLogin(username, password)
}

function onClick() {
  right_answers += 1; 
  console.log(right_answers);

}
async function submit(){
  const username = document.getElementById("username").value; 
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value; 

  await createUser(username,email,password).then(async(response)=>{
    console.log(response);
    if(response != "0"){
      userData = await getUserData(username);
    }
     else{
       alert("User invalid. Try again.");
     }
  });
  document.location = "homepage.html";
 }


async function getUserData(username) {
  const url = "https://pacific-inlet-67317.herokuapp.com/api/getuserdata?username=" + username;
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

async function createUser(username, email, password) {
  const url = "https://pacific-inlet-67317.herokuapp.com/api/createuser?username=" + username + "&password="+password+"&email="+email;
  console.log(url);
  const createuser = await fetch(url);
  const created = await createuser.text();
  return created;
}

async function createSet(title, description, owner) {
  const url = "https://pacific-inlet-67317.herokuapp.com/api/createset?title=" + title + "&description="+description+"&owner="+owner;
  const createSet = await fetch(url);
  const createdset = await createSet.json();
  return createdset;
}

async function createCard(term, definition, owner) {
  const url = "https://pacific-inlet-67317.herokuapp.com/api/createcard?term=" + term + "&definition="+definition+"&owner="+owner;
  const createCard = await fetch(url);
  return createCard;
}

async function deleteUser(username) {
  const url = "https://pacific-inlet-67317.herokuapp.com/api/deleteuser?username=" + username;
  const deleteUser = await fetch(url);
  return deleteUser;
}

async function verifyLogin(username, password) {
  const url = "https://pacific-inlet-67317.herokuapp.com/api/verifylogin?username=" + username + "&password=" + password;
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

