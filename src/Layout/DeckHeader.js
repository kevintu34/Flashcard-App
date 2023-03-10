import React from "react";
import { Link, useRouteMatch } from "react-router-dom";

function DeckHeader({currentDeck, deleteHandler}) {
    const { url } = useRouteMatch()

    return <div>
        <nav>
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item active"><Link to={url}>{currentDeck.name}</Link></li>
            </ol>
        </nav>
        <h4>{currentDeck.name}</h4>
        <p>{currentDeck.description}</p>
        <div className="d-flex justify-content-between">
            <div>
                <Link to={`${url}/edit`} className="btn btn-secondary">Edit</Link>
                <Link to={`${url}/study`} className="btn btn-primary mx-2">Study</Link>
                <Link to={`${url}/cards/new`} className="btn btn-primary">Add Cards</Link>
            </div>
            <Link className="btn btn-danger" onClick={()=>deleteHandler(currentDeck.id)}>Delete</Link>
        </div>
    </div>
}

export default DeckHeader