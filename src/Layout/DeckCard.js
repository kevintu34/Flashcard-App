import React from "react";
import { Link, useRouteMatch } from "react-router-dom"
import { deleteCard } from "../utils/api";

function DeckCard( {card, updated, setUpdated} ) {
    const {url} = useRouteMatch()

    //creates the window message and if yes is selected, delete the card and set updated so the page will rerender
    const deleteHandler = () => {
        if (window.confirm("Delete this card?\n\nYou will not be able to recover it.")) {
            deleteCard(card.id)
                .then(setUpdated(updated+1))
          }
    }

    return (
        <div className="card p-3">
            <div className="d-flex justify-content-between">
                <p className="col-6">{card.front}</p>
                <p className="col-6">{card.back}</p>
            </div>
            <div className="d-flex justify-content-end">
                <Link to={`${url}/cards/${card.id}/edit`} className="btn btn-secondary mx-2">Edit</Link>
                <Link onClick={()=>deleteHandler()} className="btn btn-danger">Delete</Link>
            </div>
        </div>
    )
}

export default DeckCard