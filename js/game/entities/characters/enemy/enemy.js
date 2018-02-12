define([
    "../character"
], function (
    {Character}
){
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max + 1 - min)) + min;
    }

    const directions = [
        "left",
        "right",
        "up",
        "down"
    ];

    function getRandomDir() {
        return directions[getRandomInt(0, 3)];
    }

    let numberOfBill = 0;

    class Bill extends Character{
        constructor(p5, settings, board, pacman) {
            super(
                {x: 0, y: 0},
                {width: board.cellSize - settings.padding, height: board.cellSize - settings.padding},
                settings.padding / 2,
                settings.speed,
                "left",
                board
            );
            this.resetPos();
            this.turn(getRandomDir());
            this.p5 = p5;
            this.pacman = pacman;
            this.color = settings.colors[numberOfBill++ % settings.colors.length];
        }

        resetPos() {
            const middleCell = {
                x: this.board.cells.x * this.board.cellSize * 0.5,
                y: this.board.cells.y * this.board.cellSize * 0.5,
            };
            const boardBBox = this.board.getBBox();
            this.position.x = boardBBox.x + this.offset + middleCell.x - this.board.cellSize;
            this.position.y = boardBBox.y + this.offset + middleCell.y - this.board.cellSize;
        }

        murder() {
            if(this.isColliding(this.pacman)) {
                this.pacman.kill();
            }
        }

        updatePos() {
            const prevCell = this.cell;
            super.updatePos();
            if(this.cell !== prevCell) {
                const turnP = getRandomInt(0, 1000);
                if (turnP < 250) {
                    this.turn(getRandomDir());
                }
            }
            this.murder();
        }

        draw() {
            this.p5.noStroke();
            this.p5.fill(this.color);
            const upper = {
                x: this.position.x + (this.width / 2),
                y: this.position.y
            };
            const downY = this.position.y + this.height;
            const leftX = this.position.x;
            const rightX = this.position.x + this.width;
            this.p5.triangle(upper.x, upper.y, leftX, downY, rightX, downY);
        }


    }

    return {
        Bill
    }
});
