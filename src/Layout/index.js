import React, { useState, useEffect } from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import { Route, Switch, useHistory } from "react-router-dom"
import CreateButton from "./CreateButton";
import DeckList from "./DeckList";
import { listDecks, deleteDeck } from "../utils/api";
import Deck from "./Deck";
import CreateDeck from "./CreateDeck";

function Layout() {
  const [ decks, setDecks ] = useState([]);
  const [ updated, setUpdated ] = useState(1)
  const history = useHistory()
  
  //fetches list of decks and sets it to the decks state, rerenders whenever update state is set
  useEffect(() => {
    listDecks()
      .then((decksFromAPI)=>setDecks(decksFromAPI))
  },[updated])

  //delete's deck, used in deck and deck list, sets update to rerender and moves user to home page
  function deleteHandler(deckToDelete) {
    if (window.confirm("Delete this deck?\n\nYou will not be able to recover it.")) {
      deleteDeck(deckToDelete)
        .then(()=>setUpdated(updated + 1))
        .then(history.push("/"))
    }
  }

  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route path="/" exact>
            <CreateButton />
            <DeckList decks={decks} deleteHandler={deleteHandler}/>
          </Route>
          <Route path="/decks/new" exact>
            <CreateDeck updated={updated} setUpdated={setUpdated}/>
          </Route>
          <Route path="/decks/:deckId">
            <Deck deleteHandler={deleteHandler} setUpdated={setUpdated} updated={updated}/>
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
