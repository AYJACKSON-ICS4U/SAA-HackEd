function attachHandler(){
  document.getElementById("loginButton").addEventListener("click", login);
}

async function login(){
  console.log("here");
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value; 
  console.log("here");
    userData = await verifyLogin(username,password);
    console.log("here");
    console.log("User Data returned: " + userData);
    if(userData === null){
      console.log("here!");
      alert("null");
    }  
    else {
      document.location = "homepage.html";
    }
  verifyLogin(username, password);
}

async function verifyLogin(username, password) {
  console.log("here");
  const url = "https://pacific-inlet-67317.herokuapp.com/api/verifylogin?username=" + username + "&password=" + password;
  const verify = await fetch(url);
  console.log("here");
  console.log(verify);
  return verify;
}


