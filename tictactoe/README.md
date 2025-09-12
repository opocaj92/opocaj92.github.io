# TicTacToeAI

## A simple web version of TicTacToe with AI

### How it works
It's written using HTML5+CSS3 for the UI and pure JavaScript (no framework) for the logic of the game. The board is represented with an HTML table, and each cell has an unique ID. When one is clicked, it triggers an event that lets the computer decide its move. The AI it's made using three different algorithms: the Minimax algorithm, the Negamax algorithm (good for zero-sum game like TicTacToe) and the Alpha-Beta Pruning. All of them check for the best move in all the search tree (the AI is therefore unbeatable in every version). Default choice is the Minimax implementation.

### Author
*Castellini Jacopo*
