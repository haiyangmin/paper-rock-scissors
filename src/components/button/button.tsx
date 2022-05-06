import './button.css';

export interface ButtonProps {
    content: string
    disabled: boolean
    onClick?: () => void
}

export default function Button({content, disabled, onClick}: ButtonProps) {
    return (
        <button className={disabled ? 'disabledButton' : 'enabledButton'} disabled={disabled} onClick={onClick}>
            {content}
        </button>
    );
}
