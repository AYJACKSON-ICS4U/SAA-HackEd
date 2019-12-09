import React from 'react';
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import background from  './background.png';

function App() {
  function handleClick() {
    console.log("Clicked!")
  }

  return (
    <div>
      <div className = "header">
        <h1 className="text-center">FlashTime</h1>
      </div>
      <img src = {background} ></img>
      <div className = "text-center">
    </div>
    <div className = "form-container">
      <div className = "font">
      <h3 className = "text-center" >SIGN UP</h3>
    </div>
    <div class = "form">
        <form>
            <div className="form-group">
                <div className = "font">
              <label for="email"><h4>Email address</h4></label>
              </div>
              <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"></input>
            </div>
            <div className="form-group">
                <div className = "font">
              <label for="password"><h4>Password</h4></label>
              </div>
              <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"></input>
            </div>
            <a href="homepage.html" className="btn btn-info" type = "button" role="submit" aria-pressed="true">Submit</a>
            <a href="login.html" onClick={handleClick()}className="btn btn-info" type = "button" role="submit" aria-pressed="true">Login</a>
          </form>
       </div>
      </div>
    </div>
  
    
  );
}

export default App;
