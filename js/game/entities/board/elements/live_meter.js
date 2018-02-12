define([
    "./meter"
], function (
    {Meter}
){
    class LiveMeter extends Meter{
        constructor(pos, fontSize, font, p5) {
            super(pos, fontSize, font);
            this.update(3);

            this.p5 = p5;
        }

        updateLives(lives) {
            super.update(lives);
        }

        draw(points) {
            const p5 = this.p5;
            const lives = "".padStart(this.metered * 2, "C ");

            p5.textSize(this.fontSize);
            p5.fill("#FFEE00");
            p5.textFont(this.font);
            p5.text(lives, this.position.x, this.position.y);
        }
    }

    return {
        LiveMeter
    }

});
