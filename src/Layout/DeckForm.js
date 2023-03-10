import React, {useState} from "react";
import { Link } from "react-router-dom";

function DeckForm({initialFormData, apiHandler}) {
    const [ formData, setFormData ] = useState(initialFormData)
    function changeHandler(event) {
        setFormData({...formData, [event.target.name]: event.target.value})
    }

    //calls the respective apihandler function from the parent
    function submitHandler(event) {
        event.preventDefault()
        apiHandler(formData)
    }

    return <form onSubmit={submitHandler}>
        <div className="d-flex flex-column mb-3">
            <label htmlFor="name">
                Name
            </label>
            <input type="text" id="name" name="name" placeholder="Deck Name" value={formData.name} onChange={changeHandler}/>
        </div>
        <div className="d-flex flex-column mb-3">
            <label htmlFor="description">
                Description
            </label>
            <textarea id="description" name="description" placeholder="Brief description of the deck" value={formData.description} onChange={changeHandler}/>
        </div>
        <div>
            <Link to="/" className="btn btn-secondary">Cancel</Link>
            <button type="submit" className="btn btn-primary mx-2">Submit</button>
        </div>
    </form>
}

export default DeckForm