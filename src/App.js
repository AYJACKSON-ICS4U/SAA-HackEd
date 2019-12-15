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
async function signup() {
  console.log("yes");
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  await createUser(username, email, password).then(async () => {
    const userData = await getUserData(username);
    localStorage.setItem("currentUser", JSON.stringify(userData));
  });
  document.location = "homepage.html";
}

async function createUser(username, email, password) {
  const url =
    "https://pacific-inlet-67317.herokuapp.com/api/createuser?username=" +
    username +
    "&password=" +
    password +
    "&email=" +
    email;
  console.log(url);
  const createuser = await fetch(url);
  const created = await createuser.text();
  console.log(created);
  return created;
}

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

function returnHome() {
  document.location = "homepage.html";
}
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

function goToDecks() {
  document.location = "homepage.html";
}

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
function loadCards() {
  console.log("doc.loc:" + document.location);
  const spliturl = document.location.href.split("=");
  const deckid = Number.parseInt(spliturl[1]);
  const ud = JSON.parse(localStorage.getItem("currentUser"));
  // const currentDeckInd = localStorage.getItem("currentDeck");
  let currentCardInd = localStorage.getItem("currentCard");
  if (!currentCardInd) {
    currentCardInd = 0;
    localStorage.setItem("currentCard", currentCardInd);
  }
  const card = ud.sets[deckid].cards[currentCardInd];
  const isfront = "true" === localStorage.getItem("isfront");

  const cardBodyHtml = document.getElementById("card-body");
  const fronthtml = `<h5 class="card-title text-center">${card.front}</h5>`;
  const backhtml = `<div class="text-center">${card.back}</div>`;
  cardBodyHtml.innerHTML = `${isfront ? fronthtml : backhtml}`;
  localStorage.setItem("isfront", isfront ? "false" : "true");
}

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
async function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  userData = await verifyLogin(username, password);
  console.log(userData);
  localStorage.setItem("currentUser", JSON.stringify(userData));
  if (userData == "0") {
    alert("Invalid login");
  } else {
    document.location = "homepage.html";
  }
}

function grade() {
  right_answers += 1;
  console.log(right_answers);
}

function createDeckPage() {
  document.location = "createdeck.html";
}

async function submit() {
 // console.log("yes");
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  await createUser(username,email,password).then(async(response)=>{
    userData = await getUserData(username);	    
    console.log(response);
   if(response != "0"){
     userData = await getUserData(username);
   }
    else{
      alert("User invalid. Try again.");
    }
 });	  });
  document.location = "homepage.html";
}

async function getUserData(username) {
  const url =
    "https://pacific-inlet-67317.herokuapp.com/api/getuserdata?username=" +
    username;
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
  const url =
    "https://pacific-inlet-67317.herokuapp.com/api/createuser?username=" +
    username +
    "&password=" +
    password +
    "&email=" +
    email;
  console.log(url);
  const createuser = await fetch(url);
  const created = await createuser.text();
  console.log(created);
  return created;
}

async function createSet(title, description, owner) {
  const url =
    "https://pacific-inlet-67317.herokuapp.com/api/createset?title=" +
    title +
    "&description=" +
    description +
    "&owner=" +
    owner;
  const createSet = await fetch(url);
  const response = await createSet.text();
  return response;
}

async function createCard(definition, term, setindex, owner) {
  const url =
    "https://pacific-inlet-67317.herokuapp.com/api/createcard?term=" +
    term +
    "&definition=" +
    definition +
    "&owner=" +
    owner +
    "&set=" +
    setindex;
  const createCard = await fetch(url);
  const response = await createCard.text();
  return response;
}

async function deleteUser(username) {
  const url =
    "https://pacific-inlet-67317.herokuapp.com/api/deleteuser?username=" +
    username;
  const deleteUser = await fetch(url);
  return deleteUser;
}

async function verifyLogin(username, password) {
  const url =
    "https://pacific-inlet-67317.herokuapp.com/api/verifylogin?username=" +
    username +
    "&password=" +
    password;
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
