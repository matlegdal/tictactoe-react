import React, { Component } from 'react';
import Square from './Square';

export default class Board extends Component {
    renderSquare(i, squareClass = '') {
        return (
            <Square
                key={i}
                value={this.props.squares[i]}
                squareClass={squareClass}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    render() {
        let i = 0;
        const board = [1, 2, 3].map((row) => {
            return (
                <div key={row} className="board-row">
                    {
                        [1, 2, 3].map(() => {
                            // add the winner class to highlight squares that are part of the winning line
                            let squareClass = '';
                            if (this.props.winner) {
                                squareClass = this.props.winner.squares.includes(i) ? 'winner' : '';
                            }
                            // render the square 
                            const square = this.renderSquare(i, squareClass);
                            i++;
                            return square;
                        })
                    }
                </div>
            );
        });

        return (
            <div>
                {board}
            </div>
        );
    }
}