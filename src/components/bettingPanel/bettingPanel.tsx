import './bettingPanel.css';
import {Bet, BetSymbol, GameStatus} from "../../features/betting/bettingSlice";

export interface BettingPanelProps {
    status: GameStatus
    pcBetSymbol: BetSymbol | null
    playerBets: Bet[]
}

export default function BettingPanel({status, pcBetSymbol, playerBets}: BettingPanelProps) {

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
                        playerBets.map((bet) => <div key={bet.betSymbol}> {bet.betSymbol.toUpperCase()} </div>)
                    }
                </div>
            </div>
        );
    } else {
        return (
            <div className="showResultPanel">
                <p>win</p>
            </div>
        );
    }
}
