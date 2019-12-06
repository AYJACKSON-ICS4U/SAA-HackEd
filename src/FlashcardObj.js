import {newFlashcard, deleteFlashcard} from "../db/routes/index.js"

export default class FlashcardObj{
    constructor(title, fronttext, backtext, flashsetId, userId, thisId){
        //object parameters
        this.title = title;
        this.front = fronttext;
        this.back = backtext;
        this.set = flashsetId;
        this.owner = userId;

        //make the id the passed id, or if an id was not specified, make new card
        this.id = thisId || newFlashcard(this);
    }

    delete(){
        deleteFlashcard(this);
    }
}