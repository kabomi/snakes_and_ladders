
var app = app || {};


(function(){
    "use strict";

    function init(board) {
        var self = {
            board: board,
            evaluate: function(player){
                if (player.cantStart){
                    if (player.nextMove !== app.START_MOVE){
                        return false;  
                    }
                    player.cantStart = false;
                    return true;
                }
                player.position += player.nextMove;

                player.position = board.getSnakeEndFrom(player.position);
                
                player.position = board.getLadderEndFrom(player.position);
                

                return true;
            }
        };
        
        return self;
    }
    function Player(position){
        var self ={
            position: position,
            cantStart: true,
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
            },
            getSnakeEndFrom: function(position){
                return getSpecialPositionFrom(position, self.snakes);
            },
            getLadderEndFrom: function(position){
                return getSpecialPositionFrom(position, self.ladders);
            }
        };
        function getSpecialPositionFrom(position, collection){
            var result = position;
            collection.forEach(function(special){
                if (special.start === position){
                    position = special.end;
                }
            });
            return position;
        }

        return self;
    }

    app.Player = Player;
    app.Board = Board;
    app.init = init;

    app.START_MOVE = 3;
})();