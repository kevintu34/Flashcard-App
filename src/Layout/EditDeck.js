import React from "react";
import DeckForm from "./DeckForm";
import { updateDeck } from "../utils/api";
import { useHistory, Link, useRouteMatch, useParams } from "react-router-dom";

function EditDeck({currentDeck, updated, setUpdated}) {
    const history = useHistory()
    const {url} = useRouteMatch()
    const {deckId} = useParams()

    //sets initial form data to the current deck from the deck component
    const initialFormData = {
        ...currentDeck
    }

    //updates the deck and moves the user to the deck's page, sets updated to rerender the deck page
    function apiHandler(formData) {
        updateDeck(formData)
        .then(response=>history.push(`/decks/${response.id}`))
        .then(()=>setUpdated(updated+1))
    }

    return <div>
        <nav>
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{currentDeck.name}</Link></li>
                <li className="breadcrumb-item active"><Link to={`${url}`}>Edit Deck</Link></li>
            </ol>
        </nav>
        {initialFormData.name && <DeckForm initialFormData={initialFormData} apiHandler={apiHandler}/>}
    </div>
}

export default EditDeck