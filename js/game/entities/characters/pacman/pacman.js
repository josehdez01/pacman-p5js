define([
    "../character"
], function (
    { Character }
) {
    class Pacman extends Character{
        constructor(p5, settings, board) {
            super(
                {x: 0, y: 0},
                {width: board.cellSize - settings.padding, height: board.cellSize - settings.padding},
                settings.padding / 2,
                settings.speed,
                settings.startDir,
                board
            );

            this.timeToMove = 60;

            this.p5 = p5;
            this.color = settings.color;
        }

        resetPos() {
            const boardBBox = this.board.getBBox();
            this.position.x = boardBBox.x + this.offset;
            this.position.y = boardBBox.y + this.offset;
        }

        drawMouth() {
            const color = this.board.backgroundColor;
            let start = {x: 0, y: 0};
            let width = 0;
            let height = 0;
            let cycle = 0;

            if(this.direction === "up" || this.direction === "down"){
                cycle = Math.floor((this.position.y % this.board.cellSize) / (this.board.cellSize / 2));
            } else {
                cycle = Math.floor((this.position.x % this.board.cellSize) / (this.board.cellSize / 2));
            }

            if(cycle % 2 !== 0){
                if(this.direction === "up" || this.direction === "down"){
                    width = this.width / 3;
                    height = this.height / 2;
                    start.x = width;

                    if(this.direction === "up") {
                        start.y = 0;
                    } else {
                        start.y = height;
                    }
                } else {
                    width = this.width/ 2;
                    height = this.height / 3;
                    start.y = height;

                    if(this.direction === "left") {
                        start.x = 0;
                    } else {
                        start.x = width;
                    }
                }
                this.p5.noStroke();
                this.p5.fill(color);
                this.p5.rect(this.position.x + start.x, this.position.y + start.y, width, height);
            }
        }

        kill() {
            this.resetPos();
            this.board.decreasePacman();
            this.timeToMove = 60;
        }

        eat() {
            this.board.foods.forEach(food => {
                if(this.isColliding(food)) {
                    food.eat();
                }
            });
        }

        updatePos() {
            super.updatePos();
                this.eat();
        }

        draw() {
            this.p5.noStroke();
            this.p5.fill(this.color);
            this.p5.rect(this.position.x, this.position.y, this.width, this.height);
            this.drawMouth();
        }


    }

    return {
        Pacman
    }
});