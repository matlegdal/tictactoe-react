import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    const squareClass = `square ${props.squareClass}`;
    return (
        <button className={squareClass} onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends Component {
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
                            let squareClass = '';
                            if (this.props.winner) {
                                squareClass = this.props.winner.squares.includes(i) ? 'winner' : '';
                            }
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

class Game extends Component {
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
        const winner = calculateWinner(squares);
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

        const moves = history.map((step, move) => {
            const desc = move ? `Go to move #${move}` : 'Go to game start';
            return (
                <li key={move}>
                    <button className={(move === this.state.stepNumber) ? 'current' : ''} onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });

        let status;
        // let winnerSquares;
        if (this.state.winner) {
            status = `Winner: ${this.state.winner.player}`;
            // winnerSquares = this.state.winner.squares.slice();
        } else {
            status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
            // winnerSquares = null;
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                        winner = {this.state.winner}
                        // winnerSquares={winnerSquares}
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

// ========================================
//              Helpers
// ========================================

// TODO: add handling of ties
function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) return { player: squares[a], squares: [a, b, c] };
    }

    return null;
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
