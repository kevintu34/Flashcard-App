import React, {useEffect, useState} from "react";
import { Link, useParams, useRouteMatch, useHistory } from "react-router-dom";
import { readCard, updateCard } from "../utils/api";
import CardForm from "./CardForm";

function EditCard( {currentDeck, updated, setUpdated} ) {
    const {url} = useRouteMatch()
    const history = useHistory()
    const {deckId, cardId} = useParams()
    const [currentCard, setcurrentCard] = useState({})

    //api call and sets currentCard on page enter
    useEffect(()=>{
        async function cardLoader() {
            const response = await readCard(cardId)
            setcurrentCard(response)
        }
        cardLoader()
    },[])

    //updates the card using the formdata and brings user to the appropriate deck, sets updated so the cards rerender
    function apiHandler(formData) {
        updateCard(formData)
        .then(response=>history.push(`/decks/${response.deckId}`))
        .then(()=>setUpdated(updated+1))
    }

    return <div>
        <nav>
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>Deck {currentDeck.name}</Link></li>
                <li className="breadcrumb-item active"><Link to={`${url}`}>Edit Card {cardId}</Link></li>
            </ol>
        </nav>
        <CardForm initialFormState={currentCard} submitButtonText="Submit" cancelButtonText="Cancel" apiHandler={apiHandler}/>
    </div>
}

export default EditCard