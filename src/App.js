const deck = [];

function attachHandler(){
  document.getElementById("submitButton").addEventListener("click", submit);
  document.getElementById("loginButton").addEventListener("click", login);
  document.getElementById("createDeckButton").addEventListener("click", createDeck);
  document.getElementById("addToDeck").addEventListener("click", addToDeck);
  document.getElementById("done").addEventListener("click", addNewCard(event));

}
function createDeck (){
  const deck = {
    deckName : document.getElementById("deckName").value, 
    deckDescription : document.getElementById("deckDescription").value
  }
  decks.push(deck);
  return deck; 
}

function addNewCard(event){
  event.preventDefault();
  var emptyTerm = "";
  var emptyDefinition = "";
  document.getElementById("term").value = emptyTerm;
  document.getElementById("definition").value = emptyDefinition;
}

function addToDeck() {
  const card = {
    term : document.getElementById("term").value, 
    definition : document.getElementById("definition").value
  }
  deck.push(card);
  return card; 
}

function login(){
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value; 
  return {
    email, password

}
function submit(){
  const username = document.getElementById("username").value; 
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value; 
  retur
    username, email, password
  }
}

//function getTerm (term) {
 // var term = ??
 
//}

//get term, get def, 