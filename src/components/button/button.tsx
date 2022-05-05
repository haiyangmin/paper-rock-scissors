import './button.css';

export interface ButtonProps {
    content: string
    disabled: boolean
}

export default function Button({content, disabled}: ButtonProps) {
    return (
        <button className={disabled ? 'disabledButton' : 'enabledButton'} disabled={disabled}>
            {content}
        </button>
    );
}
