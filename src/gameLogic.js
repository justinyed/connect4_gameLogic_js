
// Settings
const HEIGHT = 6;
const WIDTH = 7;
const CONNECT_N = 4;

// Codes
const PLAYER_1_CODE = -1;
const PLAYER_2_CODE = 1;
const NULL_CODE = 0;
const DRAW_CODE = 100;
const FULL_COLUMN_CODE = 7;
const OUT_OF_BOUNDS_CODE = 8;

/**
 * 
 */
class Game {

    constructor() {
        this.gameID = new Date().valueOf() / 1000; // Epoch Time
        this.clearBoard();
    }

    /**
     * Sets turns to 0 and state to NULL_CODE.
     * Create new board filled with NULL_CODE.
     */
    clearBoard() {
        this.turn = 0;
        this.state = NULL_CODE;
        this.board = new Array();
        this.board.length = HEIGHT * WIDTH;
        this.board.fill(NULL_CODE);
    }

    /**
     * @returns date and time of this object's creation.
     */
    getCreationDate() { return new Date(this.gameID * 1000).toString(); }

    /**
     * Checks for draw game based on maximum number of moves.
     * @returns true if game is a draw, false otherwise.
     */
    isDraw() { if (this.turn == HEIGHT * WIDTH) { this.state = DRAW_CODE; return this.state; } }

    /**
     * Checks if a game has been won at the given position.
     * @param {int} i - array-based coordinate
     * @param {int} j - array-based coordinate
     * @returns NULL_CODE if no player wins; PLAYER_1_CODE if player 1 wins; PLAYER_2_CODE if player 2 wins; 
     */
    isConnected(i, j) {

        console.log("Current Piece: " + this.getPiece(i, j, 0, 0));
        var connected = 0;
        if (connected >= CONNECT_N) { return this.getCurPlayer(); } else { connected = 0; }

        // xHat = 0;
        // yHat = -1;
        // do { /* Drilling */ } while (this.getPiece(i, j, xHat, --yHat) == this.getCurPlayer());
        // while (this.getPiece(i, j, xHat, ++yHat) == this.getCurPlayer()) {
        //     console.log(this.getPiece(i, j, xHat, yHat) + " @(" + xHat + ", " + yHat + ")");
        //     if (this.getPiece(i, j, xHat, yHat) == this.getCurPlayer()) { connected++; }
        // }
        // if (connected >= CONNECT_N) { return this.getCurPlayer(); } else { connected = 0; }


        return NULL_CODE;
    }

    checkLine(i, j, xHat, yHat) {
        var connected = 0;
        while (this.getPiece(i, j, xHat, yHat) == this.getCurPlayer()) {
            // Drilling
            xHat++;
            yHat++;
            // console.log(this.getPiece(originX, originY, unitX, unitY) + " @(" + unitX + ", " + unitY + ")");
        }

        while (this.getPiece(i, j, xHat, yHat) == this.getCurPlayer()) {
            // Drilling
            connected++;
            xHat++;
            yHat++;
        }
        if (connected >= CONNECT_N) { return this.getPiece(originX, originY, unitX, unitY); } else { return 0; }
    }

    /**
     * 
     * 
     * @param {int} origin_i - array-based coordinate
     * @param {int} origin_j - array-based coordinate
     * @param {int} x - cartesian-based coordinate
     * @param {int} y - cartesian-based coordinate
     * @returns OUT_OF_BOUNDS_CODE if actualX, actualY is out of bounds
     */
    getPiece(origin_i, origin_j, x, y) {
        var actualX = origin_i + x;
        var actualY = origin_j - y;

        if (!(0 < actualX < WIDTH && 0 < actualY < HEIGHT)) { return OUT_OF_BOUNDS_CODE; } // Check Bounds

        return this.board[actualX + actualY * WIDTH];
    }

    /**
     * x, y expects array based coordinates
     * @param {int} i - array-based coordinate 
     * @param {int} j - array-based coordinate
     * @param {int} piece - Integer Piece to place
     * @returns OUT_OF_BOUNDS_CODE if x, y is out of bounds
     * 
     */
    setPiece(i, j, piece) {
        if (!(0 < i < WIDTH && 0 < j < HEIGHT)) { return OUT_OF_BOUNDS_CODE; } // Check Bounds
        this.board[i + j * WIDTH] = piece;
    }



    /**
     * If returns false check message and check if finished winner is not '0'.
     * Checks if input is OUT_OF_BOUNDS or INVALID.
     * Checks if draw or connect4 winning move.
     * @param {int} column 
     * @returns CODE
     */
    dropPiece(column) {
        // Check Initial
        if (0 >= column >= 7) { return OUT_OF_BOUNDS_CODE; }
        if (this.board[column + 0 * WIDTH] != NULL_CODE) { return FULL_COLUMN_CODE; }

        // Drill to lowest unfilled position and place piece
        var y = 0;
        for (; y < HEIGHT && this.board[column + (y + 1) * WIDTH] == NULL_CODE; y++) { /* Drilling...*/ }
        this.board[column + y * WIDTH] = this.getCurPlayer();

        this.turn++;
        if (this.isDraw() == DRAW_CODE) { return DRAW_CODE; }

        // Check if someone won; return NULL_CODE if no winner found.
        this.state = this.isConnected(column, y);
        return this.state;
    }

    /**
     * Get current player based on turns (even -> -1; odd -> 1)
     * @returns current player
     */
    getCurPlayer() { if (this.turn % 2 == 0) { return PLAYER_1_CODE; } else { return PLAYER_2_CODE; } }

    /**
     * 
     */
    debugFill() { for (var k = 0; k < this.board.length; k++) { this.board[k] = k; } this.turn = 42; }

    debugFillWith(CODE) {
        this.clearBoard();
        this.board.fill(CODE);
    }
    /**
     * 
     */
    debugRandomGame() {
        for (var k = 0; k < this.board.length * 2; k++) {
            this.dropPiece(Math.floor((Math.random() * 7) + 0));
        }
    }

    /**
     * Print out Board
     */
    printBoard() { console.log("\nGID  :\t" + this.gameID + "\n" + "State:\t" + this.state + "\n" + "Turn :\t" + this.turn + "\nCurr :\t" + this.getCurPlayer() + this.toString()); }

    /**
     * Prints out piece at certain position
     * @param {int} origin_i - array-based coordinate
     * @param {int} origin_j - array-based coordinate
     * @param {int} x - cartesian-based coordinate
     * @param {int} y - cartesian-based coordinate
     */
    printPiece(origin_i, origin_j, x, y) { console.log(this.getPiece(origin_i, origin_j, x, y)); }

    /**
     * @returns String of Game Board
     */
    toString() {
        var boardString = "";
        var pieceString = "";
        for (var j = 0; j < this.board.length; j++) {
            if (j % WIDTH == 0) { boardString += "\n"; }
            boardString += "[";

            pieceString = this.board[j].toString();
            if (pieceString.length < 2) { boardString += " "; }

            boardString += pieceString + " ]";
        }
        return boardString;
    }



    serialize() {
        var serializedState = JSON.stringify(this.board);
        const DELIMITER = "\t";
        serializedState += DELIMITER + this.turn;
        serializedState += DELIMITER + this.state;
        serializedState += DELIMITER + this.gameID;
        return serializedState;
    }

    restore(serializedState) {
        var states = serializedState.split('\t');
        this.board = JSON.parse(states[0]);
        this.turn = states[1];
        this.state = states[2];
        this.gameID = states[3];
    }
}

// Main
let g1 = new Game();
g1.debugFillWith(-1);

g1.setPiece(0, 0, 1);
g1.setPiece(1, 1, 1);
g1.setPiece(2, 2, 1);
g1.setPiece(3, 3, 1);
g1.setPiece(4, 4, 1);
g1.setPiece(5, 5, 1);

g1.turn++;


g1.printBoard();
g1.isConnected(4, 4);



// do { /* Drilling */ } while (this.getPiece(i, j, ++xHat, --yHat) == this.getCurPlayer());
        // while (this.getPiece(i, j, --xHat, ++yHat) == this.getCurPlayer()) {
        //     console.log(this.getPiece(i, j, xHat, yHat) + " @(" + xHat + ", " + yHat + ")");
        //     if (this.getPiece(i, j, xHat, yHat) == this.getCurPlayer()) { connected++; }
        // }
        // if (connected >= CONNECT_N) { return this.getCurPlayer(); } else { connected = 0; }

        // xHat = 0;
        // yHat = -1;
        // do { /* Drilling */ } while (this.getPiece(i, j, xHat, --yHat) == this.getCurPlayer());
        // while (this.getPiece(i, j, xHat, ++yHat) == this.getCurPlayer()) {
        //     console.log(this.getPiece(i, j, xHat, yHat) + " @(" + xHat + ", " + yHat + ")");
        //     if (this.getPiece(i, j, xHat, yHat) == this.getCurPlayer()) { connected++; }
        // }
        // if (connected >= CONNECT_N) { return this.getCurPlayer(); } else { connected = 0; }

        // xHat = 1;
        // yHat = 0;
        // do { /* Drilling */ } while (this.getPiece(i, j, ++xHat, yHat) == this.getCurPlayer());
        // while (this.getPiece(i, j, --xHat, yHat) == this.getCurPlayer()) {
        //     console.log(this.getPiece(i, j, xHat, yHat) + " @(" + xHat + ", " + yHat + ")");
        //     if (this.getPiece(i, j, xHat, yHat) == this.getCurPlayer()) { connected++; }
        // }
        // if (connected >= CONNECT_N) { return this.getCurPlayer(); } else { connected = 0; }