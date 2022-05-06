import Button from "../button/button";
import React from "react";
import {GameStatus} from "../../features/betting/bettingSlice";

export interface BettingButtonProps {
    status: GameStatus
    onClick: () => void
}

export default function BettingButton({status, onClick}: BettingButtonProps) {
    if (status === 'idle') {
        return (
            <Button content='PLAY' disabled={false} onClick={onClick}/>
        );
    } else if (status === 'betting' || status === 'displaying') {
        return (
            <Button content='PLAY' disabled={true}/>
        );
    } else {
        return (
            <Button content='CLEAR' disabled={false} onClick={onClick}/>
        );
    }
}
