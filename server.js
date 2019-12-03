//This program updates a REST API so users can save their flashcards and results
//Programmed by Sabrina Button, 2019, for ICS4U HackEd 2019 

//creating a server
const app = require("express")();
const http = require("http").createServer(app);
//enable cors
const cors = require("cors");
app.use(cors());

app.get("/api/users/", (req, res) => {
  res.send("message");
});
app.get("/api/userdata/", (req, res) => {
  res.send("message");
});

//set port to 3001 (TODO: set to any available port)
const port = 3001;

//listen on the port provided
http.listen(port, () => {
  console.log("Listening on port:", port);
});