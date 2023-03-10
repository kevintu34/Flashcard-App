import React, { useEffect, useState } from "react";
import { Link, useParams, useRouteMatch, Switch, Route } from "react-router-dom"
import { readDeck } from "../utils/api";
import DeckCard from "./DeckCard";
import StudyCard from "./StudyCard";
import DeckHeader from "./DeckHeader";
import EditCard from "./EditCard";
import EditDeck from "./EditDeck";
import AddCard from "./AddCard";

function Deck( {deleteHandler, updated, setUpdated} ) {
    const { deckId } = useParams()
    const [ currentDeck, setCurrentDeck ] = useState({})
    const [ currentCardList, setcurrentCardList ] = useState([])
    const [ currentCard, setcurrentCard ] = useState({})
    const [ frontSide, setFrontSide ] = useState(true)
    const { path, url } = useRouteMatch()

    //sets the current deck, card list, and first card to the one matching the URL param
    function initialSetter(deck) {
        setCurrentDeck(deck)
        setcurrentCardList(deck.cards)
        setcurrentCard(deck.cards[0])
    }

    //calls initialSetter whenever updated is changed so the deck info and cards will rerender on return
    useEffect(()=>{
        readDeck(deckId)
        .then((deck)=>initialSetter(deck))
    },[updated])

    //sets the next card for the study component
    function cardSetter(currentCardDisplayed) {
        //new index number is the current index number + 1
        const newCardIndex = currentCardList.indexOf(currentCardDisplayed) + 1
        //if it exists, set the card to the currentcardlist[newcardindex]
        if(currentCardList[newCardIndex]) {
            setcurrentCard(currentCardList[newCardIndex])
        }
    }

    return (
        <div>
            <Switch>
                <Route path={path} exact>
                    <DeckHeader currentDeck={currentDeck} deleteHandler={deleteHandler} deckId={deckId} currentCardList={currentCardList}/>
                    <h2 className="mt-3">Cards</h2>
                    {currentCardList.map(card=><DeckCard card={card} updated={updated} setUpdated={setUpdated}/>)}
                </Route>
                <Route path={`${path}/study`} exact>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                            <li className="breadcrumb-item"><Link to={url}>{currentDeck.name}</Link></li>
                            <li className="breadcrumb-item active"><Link to={`${url}/study`}>Study</Link></li>
                        </ol>
                    </nav>
                    <h2>Study: {currentDeck.name}</h2>
                    {(currentCardList.length < 3) 
                    ? <div>
                        <h2>Not enough cards.</h2>
                        <p>You need at least 3 cards to study. There are {currentCardList.length} cards in this deck.</p>
                        <Link to={`${url}/cards/new`} className="btn btn-primary">Add Cards</Link>
                      </div>
                    : <StudyCard frontSide={frontSide} currentCard={currentCard} currentCardList={currentCardList} setFrontSide={setFrontSide} cardSetter={cardSetter} setcurrentCard={setcurrentCard}/>
                    }
                </Route>
                <Route path={`${path}/edit`}>
                    <EditDeck currentDeck={currentDeck} updated={updated} setUpdated={setUpdated}/>
                </Route>
                <Route path={`${path}/cards/new`} exact>
                    <AddCard currentDeck={currentDeck} updated={updated} setUpdated={setUpdated}/>
                </Route>
                <Route path={`${path}/cards/:cardId/edit`}>
                    <EditCard currentDeck={currentDeck} updated={updated} setUpdated={setUpdated}/>
                </Route>
            </Switch>
        </div>
    )
    
}

export default Deck