
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
                
                if (player.position === board.lastField){
                    self.winner = player;
                    self.finished = true;
                }
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
            lastField: width*height,
            snakes: [],
            addSnake: function(start, end){
                addSpecial(start, end, 'snakes');
            },
            ladders: [],
            addLadder: function(start, end){
                addSpecial(start, end, 'ladders');
            },
            getSnakeEndFrom: function(position){
                return getSpecialPositionFrom(position, self.snakes);
            },
            getLadderEndFrom: function(position){
                return getSpecialPositionFrom(position, self.ladders);
            }
        };
        function addSpecial(start, end, type){
            var validPositions = true;
                self.snakes.forEach(function(snake){
                    if ((snake.start === start) ||
                        (snake.start === end) ||
                        (snake.end === start) ||
                        (snake.end === end)){

                        validPositions = false;
                    }
                });
                self.ladders.forEach(function(ladder){
                    if ((ladder.start === start) ||
                        (ladder.start === end) ||
                        (ladder.end === start) ||
                        (ladder.end === end)){

                        validPositions = false;
                    }
                });
                if (validPositions){
                    self[type].push({start: start,end: end});
                }
        }
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