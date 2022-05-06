import './card.css';
import React from "react";

export type CardColor = 'blue' | 'green' | 'red';

export interface CardProps {
    color: CardColor
    children?: JSX.Element | JSX.Element[];
}

export default function Card({color, children}: CardProps) {
    return (
        <div className={`card ${color}`}>
            {children}
        </div>
    );
}
