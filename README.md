# connect4_gameLogic_js

## Table of Contents

- [connect4_gameLogic_js](#connect4_gamelogic_js)
  - [Table of Contents](#table-of-contents)
  - [Description:](#description)
  - [Public Methods](#public-methods)
  - [State Codes](#state-codes)
  - [Default Settings](#default-settings)
  - [TODO](#todo)

## Description:

This is a **gameLogic** module for a javaScript application.  The suggested use case is to create a `Game` object and allow players to `dropPiece(column: int)` into columns.  Columns received by `dropPiece(column: int)` is checked for validity (in bounds and non-full column).  

Each time a piece is dropped, the turn count is increased.  The current player is dictated by the `turn`.  If turn is even it is player1's turn.  Similarly, if turn is odd it is player2's turn.  

Each drop the game is checked for a draw (turn count is at the maximum).  A game is checked for a winner upon is drop as well.  Codes are returned from the `dropPiece(column: int)` method to notify other modules of the state of the object or last event.

The board can be serialized using the `serialize()` method and restored using the `restore(serializedState: string)` method.  Additionally, the serialized state can be used to relay information to other modules, potentially producing a nicer user interface.

---
## Public Methods
The only public methods needed:
| Methods                            | Description                                                                                               |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `new Game()` (Constructor)         | Creates new board, sets turn to `0`, sets state to `0`, and sets Game ID based on Epoch time of creation. |
| `dropPiece(column: integer)`       | Drop puck in column. Returns a state *CODE.*                                                              |
| `serialize()`                      | Convert full game object's state to serialized string.                                                    |
| `restore(serializedState: string)` | Given `serializedState` string the game is fully restored.                                                |
| `getCreationDate()`                | Returns Date and Time of object's creation.                                                               |

---
## State Codes

*Return CODES for `dropPiece` are as follows:*
| Constant             | Code | Meaning                                                                                                                 |
| -------------------- | ---- | ----------------------------------------------------------------------------------------------------------------------- |
| `PLAYER_1_CODE`      | `-1` | Player 1 is stored in the array with this code. Returned if **Player 1 wins** the game.                                 |
| `PLAYER_2_CODE`      | `1`  | Player 2 is stored in the array with this code. Returned if **Player 2 wins** the game.                                 |
| `NULL_CODE`          | `0`  | Free space is stored in the array with this code. Returned if no winner is found. Hence, this is the **Default** state. |
| `DRAW_CODE`          | `42` | Returned if game ends in a **Draw.**                                                                                    |
| `FULL_COLUMN_CODE`   | `7`  | Returned if player attempts to place a puck in a **Full Column.**                                                       |
| `OUT_OF_BOUNDS_CODE` | `8`  | Returned if player attempts to place a puck in an **Out of Bounds Column.**                                             |

---

## Default Settings

- Default Board Size is '7 X 6'.
- Meaning the maximum amount of turns is '42'.
- Connect '4' is the standard connection requirement.

## TODO

- Fix Doc Strings.
- Perform more rigorous testing.