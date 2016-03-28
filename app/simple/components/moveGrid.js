Crafty.c("MoveGrid", {
    _keys: {
        UP_ARROW: [0, -1],
        DOWN_ARROW: [0, 1],
        RIGHT_ARROW: [1, 0],
        LEFT_ARROW: [-1, 0],
        W: [0, -1],
        S: [0, 1],
        D: [1, 0],
        A: [-1, 0],
    },

    init: function() {
        this._moveX = 0;
        this._moveY = 0;

        for (var k in this._keys) {
            var keyCode = Crafty.keys[k] || k;
            this._keys[keyCode] = this._keys[k];
        }

        this.bind("KeyDown", function(e) {
            if (this._keys[e.key]) {
                this._moveX = this._keys[e.key][0];
                this._moveY = this._keys[e.key][1];
            }
        }).bind("EnterFrame", function() {
            if (this._moveX || this._moveY) {
                this.x += this._moveX * 32;
                this.y += this._moveY * 32;
                this.trigger('Moved', { x: this.x, y: this.y });
                this._moveX = 0;
                this._moveY = 0;
            }
        });
    }

});