
var app = app || {};


(function(){
    "use strict";

    function init() {
        var self = {
            evaluate: function(player){
                return player.canStart;
            }
        };
        
        return self;
    }
    function Player(position){
        var self ={
            position: position,
            canStart: false,
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
            height: height,
            snakes: [],
            addSnake: function(start, end){
                self.snakes.push({start: start,end: end});
            },
            ladders: [],
            addLadder: function(start, end){
                self.ladders.push({start: start,end: end});
            }
        };

        return self;
    }

    app.Player = Player;
    app.Board = Board;
    app.init = init; 
})();