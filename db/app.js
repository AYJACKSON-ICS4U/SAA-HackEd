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

/****** CONNECTOR ******/ 
const connector = () =>{
  //connect to database via mongoose
  mongoose.connect(connectionString)
}

/****** CREATE ******/ 
async function createSet(title, description, owner) {
  connector();
  User.findById(owner).exec((err, docc) => {
    docc.sets.push(new Set({
      title,
      description,
      owner
    }))
    docc.save();
  })
}

async function createCard( back, front, set, owner) {
  connector();

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

async function createUser(username, password, email) {
  connector();
  return new User({
    login:{username,
    password,
    email,
    created: Date.now()}
  }).save()
}

/****** FIND ******/
async function findUser(username) {
  connector();
  return await User.findOne({ 'login.username':username } )
}

//NEEDS TO BE FIXED
async function findCard(owner, set, id) {
  connector();
    // await User.findOne({_id:owner},
    // {'sets': {$elemMatch: { 'cards':  
    //       {$elemMatch: 
    //           {'title': title
    //         }
    //       }
    //     }
    //   }
    // }
    //)
}

//NEEDS TO BE FIXED
async function findSet(owner, title) {
  connector();
  return await User.findOne({_id:owner}, 
     await Set.findOne({title: title}) 
  )
}

/****** DELETE ******/
async function deleteUser(username) {
  connector();

  return await User.deleteOne({ 'login.username':username  }, function (err) {
    if (err) console.log(err)
  });
}

//will work once others do
async function deleteCard(owner, set, id) {
  connector();
  var toDel = await findCard(owner, set, id).then((response) => {
});

  toDel.deleteOne();
}
async function deleteSet(owner, title) {
  connector();
  var toDel = await findSet(owner, title)

  toDel.deleteOne()
}

/****** VERIFICATION ******/
async function verifyLogin(username, password) {
  //find this user and their password
    var thisUser = await findUser(username);
    var corepass = thisUser.login.password;

    //if their password is correct then return the user to the frontend, if not return 0
    if(corepass = password){
      return thisUser;
    }
    else{
      return 0;
    }
}

/****** TESTING ******/
//createCard("testcard", "back", "front", "5ded7dcc39f3c03a3d23b517", "5ded794e5aadea8c6d4724ec")
//indCard("5ded794e5aadea8c6d4724ec", "5ded7dcc39f3c03a3d23b517", "testcard")
//deleteUser("eesr")
findSet("5ded794e5aadea8c6d4724ec",  "testset")
  .then((response) => {
    console.log(response);
});