import React, { Component } from 'react';
import Board from './Board';
import calculateWinner from './helpers/calculateWinner';

export default class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null)
            }],
            xIsNext: true,
            stepNumber: 0,
            winner: null
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];

        // if the square is already occupied or the game is finished, do nothing
        if (current.squares[i] || this.state.winner) return;
        // update the state of the square
        const squares = current.squares.slice();
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        // check winner 
        const winner = calculateWinner(squares);
        // update the states
        this.setState({
            history: history.concat([{ squares }]),
            xIsNext: !this.state.xIsNext,
            stepNumber: history.length,
            winner,
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];

        // add a button to jump to step in history
        const moves = history.map((step, move) => {
            const desc = move ? `Go to move #${move}` : 'Go to game start';
            return (
                <li key={move}>
                    <button className={(move === this.state.stepNumber) ? 'current' : ''} onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });

        // update the status message : winner, draw or next player
        let status;
        if (this.state.winner) {
            status = `Winner: ${this.state.winner.player}`;
        } else if (!current.squares.includes(null)) {
            status = 'Draw!';
        } else {
            status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                        winner={this.state.winner}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}