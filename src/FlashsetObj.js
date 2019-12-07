import {newFlashset, deleteFlashset, updateFlashset} from "../db/routes/index.js"
import FlashcardObj from "./FlashcardObj.js";

export default class FlashsetdObj{
    constructor(title, userId, cards, thisId){
        this.title = title;
        this.cards = cards || [];
        this.owner = userId;

        //make the id the passed id, or if an id was not specified, make new set
        this.id = thisId || newFlashset(this);
    }

    addCard(){
        this.cards.push(new FlashcardObj(title, backtext,fronttext, x, userId));
        updateFlashset(this);
    }

    removeCard(id){
        this.cards = this.cards.filter(function( obj ) {
            return obj.id === id;
        });
        updateFlashset(this);
    }

    deleteSet(){
        deleteFlashset(this);
    }
}