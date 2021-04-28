// TODO - FIX Doc Strings
// Settings
// const CONFIG.HEIGHT = 6;
// const CONFIG.WIDTH = 7;
const DELIMITER = "|";

var CONFIG = {
    CONNECT_N: 4,
    HEIGHT: 6,
    WIDTH: 7
};

const CODE = {
    PLAYER_1: -1,
    PLAYER_2: 1,
    NULL: 0,
    DRAW: 42,
    FULL_COLUMN: 7,
    OUT_OF_BOUNDS: 8
};

/**
 * 
 */
class Game {

    constructor() {
        this.gameID = new Date().valueOf() / 1000; // Epoch Time
        this.clearBoard();
    }

    /**
     * Sets turns to 0 and state to CODE.NULL.
     * Create new board filled with CODE.NULL.
     */
    clearBoard() {
        this.turn = 0;
        this.state = CODE.NULL;
        this.board = new Array();
        this.board.length = CONFIG.HEIGHT * CONFIG.WIDTH;
        this.board.fill(CODE.NULL);
    }

    /**
     * @returns date and time of this object's creation.
     */
    getCreationDate() { return new Date(this.gameID * 1000).toString(); }

    /**
     * Checks for draw game based on maximum number of moves.
     * @returns true if game is a draw, false otherwise.
     */
    isDraw() {
        if (this.turn == CONFIG.HEIGHT * CONFIG.WIDTH) {
            this.state = CODE.DRAW;
        } else {
            this.state = CODE.NULL;
        }
        return this.state;
    }

    /**
     * Checks if a game has been won at the given position.
     * @param {int} i - array-based coordinate
     * @param {int} j - array-based coordinate
     * @returns CODE.NULL if no player wins; PLAYER_1_CODE if player 1 wins; PLAYER_2_CODE if player 2 wins; 
     */
    isConnected(i, j) {
        // console.log("Checking: (" + i + ", " + j + ")")

        var s1 = this.isLineConnected(i, j, 1, 0);
        if (s1 != 0) {
            return this.getCurPlayer();
        }

        var s2 = this.isLineConnected(i, j, 0, 1);
        if (s2 != 0) {
            return this.getCurPlayer();
        }

        var s3 = this.isLineConnected(i, j, 1, 1);
        if (s3 != 0) {
            return this.getCurPlayer();
        }

        var s4 = this.isLineConnected(i, j, -1, 1);
        if (s4 != 0) {
            
            return this.getCurPlayer();
        }

        return CODE.NULL;
    }

    /**
     * 
     * @param {int} i - array-based coordinate
     * @param {int} j - array-based coordinate
     * @param {int} x x hat
     * @param {int} y y hat
     * @returns
     */
    isLineConnected(i, j, x, y) {

        var connected = 0;
        var a = x;
        var b = y;

        while (this.getPiece(i, j, x, y) == this.getCurPlayer()) { x += a; y += b; }
        x -= a;
        y -= b;
        while (this.getPiece(i, j, x, y) == this.getCurPlayer()) {
            if (this.getPiece(i, j, x, y) == this.getCurPlayer()) { connected++; }
            x -= a;
            y -= b;
        }

        // Check for winner
        if (connected >= CONFIG.CONNECT_N) {
            console.log("winner at " + "i:" + i + " j:" + j + " x: " + x + " y: " + y);
            this.state = this.getCurPlayer();
            return this.state;
        } else {
            return CODE.NULL;
        }

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
        if (!(0 < actualX < CONFIG.WIDTH && 0 < actualY < CONFIG.HEIGHT)) { return CODE.OUT_OF_BOUNDS; } // Check Bounds
        return this.board[actualX + actualY * CONFIG.WIDTH];
    }

    /**
     * x, y expects array based coordinates
     * @param {int} i - array-based coordinate 
     * @param {int} j - array-based coordinate
     * @param {int} piece - Integer Piece to place
     * @returns OUT_OF_BOUNDS_CODE if x, y is out of bounds
     * 
     */
    setPiece(origin_i, origin_j, x, y, piece) {
        var actualX = origin_i + x;
        var actualY = origin_j - y;
        if (!(0 < actualX < CONFIG.WIDTH && 0 < actualY < CONFIG.HEIGHT)) { return CODE.OUT_OF_BOUNDS; } // Check Bounds
        this.board[actualX + actualY * CONFIG.WIDTH] = piece;
    }



    /**
     * If returns false check message and check if finished winner is not '0'.
     * Checks if input is CODE.OUT_OF_BOUNDS or INVALID.
     * Checks if draw or connect4 winning move.
     * @param {int} column 
     * @returns CODE
     */
    dropPiece(column) {
        // Check Initial
        if (0 >= column >= 7) { return CODE.OUT_OF_BOUNDS; }
        if (this.board[column + 0 * CONFIG.WIDTH] != CODE.NULL) { return CODE.FULL_COLUMN; }

        // Drill to lowest unfilled position and place piece
        var y = 0;
        for (; y < CONFIG.HEIGHT && this.board[column + (y + 1) * CONFIG.WIDTH] == CODE.NULL; y++) { /* Drilling...*/ }
        this.board[column + y * CONFIG.WIDTH] = this.getCurPlayer();

        this.turn++;
        if (this.isDraw() == CODE.DRAW) { return CODE.DRAW; }

        // Check if someone won; return CODE.NULL if no winner found.
        this.state = this.isConnected(column, y + 1);
        return this.state;
    }

    /**
     * Get current player based on turns (even -> -1; odd -> 1)
     * @returns current player
     */
    getCurPlayer() { if (this.turn % 2 == 0) { return CODE.PLAYER_1; } else { return CODE.PLAYER_2; } }

    /**
     * 
     */
    debugFill() { for (var k = 0; k < this.board.length; k++) { this.board[k] = k; } this.turn = 42; }

    /**
     * 
     * @param {int} CODE 
     */
    debugFillW(piece) {
        this.clearBoard();
        this.board.fill(piece);
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
        var curPiece;
        for (var index = 0; index < this.board.length; index++) {
            curPiece = this.board[index];
            if (index % CONFIG.WIDTH == 0) { boardString += "\n"; }
            boardString += "[";

            if (curPiece == CODE.NULL) {
                pieceString = " ";
            } else {
                pieceString = this.board[index].toString();
            }

            if (pieceString.length < 2) { boardString += " "; }

            boardString += pieceString + " ]";
        }
        return boardString;
    }

    serialize() {
        var serializedState = JSON.stringify(this.board);
        serializedState += DELIMITER + this.turn;
        serializedState += DELIMITER + this.state;
        serializedState += DELIMITER + this.gameID;
        return serializedState;
    }

    restore(serializedState) {
        var states = serializedState.split(DELIMITER);
        this.board = JSON.parse(states[0]);
        this.turn = states[1];
        this.state = states[2];
        this.gameID = states[3];
    }
}

module.exports = { Game, CODE, CONFIG };