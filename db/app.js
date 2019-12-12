/****** SETUP ******/

//requirements for packages
const mongoose = require('mongoose');
const userSchema = require('./schemas/userSchema.js')
const flashcardSchema = require('./schemas/flashcardSchema.js')
const flashsetSchema = require('./schemas/flashsetSchema.js')
//import schemas
const User = mongoose.model('user', userSchema, 'user')
const Set = mongoose.model('set', flashsetSchema, 'set')
const Card = mongoose.model('card', flashcardSchema, 'card')
//connection string for Atlas
const connectionString = "mongodb+srv://sabrina-button:8bb187Twut1SggBQ@hackeddb-3nbl6.azure.mongodb.net/test?retryWrites=true&w=majority";

/****** CONNECTOR FUNCTION ******/ 

//connects to mongoose with single line to avoid repetition
const connector = () =>{
  //connect to database via mongoose
  mongoose.connect(connectionString)
}

/****** CREATE FUNCTIONS ******/ 

//creates a set in the database
async function createSet(title, description, owner) {
  connector();
  //find passed in owner id in database and then push the set to users sets
  User.findById(owner).exec((err, docc) => {
    docc.sets.push(new Set({
      title,
      description,
      owner
    }))
    docc.save();
  })
}

//creates a card in the database
async function createCard( back, front, set, owner) {
  connector();

  //find passed in owner id in database and then push the card to passed set
  User.findById(owner).exec((err, docc) => {
    var pos = docc.sets.map( curset => {return curset._id}).indexOf(set);

    docc.sets[pos].cards.push(
      new Card({
        back,
        front,
        set,
        owner})
    )
    
    docc.save()
})

}

//creates a user in the database
async function createUser(username, password, email) {
  connector();
  //create a new user using mongoose User schema
  return new User({
    login:{username,
    password,
    email,
    created: Date.now()}
  }).save()
}

/****** GET DATA FUNCTION ******/

//gets all user data based on a username
async function getUserData(username) {
  connector();
  //finds a user with passed username
  return await User.findOne({ 'login.username':username } )
}

/****** DELETE FUNCTION ******/

//deletes a passed user
async function deleteUser(username) {
  connector();
  //delete a user based on the passed username
  return await User.deleteOne({ 'login.username':username  }, function (err) {
    if (err) console.log(err)
  });
}

//deletes a passed card
async function deleteCard(owner, set, id) {
  connector();
  //finds user by passed owner
  User.findById(owner).exec((err, docc) => {
    //finds position of passed set
    var pos = docc.sets.map( curset => {return curset._id}).indexOf(set);
    //pulls the card from the passed set and saves the user profile
    docc.sets[pos].cards.pull({_id: id})
    docc.save();
  })
}

//deletes a passed set
async function deleteSet(owner, set) {
  connector();
  //finds user by passed owner
  User.findById(owner).exec((err, docc) => {
    
    //pulls the set from the passed owner and saves the user profile
    docc.sets.pull({_id: set})
    docc.save();
  })
}

/****** VERIFICATION ******/

//verifies if a users credentials are correct
async function verifyLogin(username, password) {
  //find this user and their password
    var thisUser = await getUserData(username);
    var corepass = thisUser.login.password;

    //if their password is correct then return the user to the frontend, if not return 0
    if(corepass === password){
      return thisUser;
    }
    else{
      return 0;
    }
}

//module.exports = verifyLogin, deleteSet, deleteCard, deleteUser, createSet, createUser, createCard, getUserData
export {verifyLogin, deleteSet, deleteCard, deleteUser, createSet, createUser, createCard, getUserData}