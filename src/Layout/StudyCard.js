import React from "react";
import { Link, useParams, useRouteMatch, Switch, Route, useHistory } from "react-router-dom"

function Card( { currentCard, frontSide, currentCardList, setFrontSide, cardSetter, setcurrentCard } ) {
    const history = useHistory()
    //handles the next button, resets the side of the card and sets the next card based on the current card
    function nextHandler() {
        setFrontSide(!frontSide)
        cardSetter(currentCard)
    }
    //creates window, on confirm, sets the current card to [0] and resets the side, on cancel, goes to home page
    function restartHandler() {
        if(window.confirm("Restart cards?\n\nClick 'cancel' to return to the home page.")) {
            setcurrentCard(currentCardList[0])
            setFrontSide(!frontSide)
        } else {
            history.push("/")
        }
    }

    return (
        <div className="card p-3">
            <h4 className="mb-3">Card {currentCardList.indexOf(currentCard) + 1} of {currentCardList.length}</h4>
            {frontSide
                ? <div>
                    <p>{currentCard.front}</p> 
                    <Link onClick={()=>setFrontSide(!frontSide)} className="btn btn-secondary">Flip</Link>
                  </div>
                : <div>
                    <p>{currentCard.back}</p> 
                    <Link onClick={()=>setFrontSide(!frontSide)} className="btn btn-secondary">Flip</Link>
                    {/* checks if the current card is the last card */}
                    {(currentCardList.indexOf(currentCard) === currentCardList.length - 1)
                    ? <Link onClick={()=>restartHandler()} className="btn btn-primary mx-2">Next</Link>
                    : <Link onClick={()=>nextHandler()} className="btn btn-primary mx-2">Next</Link>}
                  </div>
                }
        </div>
    )
}

export default Card