import React, { ReactElement } from 'react';
import './Button.css';

interface ButtonProps {
    children: ReactElement | string;
    value: string;
    onClick: (value: string) => void
}
export const Button: React.FC<ButtonProps> = ({ children, value, onClick }) => {
    function onButtonClick(event: React.MouseEvent<HTMLButtonElement>) {
        onClick(value);
    }
    return <button className='button' onClick={onButtonClick}>{children}</button>
}