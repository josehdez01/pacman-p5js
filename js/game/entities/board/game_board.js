define([
    "../entity",
    "../../entities/food/food",
    "./score_board"
], function (
    {Entity},
    {Food},
    {ScoreBoard}
) {
    class GameBoard extends Entity {
        constructor(settings, p5){
            const size = {
                width: settings.cellSize * settings.cells.x,
                height: settings.cellSize * settings.cells.y,
            };
            super(settings.pos, size);
            this.foods = [];
            this.cellSize = settings.cellSize;
            this.cells = settings.cells;
            this.p5 = p5;
            this.backgroundColor = settings.bgColor;
        };

        set fonts(fonts) {
            this.scoreBoard = new ScoreBoard(
                {x: this.width, y: this.position.y},
                {width: this.width, height: this.height},
                this.p5,
                this.cells,
                fonts); //position, dimensions, p5, fonts
        }

        set lives(lives) {
            this.scoreBoard.lives = Math.max(lives, 0);
        }

        get lives() {
            return this.scoreBoard.lives;
        }

        get points() {
            return this.scoreBoard.score;
        }

        set points(points) {
            this.scoreBoard.score = points;
        }

        get level() {
            return this.scoreBoard.level;
        }

        fill(foodSettings) {
            for (let i = 0; i < this.cells.x; i +=1) {
                for (let j = 0; j < this.cells.y; j +=1) {
                    this.foods.push(
                        new Food({
                            x: (this.cellSize * i) + (this.cellSize / 2),
                            y: (this.cellSize * j) + (this.cellSize / 2)
                        }, foodSettings, this.p5)
                    );
                }
            }
        };

        decreasePacman() {
            this.lives = this.lives - 1;
        }

        update() {
            const newFood = this.foods.filter((food) => food.eated === false);
            this.points += (this.foods.length - newFood.length) * 10;
            this.foods = newFood;
        };

        drawGrid() {
            const p5 = this.p5;
            p5.stroke("#2020cc");
            p5.strokeWeight(1);
            for (let i = 1; i <= this.cells.x; i +=1) {
                p5.line(this.cellSize * i, 0, this.cellSize * i, this.cells.y * this.cellSize);
            }
            for (let i = 1; i <= this.cells.y; i +=1) {
                p5.line(0, this.cellSize * i, this.cells.x * this.cellSize, this.cellSize * i);
            }
        }

        drawBackground() {
            const p5 = this.p5;
            p5.fill(this.backgroundColor);
            p5.rect(this.position.x, this.position.y, this.width, this.height);
        }

        draw() {
            const p5 = this.p5;
            this.scoreBoard.draw();
            this.drawBackground();
            this.drawGrid();

            this.foods.forEach((food) => {
                food.draw();
            });
        };
    }

    return {
        GameBoard
    }
});