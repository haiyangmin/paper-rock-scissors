import './card.css';

export type CardColor = 'blue' | 'green' | 'red';

export interface CardProps {
    color: CardColor
    content: string
}

export default function Card({color, content}: CardProps) {
    return (
        <div className={`card ${color}`}>
            <p className="cardContent">
                {content}
            </p>
        </div>
    );
}
