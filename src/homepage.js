function attachHandler(){
  document.getElementById("createDeckButton").addEventListener("click", createDeck);
}

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
async function createSet(title, description, owner) {
  const url = "https://pacific-inlet-67317.herokuapp.com/api/createset?title=" + title + "&description="+description+"&owner="+owner;
  const createSet = await fetch(url);
  const createdset = await createSet.json();
  return createdset;
}
