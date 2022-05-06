import './banner.css';
import React from "react";

export type BannerColor = 'black';

export interface BannerProps {
    color: BannerColor
    children?: JSX.Element | JSX.Element[];
}

export default function Banner({color, children}: BannerProps) {
    return (
        <div className={`banner ${color}`}>
            {children}
        </div>
    );
}

