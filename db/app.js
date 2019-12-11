//requirements
const app = require("express")();
const http = require("http").createServer(app);
const cors = require("cors");
const db = require("./db-comm.js");

//enable cors
app.use(cors());

//api calls for each db communication function, uses req params passed in as ?username=<username>
app.get("/api/createuser/", (req, res) => {
    db.createUser(req.query.username,req.query.email,req.query.password);
    res.send("Created a new user.");
});

app.get("/api/createset/", (req, res) => {
    db.createSet(req.query.username,req.query.email,req.query.password);
    res.send("Created a new set.");
});

app.get("/api/createcard/", (req, res) => {
    db.createCard(req.query.definition,req.query.term,req.query.set,req.query.owner);
    res.send("Created a new card.");
});

app.get("/api/deleteuser/", (req, res) => {
    db.deleteUser(req.query.username);
    res.send("Deleted a user.");
});

app.get("/api/deleteset/", (req, res) => {
    db.deleteSet(req.query.owner, req.query.set);
    res.send("Deleted a set.");
});

app.get("/api/deletecard/", (req, res) => {
    db.deleteCard(req.query.owner, req.query.set, req.query.card);
    res.send("Deleted a card.");
});

app.get("/api/verifylogin/", async (req, res) => {
    var status = await db.verifyLogin(req.query.username, req.query.password);
    //send the user info through login back to frontend
    res.send(status);
});

app.get("/api/getuserdata/", async (req, res) => {
    var status = await db.getUserData(req.query.username);
    //send user info back to frontend
    res.send(status);
});

//set port
const PORT = process.env.PORT || 3000;

//listen on the port provided
http.listen(PORT, () => {
  console.log("Listening on port:", PORT);
});
