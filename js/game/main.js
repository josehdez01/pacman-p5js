define([
    "json!./settings.json",
    "./entities/characters/pacman/pacman",
    "./entities/characters/enemy/enemy",
    "./entities/board/game_board"
],
function(
    settings,
    { Pacman },
    { Bill },
    { GameBoard }
) {
    const sketch = function(p5) {
        const fonts = {};
        const myBoard = new GameBoard(settings.board, p5, fonts);
        const pacman = new Pacman(p5, settings.pacman, myBoard);
        let enemies = [];


        function setEnemys() {
            enemies = [];
            for(let i = 0; i < myBoard.level + 3; i++) {
                enemies.push(new Bill(p5, settings.bill, myBoard, pacman)); //p5, settings, board, pacman
            }
        }

        function resetEnemyPos() {
            enemies.forEach((enemy) => {
                enemy.resetPos();
            });
        }

        function levelUp() {
            fillBoard();
            pacman.timeToMove = 60;
            pacman.resetPos();
            enemies.push(new Bill(p5, settings.bill, myBoard, pacman));
            enemies.forEach((enemy) => {
                enemy.resetPos();
                enemy.speed += 2;
            });
        }

        function fillBoard() {
            myBoard.fill(settings.food);
        }

        function initializeGameBoard() {
            fillBoard();
            setEnemys();
        }

        function updateElements() {
            if(pacman.timeToMove > 1){
                pacman.timeToMove--;
            } else if(pacman.timeToMove === 1) {
                pacman.timeToMove--;
                resetEnemyPos();
            } else if(myBoard.lives > 0) {
                pacman.updatePos();
                enemies.forEach((enemy) => {
                    enemy.updatePos();
                });
            }
            myBoard.update();
        }

        function drawFrame() {
            p5.background(255,255,255);
            myBoard.draw();
            pacman.draw();
            enemies.forEach((enemy) => {
                enemy.draw();
            });
        }

        p5.preload = function () {
            const fonts = {};
            fonts.score = p5.loadFont("./fonts/Pixeled.ttf");
            fonts.titles = p5.loadFont("./fonts/titles.ttf");
            fonts.pacman = p5.loadFont("./fonts/crackman_front.ttf");
            myBoard.fonts = fonts;
        };

        p5.setup = function() {
            const canvas = p5.createCanvas(settings.canvas.width, settings.canvas.height);
            initializeGameBoard();
        };

        p5.draw = function() {
            const prevLevel = myBoard.level;
            updateElements();
            if(myBoard.level !== prevLevel){
                levelUp();
            }
            drawFrame();
        };

        p5.keyPressed = function() {
            if(p5.keyCode === p5.UP_ARROW){
                pacman.turn("up");
            } else if(p5.keyCode === p5.DOWN_ARROW){
                pacman.turn("down");
            } else if(p5.keyCode === p5.LEFT_ARROW){
                pacman.turn("left");
            } else if(p5.keyCode === p5.RIGHT_ARROW){
                pacman.turn("right");
            }
            return false;
        };
    };

    return {
        sketch
    };
});
