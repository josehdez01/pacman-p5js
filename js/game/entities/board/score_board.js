define([
    "../entity",
    "./elements/score_meter",
    "./elements/live_meter"
], function (
    {Entity},
    {ScoreMeter},
    {LiveMeter},
){

    class ScoreBoard extends Entity{
        constructor(position, dimensions, p5, cells, fonts) {
            super(position, dimensions);

            this.p5 = p5;
            this.fonts = fonts;
            this.cells = cells;
            this.title = "Pac-Man";
            this.livemeter = new LiveMeter({
                    x: this.position.x + this.width - 150,
                    y: this.position.y + 35,
                }, 50, fonts.pacman, p5); //pos, fontSize, font, p5
            this.scoremeter = new ScoreMeter({
                x: this.position.x + 15,
                y: this.position.y + 35,
            }, 50, fonts.pacman, p5); //pos, fontSize, font, p5
        };

        get level() {
            return Math.floor(this.score / (10 * this.cells.x * this.cells.y));
        }

        get lives() {
            return this.livemeter.metered;
        };

        set lives(lives) {
            this.livemeter.updateLives(lives);
        };

        get score() {
            return this.scoremeter.metered;
        };

        set score(points) {
            this.scoremeter.updateScore(points);
        };

        drawLevel(){
            const p5 = this.p5;

            p5.textSize(25);
            p5.fill("#ffffff");
            p5.textFont(this.fonts.score);
            p5.text(`lvl-${this.level}`, this.position.x + 25, this.position.y + 15, this.width, this.height / 2);
        }

        drawTitle(){
            const p5 = this.p5;

            p5.textSize(85);
            p5.fill("#FFEE00");
            p5.textFont(this.fonts.titles);
            p5.text("PAC MAN", this.position.x + 150, this.position.y + 100, this.width, this.height / 2);
        }

        drawGameOver(){
            const p5 = this.p5;

            p5.textSize(95);
            p5.fill("#ff0a00");
            p5.textFont(this.fonts.titles);
            p5.text("GAME OVER", this.position.x + 100, this.position.y + 400, this.width, this.height / 2);
        }

        draw() {
            const p5 = this.p5;

            p5.noStroke();
            p5.fill("#000000");
            p5.rect(this.position.x, this.position.y, this.width, this.height);
            this.drawLevel();
            this.drawTitle();
            if(this.lives === 0) {
                this.drawGameOver();
            }
            this.livemeter.draw();
            this.scoremeter.draw();
        };
    }




    return {
        ScoreBoard
    }
});
