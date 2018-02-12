define([
    
], function (

){
    class Meter {
        constructor(pos, fontSize, font) {
            this.position = pos;
            this.font = font;

            this.metered = 0;

            this.fontSize = fontSize;
        }

        update(amount) {
            this.metered = amount;
        }
    }

    return {
        Meter
    }
    
});
