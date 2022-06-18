import React, { useEffect, useState } from 'react';
import { Button } from '../button/Button';
import { Button as ButtonType } from '../types/Button';
import './ButtonPad.css';

interface ButtonnPadProps {
    onButtonClick: (value: string) => void;
}

function initialiseButtons() {
    const buttons: ButtonType[] = [];
    for (let i = 0; i < 10; i++) {
        buttons.push({
            display: i.toString(),
            value: i.toString()
        })
    }
    const otherButtons: ButtonType[] = [{
        display: 'Reset',
        value: 'reset'
    }, {
        display: '+',
        value: '+'
    }, {
        display: '-',
        value: '-'
    }, {
        display: '*',
        value: '*'
    }, {
        display: '/',
        value: '/'
    }, {
        display: '=',
        value: '='
    }, {
        display: '+/-',
        value: '+/-'
    }]
    return buttons.concat(otherButtons);
}

export const ButtonPad: React.FC<ButtonnPadProps> = ({ onButtonClick }) => {
    const [buttons, setButtons] = useState<ButtonType[]>([]);
    useEffect(() => {
        setButtons(initialiseButtons());
    }, []);

    return <div className='button-pad-container'>
        {buttons.map((b: ButtonType) => <Button key={b.value} onClick={onButtonClick} value={b.value}>{b.display}</Button>)}
    </div>
}