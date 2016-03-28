Crafty.init(500, 850, document.getElementById('game'));

Crafty.c("PlayerControls", {
    _keys: { 
    UP_ARROW: [0,-1],
    DOWN_ARROW: [0,1],
    RIGHT_ARROW: [1,0],
    LEFT_ARROW: [-1,0],
    W: [0,-1],
    S: [0,1],
    D: [1,0],
    A: [-1,0],
    }, 

    init: function() {
      this._moveX = 0;
      this._moveY = 0;

      for(var k in this._keys) {
        var keyCode = Crafty.keys[k] || k;
        this._keys[keyCode] = this._keys[k];
      }

      this.bind("KeyDown",function(e) {
        if(this._keys[e.key]) {
          this._moveX = this._keys[e.key][0];
          this._moveY = this._keys[e.key][1];
        }
      }).bind("EnterFrame",function() {
        if(this._moveX || this._moveY) {
           this.x += this._moveX * 32;
           this.y += this._moveY * 32;
           this.trigger('Moved', {x: this.x, y: this.y});
           this._moveX = 0;
           this._moveY = 0;
        }
      });
    }
    
  });

// This will create entities called floor, wall1 and stairs
  Crafty.sprite(32,"img/dungeon.png", {
     floor: [0,0],
     wall1: [2,1],
     stairs: [3,1]
  });

  // This will create entities called hero1 and blob1
  Crafty.sprite(32,"img/characters.png", {
     hero1: [5,3],
     blob1: [4,7]
  });

Crafty.scene("loading", function() {
  Crafty.load(["img/dungeon.png","img/characters.png"], function() {
         Crafty.scene("main"); // Run the main scene
    });
});

Crafty.scene("main", function() {
  

    Crafty.background("#fff");
  var player = Crafty.e("2D, Canvas, hero1,PlayerControls")
         .attr({x:0, y:100});

    var blob = Crafty.e("2D, Canvas, blob1")
         .attr({x:50, y:150});
         
});

Crafty.scene("loading");   