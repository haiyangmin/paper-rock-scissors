import './chip.css';

export interface ChipProps {
    value: number
}

export default function Chip({value}: ChipProps) {
    return (
        <div className="circle">
            {value}
        </div>
    );
}
