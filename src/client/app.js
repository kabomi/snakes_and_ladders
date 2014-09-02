
var app = app || {};


(function(){
    "use strict";

    function init(board) {
        var self = {
            board: board,
            evaluate: function(player){
                if (self.finished &&
                    self.winner){
                    return false;
                }

                player.roll();

                if (player.cantStart){
                    player.position = app.START_POSITION;
                    if (player.nextMove !== app.START_MOVE){
                        return false;  
                    }
                    player.cantStart = false;
                    return true;
                }

                if (player.tooManyMaxMoves){
                    player.position = app.START_POSITION;
                    if (player.nextMove === app.PLAYER_MOVE_MAX){
                        player.tooManyMaxMoves = false;
                    }
                    return true;
                }

                movePlayer(player);

                var countMaxMoves = 1;
                while(rollProducesValidAmountOfMaxMoves(player, countMaxMoves)){
                    countMaxMoves = countMaxMoves + 1;
                    player.roll();
                    movePlayer(player);
                }

                if (countMaxMoves === app.MAX_MOVE_MAX){
                    player.position = app.START_POSITION;
                    player.tooManyMaxMoves = true;
                }
                
                return true;
            },
            hasNotFinished: function(){
                var notFinished = true;
                if (self.finished) return false;

                return notFinished;
            }
        };
        function movePlayer(player){
            if ((player.position + player.nextMove) <= board.lastField){
                player.position += player.nextMove;
            }

            if (player.position === board.lastField){
                self.winner = player;
                self.finished = true;
            }

            player.position = board.getSnakeEndFrom(player.position);
            
            player.position = board.getLadderEndFrom(player.position);
        }
        function rollProducesValidAmountOfMaxMoves(player, countMaxMoves){
            return (self.hasNotFinished() &&
                player.nextMove === app.PLAYER_MOVE_MAX &&
                countMaxMoves < app.MAX_MOVE_MAX);
        }
        
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
                if (self.position < app.START_POSITION) self.position = app.START_POSITION;
            },
            roll: function(){
                var amount = Math.floor((Math.random() * app.PLAYER_MOVE_MAX) + app.PLAYER_MOVE_MIN);
                self.nextMove = amount;
            }
        };

        return self;
    }

    function Board(width, height){
        var self = {
            width: width,
            height: height,
            lastField: width*height,
            startField: 1,
            snakes: [],
            addSnake: function(start, end){
                if ((end < self.startField) ||
                    (start > self.lastField)){
                    return;
                }
                addSpecial(start, end, 'snakes');
            },
            ladders: [],
            addLadder: function(start, end){
                if ((start < self.startField) ||
                    (end > self.lastField)){
                    return;
                }
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
                    if (hasNotValidPositions(snake)){
                        validPositions = false;
                    }
                    
                });
                self.ladders.forEach(function(ladder){
                    if (hasNotValidPositions(ladder)){
                        validPositions = false;
                    }
                });
                if (validPositions){
                    self[type].push({start: start,end: end});
                }
                function hasNotValidPositions(special){
                    if ((special.start === start) ||
                        (special.start === end) ||
                        (special.end === start) ||
                        (special.end === end)){

                        return true;
                    }

                    return false;
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

    app.START_POSITION = 0;
    app.START_MOVE = 3;
    app.MAX_MOVE_MAX = 3;
    app.PLAYER_MOVE_MIN = 1;
    app.PLAYER_MOVE_MAX = 6;
})();