import Banner from "../banner/banner";
import './bettingDetailsBanner.css';

export interface BettingDetailsBannerProps {
    balance: number
    betAmount: number
    winAmount: number
}

export default function BettingDetailsBanner({balance, betAmount, winAmount}: BettingDetailsBannerProps) {
    return (
        <Banner color='black'>
            <p><span className="balance">BALANCE</span>: {balance}</p>
            <p className='betText'><span className="bet">BET</span>: {betAmount}</p>
            <p><span className="win">WIN</span>: {winAmount}</p>
        </Banner>
    );
}
