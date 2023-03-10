import React from "react";
import { Link } from "react-router-dom"

function DeckList({ decks, deleteHandler }) {

    return (
        <div className="mt-2">
            {decks.map((deck, index)=> 
            <div className="card p-3">
                <div className="d-flex justify-content-between">
                    <h4 className="card-title">{deck.name}</h4>
                    <span>{deck.cards.length} cards</span>
                </div>
                <p className="card-text">{deck.description}</p>
                <div className="d-flex justify-content-between">
                    <div>
                        <Link to={`/decks/${deck.id}`} className="btn btn-secondary">View</Link>
                        <Link to={`/decks/${deck.id}/study`} className="btn btn-primary mx-2">Study</Link>
                    </div>
                    <Link onClick={()=>deleteHandler(deck.id)} className="btn btn-danger">Delete</Link>
                </div>
            </div>
            )}
        </div>
    )
}

export default DeckList