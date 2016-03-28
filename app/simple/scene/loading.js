Crafty.scene("loading", function() {
    var assets = {
        "images": ["img/dungeon.png", "img/characters.png"]
    }
    Crafty.load(assets, function() {
        Crafty.scene("main"); // Run the main scene
    });
});