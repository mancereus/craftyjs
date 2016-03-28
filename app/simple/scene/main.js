
Crafty.scene("main", function() {


    Crafty.background("#fff");
    var player = Crafty.e("2D, Canvas, hero1,MoveGrid")
        .attr({ x: 0, y: 100 });

    var blob = Crafty.e("2D, Canvas, blob1")
        .attr({ x: 50, y: 150 });

});