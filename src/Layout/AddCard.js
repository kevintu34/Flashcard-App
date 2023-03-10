import React from "react";
import { Link, useRouteMatch, useParams } from "react-router-dom";
import CardForm from "./CardForm";
import { createCard } from "../utils/api";

function AddCard( {currentDeck, updated, setUpdated} ) {
    const {deckId} = useParams()
    const {url} = useRouteMatch()
    const initialFormState = {
        front: "",
        back: "",
        deckId
    }

    //calls api to create card, then it sets updated to a new value to rerender the deck's cards
    function apiHandler(formData) {
        createCard(formData.deckId, formData)
        .then(()=>setUpdated(updated+1))
    }

    return <div>
        <nav>
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{currentDeck.name}</Link></li>
                <li className="breadcrumb-item active"><Link to={`${url}`}>Add Card</Link></li>
            </ol>
        </nav>
        <h4>{currentDeck.name}: Add Card</h4>
        <CardForm initialFormState={initialFormState} submitButtonText="Save" cancelButtonText="Done" apiHandler={apiHandler}/>
    </div>
}

export default AddCard