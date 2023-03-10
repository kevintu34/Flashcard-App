import React from "react";
import { Link, useRouteMatch, useHistory } from "react-router-dom"
import DeckForm from "./DeckForm";
import { createDeck } from "../utils/api";

function CreateDeck({updated, setUpdated}) {
    const { url } = useRouteMatch()
    const history = useHistory()

    //sets up the initial form data state to pass in
    const initialFormData = {
        name: "",
        description: ""
    }
    
    //creates the deck, moves the user to the new deck page, and sets updated to rerender the deck list
    function apiHandler(formData) {
        createDeck(formData)
        .then(response=>history.push(`/decks/${response.id}`))
        .then(()=>setUpdated(updated+1))
    }

    return (
        <div>
            <nav>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item active"><Link to={url}>Create Deck</Link></li>
                </ol>
            </nav>
            <h2>Create Deck</h2>
            <DeckForm apiHandler={apiHandler} initialFormData={initialFormData}/>
        </div>
    )
}

export default CreateDeck