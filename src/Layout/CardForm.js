import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function CardForm({initialFormState, submitButtonText, cancelButtonText, apiHandler}) {
    const [formData, setFormData] = useState({})
    const {deckId} = useParams()

    //sets the formData when initialFormState finishes fetching from API
    useEffect(()=>{
        setFormData(initialFormState)
    },[initialFormState])

    function changeHandler(event) {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    //calls the respective api function from the parent and resets the form data to the initial state (for adding card)
    function submitHandler(event) {
        event.preventDefault()
        apiHandler(formData)
        setFormData(initialFormState)
    }

    return <div>
        <form onSubmit={submitHandler}>
            <div className="d-flex flex-column mb-3">
                <label htmlFor="front">Front</label>
                <textarea onChange={changeHandler} value={formData.front} id="front" name="front" placeholder="Front side of card" className="p-2"></textarea>
            </div>
            <div className="d-flex flex-column mb-3">
                <label htmlFor="back">Back</label>
                <textarea onChange={changeHandler} value={formData.back} id="back" name="back" placeholder="Back side of card" className="p-2"></textarea>
            </div>
            <div>
                <Link to={`/decks/${deckId}`} className="btn btn-secondary">{cancelButtonText}</Link>
                <button className="btn btn-primary mx-2" type="submit">{submitButtonText}</button>
            </div>
        </form>
    </div>
}

export default CardForm