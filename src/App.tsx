import React from 'react';
import './App.css';
import Card from "./components/card/card";
import Chip from "./components/chip/chip";
import Button from "./components/button/button";

function App() {
    return (
        <div className="app">
            <div className="cardsContainer">
                <Card color='blue' content='ROCK'/>
                <Card color='green' content='PAPER'/>
                <Card color='red' content='SCISSORS'/>
            </div>
            <Chip value={500}/>
            <Button content='PLAY' disabled={false}/>
            <Button content='PLAY' disabled={true}/>
        </div>
    );
}

export default App;
