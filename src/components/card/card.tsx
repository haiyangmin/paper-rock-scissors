import './card.css';
import React from "react";

export type CardColor = 'blue' | 'green' | 'red';

export interface CardProps {
    color: CardColor
    highLight?: boolean
    children?: JSX.Element | JSX.Element[];
}

export default function Card({color, highLight = false, children}: CardProps) {
    return (
        <div className={highLight ? `card highLight ${color}` : `card ${color}`}>
            {children}
        </div>
    );
}
