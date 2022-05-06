import Chip from "../chip/chip";
import React from "react";
import Card, {CardColor} from "../card/card";
import './bettingCard.css';

export interface BettingCardProps {
    color: CardColor
    content: string
    bets?: number[];
    highLight?: boolean
    onClick?: () => void
}

export default function BettingCard({color, content, bets = [], highLight, onClick}: BettingCardProps) {

    const calculateTotalBet = bets.reduce((sum, bet) => sum + bet, 0);

    return (
        <div onClick={onClick}>
            <Card color={color} highLight={highLight}>
                <>
                    {bets.length > 0 && (
                        <Chip value={calculateTotalBet}/>
                    )}
                </>
                <p className="cardContent">
                    {content}
                </p>
            </Card>
        </div>
    );
}
