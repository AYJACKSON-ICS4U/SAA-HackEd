import React, { useState } from "react";

function Flashcard(props) {
    //send a flashcard object to this react component
    const [flipped, setFlipped] = useState(false);
    
    function flip(){
        //set flipped to the opposite of what it is (ex. false => true)
        setFlipped(!flipped);
    }

    return (
      <div>
        <h2>{flipped ? props.flashcard.front : props.flashcard.back }</h2>
      </div>
    );
  }
  
  export default Flashcard;