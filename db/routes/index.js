var express = require('express');
var router = express.Router();

/* GET home page. TODO: DELETE*/
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET Userlist page. TODO: DELETE */
router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.db("db").collection("usercollection");
    collection.find({},{},function(e,docs){
        res.render('userlist', {
            "userlist" : docs
        });
    });
});

//push a new user to db
function newUser(username, password, email){
    router.post('/adduser', function(req, res) {
        // Set our internal DB variable
        var db = req.db;
        
        // Get our form values. These rely on the "name" attributes
        var userName = username;
        var userEmail = email
        var userPass = password;
    
        // Set our collection
        var collection = db.db("db").collection("usercollection");

        // Submit to the DB
        collection.insertOne({
            "login": {
            "username" : userName,
            "email" : userEmail,
            "password": userPass
            },
            "sets": []
            
        }, function (err, doc) {
            if (err) {
                // If it failed, return error
                res.send("There was a problem adding the information to the database: " + err);
            }
            else {
                // And forward to success page
                res.redirect("userlist");
            }
        });
    });
}

//verify user logging in
function verifyLogin(username, password){
    router.get('/userlist', function(req, res) { 
        var db = req.db;

        var collection = db.get('usercollection');

        collection.map(user => {
            //if can find the user and usename, return the id
            if(user.login.username === username && user.login.password === password){
                return user._id;
            }
        })

        //if could not find, then return undefined
        return undefined;
    });
}

function newFlashcard(flashcard){
    router.post('/addcard', function(req, res) {
        // Set our internal DB variable
        var db = req.db;
    
        // Set our collection to users flashset 
        var collection = db.get('usercollection').find({"_id": ObjectId(flashcard.owner)}).sets.find({"_id": ObjectId(flashcard.set)});

        // Submit to the DB
        collection.insert({
            "title": flashcard.title
        }, function (err, doc) {
            if (err) {
                // If it failed, return error
                res.send("There was a problem adding the information to the database.");
            }
            else {
                // And forward to success page
                res.send("Flashcard added to set.");
                return(doc);
            }
        });
    });
}

function newFlashSet(flashset){
    router.post('/addset', function(req, res) {
        // Set our internal DB variable
        var db = req.db;
    
        var collection = db.get('usercollection');
    
        // Submit to the DB
        collection.update({ _id: ObjectId("5de8172f92c68afb85523163") },
        {$push: {sets: flashset}} , function (err, doc) {
            if (err) {
                // If it failed, return error
                res.send(err);
            }
            else {
                // And forward to success page
                res.redirect("userlist");
            }
        });
    });
}

function updateFlashSet(flashset){
    router.post( 'updateset', function (req,res) {
var collection = db.get('usercollection').find({"_id": ObjectId(flashset.owner)}).sets.find({"_id": ObjectId(flashset.id)});
    collection.update({ flashset }, function (err, doc) {
            if (err) {
                // If it failed, return error
                res.send(err);
            }
            else {
                // And forward to success page
                res.redirect("userlist");
            }
        });
    }); 
   
}
function deleteFlashcard(flashcard){
    var url = '/deletecard';
    router.get(url, function(req, res) { 
        var db = req.db;

        var collection = db.get('usercollection').find({"_id": ObjectId(flashcard.owner)}).sets.find({"_id": ObjectId(flashcard.set)});

        collection.remove({"_id":flashcard.id}, function(err, result) { 
            res.send( (result === 1) ? { msg: 'Deleted' } : { msg: 'error: '+ err } );
        });

    });
}

function deleteFlashSet(flashset){
    var url = '/deleteset';
    router.get(url, function(req, res) { 
        var db = req.db;

        var collection = db.get('usercollection').find({"_id": ObjectId(flashset.owner)}).sets;

        collection.remove({"_id":flashset.id}, function(err, result) { 
            res.send( (result === 1) ? { msg: 'Deleted' } : { msg: 'error: '+ err } );
        });

    });
}

function deleteUser(userId){
    var url = '/deleteuser/' + userId;
    router.get(url, function(req, res) { 
        var db = req.db;

        var uid = req.params.id.toString();
        var collection = db.get('usercollection');

        collection.remove({"_id":uid}, function(err, result) { 
            res.send( (result === 1) ? { msg: 'Deleted' } : { msg: 'error: '+ err } );
        });

    });
}

// export default function getFlashset(userId, setId){
// }

// export default function getSets(userId){
// }

// export default function getFlashcard(userId, setId, cardId){

// }

//TODO: REMOVE
router.get('/newuser', function(req, res) {
    res.render('newuser', { title: 'Add New User' });
    newUser("Rebecca Black","itsFrid4y!","yourgalrebecca@gmail.com");
});


module.exports = router;
