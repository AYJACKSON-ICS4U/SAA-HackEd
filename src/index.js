function attachHandler(){
  document.getElementById("submitButton").addEventListener("click", submit);
}

async function submit(){
  console.log("yes");
  const username = document.getElementById("username").value; 
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value; 

  await createUser(username,email,password).then(async()=>{
     userData = await getUserData(username);
  });
  document.location = "homepage.html";
 }

 async function createUser(username, email, password) {
  const url = "https://pacific-inlet-67317.herokuapp.com/api/createuser?username=" + username + "&password="+password+"&email="+email;
  console.log(url);
  const createuser = await fetch(url);
  const created = await createuser.text();
console.log(created);
  return created;
}
