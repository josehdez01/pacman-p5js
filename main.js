require.config({
    paths : {
        json: 'js/require/json',
        text: 'js/require/text'
    }
});


define([
    "js/p5/p5.min",
    "js/game/main"
],
function(
    p5,
    game
) {
    const gameInstance = new p5(game.sketch, "canvas");
});