import React, { useState } from 'react';
import { Display } from '../display/Display';
import { ButtonPad } from '../button-pad/ButtonPad';
import './Calculator.css';

interface CalculatorState {
    result: string;
    operation: string;
    buffer: string;
}
const initialState: CalculatorState = {
    result: '0',
    operation: '',
    buffer: ''
}
export const Calculator = () => {
    const [state, setState] = useState<CalculatorState>(initialState);
    const [history, setHistory] = useState<CalculatorState[]>([]);

    function updateHistory(newState: CalculatorState) {
        setHistory(h => ([
            ...h,
            newState
        ]))
    }
    function storeOperation(operation: string) {
        if (state.operation.length > 0) {
            return;
        }
        setState(s => ({ result: initialState.result, operation, buffer: s.result }));
    }

    function performOperation() {
        if (state.operation.length === 0) {
            return;
        }
        let val: number = 0;
        switch (state.operation) {
            case '+': val = Number(state.buffer) + Number(state.result); break;
            case '-': val = Number(state.buffer) - Number(state.result); break;
            case '*': val = Number(state.buffer) * Number(state.result); break;
            case '/': {
                if (Number(state.result) === 0) {
                    throw 'Cannot divide by zero';
                }
                val = Number(state.buffer) / Number(state.result);
                break
            };
        }

        const newState: CalculatorState = {
            result: val.toString(),
            operation: '',
            buffer: ''
        };
        updateHistory({ ...state, result: newState.result });
        setState(newState)
        return;
    }
    function invertValue() {
        setState(s => ({
            ...s,
            result: (-s.result).toString()
        }))
    }
    function onButtonClick(value: string) {
        try {
            switch (value) {
                case 'reset': setState(initialState); break;
                case '+':
                case '-':
                case '*':
                case '/': storeOperation(value); break;
                case '+/-': invertValue(); break;
                case '=': performOperation(); break;
                default: {
                    setState(s => ({
                        result: Number(s.result + value).toString(),
                        operation: s.operation,
                        buffer: s.buffer
                    }));
                    break;
                }
            }
        } catch (err: any) {
            console.log('error ', err);
            setState(s => ({
                ...s,
                result: 'Error'
            }))
        }

    }

    function jumpToState(historyState: CalculatorState) {
        setState(s => ({
            ...s,
            result: historyState.result
        }))
    }

    return <div>
        <div className='calculator-container'>
            <Display display={state.result} />
            <ButtonPad onButtonClick={onButtonClick} />
        </div>
        <div>
            {history.map((h, i) => <div key={i}>
                <p>Result: {h.result}</p>
                <p>Operation: {h.operation}</p>
                <p>Buffer: {h.buffer}</p>
                <button onClick={jumpToState.bind(null, h)}>Jump</button>
                <hr />
            </div>)}
        </div>
    </div>
}