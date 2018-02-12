define([
    "./meter"
], function (
    {Meter}
){
    class ScoreMeter extends Meter{
        constructor(pos, fontSize, font, p5) {
            super(pos, fontSize, font);
            this.update(0);

            this.p5 = p5;
        }

        updateScore(points) {
            super.update(points);
        }

        draw() {
            const p5 = this.p5;
            const pointString = this.metered.toString().padStart(8, "0");

            p5.textSize(this.fontSize);
            p5.fill("#ffffff");
            p5.textFont(this.font);
            p5.text(pointString, this.position.x, this.position.y);
        }
    }

    return {
        ScoreMeter
    }
    
});
