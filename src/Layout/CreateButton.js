import React from "react";
import { Link } from "react-router-dom"

function CreateButton() {
    return <Link to="/decks/new" className="btn btn-secondary">Create Deck</Link>
}

export default CreateButton