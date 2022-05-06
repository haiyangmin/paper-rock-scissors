import './bettingPanel.css';
import {Bet, BetSymbol, GameStatus} from "../../features/betting/bettingSlice";

export interface BettingPanelProps {
    status: GameStatus
    pcBetSymbol: BetSymbol | null
    playerBets: Bet[]
    winAmount?: number
    playerWinSymbol?: BetSymbol | null
}

export default function BettingPanel({status, pcBetSymbol, playerBets, winAmount, playerWinSymbol}: BettingPanelProps) {

    const playerBetSymbols = playerBets.map(_ => _.betSymbol);
    const betSymbolsWithoutDuplicates = playerBetSymbols.filter((symbol, index) => {
        return playerBetSymbols.indexOf(symbol) === index;
    });

    if (status === 'idle') {
        return (
            <div className="idlePanel">
                <p className="bettingMessage">PICK YOUR POSITIONS</p>
            </div>
        );
    } else if (status === 'betting') {
        return (
            <div className="bettingPanel">
                <p>{pcBetSymbol}</p>
            </div>
        );
    } else if (status === 'displaying') {
        return (
            <div className="displayingPanel">
                <div className="pcBetSymbol">{pcBetSymbol?.toUpperCase()}</div>
                <div className="vs"> VS</div>
                <div className="playerBets">
                    {
                        betSymbolsWithoutDuplicates.map((symbol) => <div key={symbol}> {symbol.toUpperCase()} </div>)
                    }
                </div>
            </div>
        );
    } else {
        if (winAmount && winAmount > 0) {
            return (
                <div className="showResultPanel">
                    <p className="winText">{playerWinSymbol?.toUpperCase()} WON</p>
                    <p><span className="youWin">YOU WIN</span> {winAmount}</p>
                </div>
            );
        } else {
            return (
                <div className="showResultPanel">
                </div>
            );
        }
    }
}
