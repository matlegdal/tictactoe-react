import React from 'react';

export default function Square(props) {
    const squareClass = `square ${props.squareClass}`;
    return (
        <button className={squareClass} onClick={props.onClick}>
            {props.value}
        </button>
    );
}