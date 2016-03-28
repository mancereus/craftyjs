Crafty.init(500, 850, document.getElementById('game'));

// This will create entities called floor, wall1 and stairs
Crafty.sprite(32, "img/dungeon.png", {
    floor: [0, 0],
    wall1: [2, 1],
    stairs: [3, 1]
});

// This will create entities called hero1 and blob1
Crafty.sprite(32, "img/characters.png", {
    hero1: [5, 3],
    blob1: [4, 7]
});




Crafty.scene("loading");   