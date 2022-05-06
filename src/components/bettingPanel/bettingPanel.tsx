import './bettingPanel.css';
import {Bet, BetSymbol, GameStatus} from "../../features/betting/bettingSlice";
import {CountdownCircleTimer} from 'react-countdown-circle-timer'

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
                <CountdownCircleTimer
                    isPlaying
                    duration={3}
                    trailColor='#e3e3e3'
                    colors={['#16c359', '#A30000', '#A30000']}
                    colorsTime={[2, 1, 0]}
                >
                    {({remainingTime}) => {
                        return (
                            <div className='timer'>
                                {remainingTime}
                            </div>
                        )
                    }}
                </CountdownCircleTimer>
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
                    <div className="winText">{playerWinSymbol?.toUpperCase()} WON</div>
                    <div><span className="youWin">YOU WIN</span> {winAmount}</div>
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
