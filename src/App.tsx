import React from 'react';
import './App.css';
import BettingCard from "./components/bettingCard/bettingCard";
import BettingPanel from "./components/bettingPanel/bettingPanel";
import {useAppDispatch, useAppSelector} from "./app/hooks";
import {
    clear,
    getPcBettingResultAsync,
    checkAllowBet,
    placeBet,
    selectBalance,
    selectPlayerBets,
    selectStatus,
    Bet,
    selectWinAmount, selectBetAmount, selectPcBetSymbol
} from "./features/betting/bettingSlice";
import BettingButton from "./components/bettingButton/bettingButton";
import BettingDetailsBanner from "./components/bettingDetailsBanner/bettingDetailsBanner";


function App() {

    const dispatch = useAppDispatch();
    const status = useAppSelector(selectStatus);
    const playerBets = useAppSelector(selectPlayerBets);
    const balance = useAppSelector(selectBalance);
    const winAmount = useAppSelector(selectWinAmount);
    const betAmount = useAppSelector(selectBetAmount);
    const pcBetSymbol = useAppSelector(selectPcBetSymbol);

    let isBettingOnRockAllowed = true;
    let isBettingOnPaperAllowed = true;
    let isBettingOnScissorsAllowed = true;

    const betsOnRock: number[] = playerBets.filter(_ => _.betSymbol === 'rock').map(_ => _.betAmount);
    const betsOnPaper: number[] = playerBets.filter(_ => _.betSymbol === 'paper').map(_ => _.betAmount);
    const betsOnScissors: number[] = playerBets.filter(_ => _.betSymbol === 'scissors').map(_ => _.betAmount);

    const rockOnClick = () => {
        const bet: Bet = {
            betSymbol: 'rock',
            betAmount: 500
        }
        isBettingOnRockAllowed = checkAllowBet('rock', [...playerBets, ...[bet]], balance)
        if (isBettingOnRockAllowed) {
            dispatch(placeBet(bet));
            betsOnRock.push(bet.betAmount);
        }
    }

    const paperOnClick = () => {
        const bet: Bet = {
            betSymbol: 'paper',
            betAmount: 500
        }
        isBettingOnPaperAllowed = checkAllowBet('paper', [...playerBets, ...[bet]], balance)
        if (isBettingOnPaperAllowed) {
            dispatch(placeBet(bet))
            betsOnPaper.push(bet.betAmount)
        }
    }

    const scissorsOnClick = () => {
        const bet: Bet = {
            betSymbol: 'scissors',
            betAmount: 500
        }
        isBettingOnScissorsAllowed = checkAllowBet('scissors', [...playerBets, ...[bet]], balance);
        if (isBettingOnScissorsAllowed) {
            dispatch(placeBet(bet))
            betsOnScissors.push(bet.betAmount)
        }
    }

    const onClick = () => {
        if (playerBets.length === 0) {
            return
        }
        if (status === 'idle') {
            dispatch(getPcBettingResultAsync())
        }
        if (status === 'finished') {
            dispatch(clear());
        }
    }

    return (
        <div className="app">
            <BettingDetailsBanner balance={balance} betAmount={betAmount} winAmount={winAmount}/>
            <BettingPanel status={status} pcBetSymbol={pcBetSymbol} playerBets={playerBets}/>
            <div className="cardsContainer">
                <BettingCard color='blue' content='ROCK' bets={betsOnRock} onClick={rockOnClick}/>
                <BettingCard color='green' content='PAPER' bets={betsOnPaper} onClick={paperOnClick}/>
                <BettingCard color='red' content='SCISSORS' bets={betsOnScissors} onClick={scissorsOnClick}/>
            </div>
            <BettingButton status={status} onClick={onClick}/>
        </div>
    );
}

export default App;
