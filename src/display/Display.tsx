import React from 'react';
import './Display.css';

interface DisplayProps {
    display: string
}

export const Display: React.FC<DisplayProps> = ({ display }) => {
    return <div className='display-container'>{display}</div>
}