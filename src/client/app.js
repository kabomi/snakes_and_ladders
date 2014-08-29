
var app = app || {};


(function(){
    "use strict";

    function init() {
        var self = {
        };
        
        return self;
    }
    function Player(position){
        var self ={
            position: position,
            moveForward: function(numPositions){
                self.position = self.position + numPositions;
            },
            moveBackward: function(numPositions){
                self.position = self.position - numPositions;
                if (self.position < 0) self.position = 0;
            }
        };

        return self;
    }

    function Board(width, height){
        var self = {
            width: width,
            height: height
        };

        return self;
    }

    app.Player = Player;
    app.Board = Board;
    app.init = init; 
})();