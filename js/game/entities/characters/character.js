define([
    "../entity"
],function (
    { Entity }
) {
    function isTurnBackwards(turn, direction) { //Turn 180 degrees
        return ((turn === "left" || turn === "right") && (direction === "left" || direction === "right"))
            || ((turn === "up" || turn === "down") && (direction === "up" || direction === "down"));
    }

    function isTurnHV(turn, direction) { //Turn happening from horizontal path to a vertical one
        return ((turn === "left" || turn === "right") && (direction === "up" || direction === "down"));
    }

    function canTurn(pos, turn, cellSize, speed) {
        return (pos[(turn === "left" || turn === "right" ? "y" : "x" )] % cellSize) < speed + 1
    }

    class Character extends Entity {
        constructor(position, size, offset, speed, direction, board) {
            super(position, size);
            this.offset = offset;
            this.speed = speed;
            this.direction = direction;
            this.pendingTurns = [];

            this.board = board;

            this.velocity = {
                "up": {x: 0, y: -this.speed},
                "down": {x: 0, y: this.speed},
                "left": {x: -this.speed, y: 0},
                "right": {x: this.speed, y: 0}
            };
            this.cell = {x: 0, y: 0};
        }

        advance() {
            this.position.x += this.velocity[this.direction].x;
            this.position.y += this.velocity[this.direction].y;
        }

        stayInBoard() {
            const boardBBox = this.board.getBBox();
            this.position.x = this.position.x + this.width > boardBBox.x + boardBBox.width
                ? boardBBox.x
                : this.position.x < boardBBox.x
                    ? boardBBox.x + boardBBox.width - this.width
                    : this.position.x;
            this.position.y = this.position.y + this.height > boardBBox.y + boardBBox.height
                ? boardBBox.y
                : this.position.y < boardBBox.y
                    ? boardBBox.y + boardBBox.height - this.height
                    : this.position.y;
        }

        doTurn() {
            const turnPending = this.pendingTurns[0];
            if (isTurnBackwards(turnPending, this.direction)) {
                this.direction = turnPending;
                this.pendingTurns.shift();
            } else if (canTurn(this.position, turnPending, this.board.cellSize, this.speed)) {
                if (isTurnHV(turnPending, this.direction)) {
                    this.position.x = this.cell.x + this.offset;
                } else {
                    this.position.y = this.cell.y + this.offset;
                }
                this.direction = turnPending;
                this.pendingTurns.shift();
            }
        }

        updateCell() {
            const cellSize =  this.board.cellSize;
            const centerX = this.position.x + this.width;
            const centerY = this.position.y + this.height;
            const x = Math.floor(centerX / cellSize) * cellSize;
            const y = Math.floor(centerY / cellSize) * cellSize;

            if(x !== this.cell.x || y !== this.cell.y) {
                this.cell = {x, y};
            }
        }
        updatePos() {
            this.advance();
            this.stayInBoard();
            this.updateCell();
            if (this.pendingTurns.length > 0){
                this.doTurn();
            }
        }

        turn(dir) {
            if(dir !== this.direction){
                this.pendingTurns.push(dir);
            }
        }
    }




    return {
        Character
    };
});