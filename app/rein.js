
var screenWidth = 800;
var screenHeight = 400;
var hitCounter = 0;
var player1;
var points;
var levelWidth = 2000;
var level = 1;

Crafty.init(screenWidth, screenHeight, document.getElementById('game'));

Crafty.defineScene("HomeScreen", function() {
    Crafty.background("#000");
    Crafty.e("2D, DOM, Text, Mouse")
        .attr({ w: 300, h: 20, x: 100, y: 200 })
        .text("Click to start")
        .css({ "text-align": "center" })
        .textFont({ size: '20px', weight: 'bold' })
        .textColor("#FFFFFF")
        .bind('Click', function(MouseEvent) {
            Crafty.enterScene("Level1");
        });

    Crafty.e("2D, DOM, Text")
        .attr({ w: 400, h: 40, x: 50, y: 50 })
        .text("Rein")
        .textFont({ size: '130px', weight: 'bold' })
        .css({ "text-align": "center" })
        .textColor("#FFFFFF");
});



Crafty.defineScene("Level1", function() {
    Crafty.background("black");
    Crafty.e('Floor, 2D, Canvas, Solid, Color, Collision')
        .attr({ x: 0, y: 380, w: levelWidth, h: 10 })
        .color('white');
    Crafty.e('Floor, 2D, Canvas, Solid, Color, Collision')
        .attr({ x: 1, y: 1, w: 1, h: 1000 })
        .color('white');

    Crafty.e('Ziel, 2D, Canvas, Solid, Color, Collision')
        .attr({ x: levelWidth, y: 280, w: 100, h: 50 })
        .color('blue')
        .checkHits('Player')
        .bind("HitOn", function() {
            Crafty.enterScene("Level1");
            Crafty.viewport.x = 0;
            setHitCounter(0);

        });

    player1 = Crafty.e('Player, 2D, Canvas, Color, Solid, Twoway, Gravity, Collision')
        .attr({ x: 20, y: 0, w: 30, h: 30 })
        .color('white')
        .twoway(4)
        .gravity('Floor')
        .gravityConst(.2)
        .checkHits('Floor')
        .bind("Moved", function() {
            if (this.x >= (screenWidth / 2)) {
                Crafty.viewport.x = (this.x - (screenWidth / 2)) * -1;
            }

        });
    Crafty.e("2D, DOM, Text")
        .attr({ x: 100, y: 10 })
        .text("level " + level)
        .textFont({ size: '63px', weight: 'bold' })
        .css({ "text-align": "center" })
        .textColor("#FFFFFF");
    points = Crafty.e("2D, DOM, Text")
        .attr({ x: screenWidth - 100, y: 10 })
        .text("" + hitCounter)
        .textFont({ size: '130px', weight: 'bold' })
        .css({ "text-align": "center" })
        .textColor("#FFFFFF");
});

Crafty.enterScene("Level1");

function setHitCounter(count) {
    hitCounter = count;
    points.text(hitCounter);
    points.x = screenWidth - 100 - Crafty.viewport.x
    if (hitCounter >= 5) {
        player1.x = 0;
        setHitCounter(0);
        Crafty.viewport.x = 0;

    }
}
function drop() {

    var randomx = Math.floor((Math.random() * screenWidth) + 50 - Crafty.viewport.x);
    if (randomx > levelWidth - 100)
        return;
    Crafty.e('Drop, 2D, Canvas, Color, Solid, Gravity, Collision')
        .attr({ x: randomx, y: 0, w: 10, h: 15 })
        .color('#FFFFFF')
        .gravity()
        .gravityConst(.5)
        .checkHits('Player')
        .bind("HitOn", function() {
            this.destroy();
            setHitCounter(hitCounter + 1);


        })
        .bind("EnterFrame", function() {
            if (this.y > screenHeight)
                this.destroy();
        });
}

Crafty.bind("EnterFrame", function() {
    if (Crafty.frame() % 6 == 0)
        drop();
});