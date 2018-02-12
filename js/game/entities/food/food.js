define([
    "../entity"
], function (
    {Entity}
){
    class Food extends Entity {
        constructor(centerPos, settings, p5){
            super({
                    x: centerPos.x - settings.size / 2,
                    y: centerPos.y - settings.size / 2
                },
                {
                    width: settings.size,
                    height: settings.size
                });
            this.color = settings.color;
            this.stroke = settings.stroke;
            this.eated = false;
            this.p5 = p5;
        };

        eat() {
            this.eated = true;
        };

        draw() {
            const p5 = this.p5;
            p5.ellipseMode(p5.CORNER);
            p5.stroke(this.stroke.color);
            p5.strokeWeight(this.stroke.width);
            p5.fill(this.color);
            p5.ellipse(this.position.x, this.position.y, this.width);
        };
    }

    return {
        Food
    }
});
