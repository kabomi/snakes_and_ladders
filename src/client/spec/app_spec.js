/*global describe, it, expect, spyOn, beforeEach, fs, xit, done, jasmine, afterEach, xdescribe */

(function(){
    "use strict";
    
    var _DEBUG = false;

    describe("Snake and ladders", function (){
        describe("Player", function(){
            var player;
            beforeEach(function(){
                player = new app.Player(5);
            });
            it("defines its position", function(){
                 expect(player.position).toBe(5);
            });
            it("moves to another position from its current position", function(){
                player.moveForward(5);
                expect(player.position).toBe(10);
                player.moveForward(10);
                expect(player.position).toBe(20);
            });
            it("moves backwards from its current position", function(){
                player.moveBackward(5);
                expect(player.position).toBe(0);
            });
            it("can't moves backwards if init position is reached", function(){
                player.moveBackward(6);
                expect(player.position).toBe(0);
            });
            it("moves an amount between " + app.PLAYER_MOVE_MIN + " and " + app.PLAYER_MOVE_MAX, function(done){
                var i, error = false, possibleValues = [];
                var minValue = app.PLAYER_MOVE_MIN, maxValue = app.PLAYER_MOVE_MAX;
            
                while (notTestedAll(possibleValues)){
                    player.move();
                    if (player.nextMove > maxValue ||
                        player.nextMove < minValue ||
                        player.nextMove === undefined){

                        error = true;
                        break;
                    }else{
                        possibleValues[player.nextMove] = player.nextMove;
                    }
                }
    
                expect(error).toBeFalsy();
                done();

                function notTestedAll(values){
                    var i;
                    for (i=minValue; i <= maxValue;i++){
                        if (values[i] !== i) return true;
                    }
                    return false;
                }
            });
        });
        describe("Board", function(){
            var board;
            beforeEach(function(){
                board = app.Board(10, 10);
            });
            it("is defined by height and width", function(){
                expect(board.width).toBe(10);
                expect(board.height).toBe(10);
            });
            it("can add snakes", function(){
                board.addSnake(15, 5);
                expect(board.snakes.length).toBe(1);
                var snake = board.snakes[0];
                expect(snake.start).toBe(15);
                expect(snake.end).toBe(5);
            });
            it("can add ladders", function(){
                board.addLadder(5, 15);
                expect(board.ladders.length).toBe(1);
                var ladder = board.ladders[0];
                expect(ladder.start).toBe(5);
                expect(ladder.end).toBe(15);
            });
            it("can't add a snake or ladder if its start/end coincides with start/end of others", function(){
                board.addSnake(15, 5);
                expect(board.snakes.length).toBe(1);
                board.addSnake(15, 6);
                expect(board.snakes.length).toBe(1);
                board.addSnake(10, 5);
                expect(board.snakes.length).toBe(1);
                board.addSnake(25, 15);
                expect(board.snakes.length).toBe(1);
                board.addSnake(5, 1);
                expect(board.snakes.length).toBe(1);
                board.addLadder(15, 25);
                expect(board.ladders.length).toBe(0);
                board.addLadder(0, 15);
                expect(board.ladders.length).toBe(0);
                board.addLadder(5, 10);
                expect(board.ladders.length).toBe(0);
                board.addLadder(1, 5);
                expect(board.ladders.length).toBe(0);
                board.addSnake(10, 6);
                board.addLadder(11, 22);
                expect(board.snakes.length).toBe(2);
                expect(board.ladders.length).toBe(1);
            });
        });
        describe("Game", function(){
            var board, game, player;
            beforeEach(function(){
                board = app.Board(10, 10);
                game = app.init(board);
                player = app.Player(0);
                player.nextMove = 5;
            });
            it("moves the player during evaluation only if the player can start", function(){
                spyOn(player, 'move');
                game.evaluate(player);
                expect(player.move).toHaveBeenCalled();
            });
            it("evaluates next player position only if the player can start", function(){
                spyOn(player, 'move');
                expect(game.evaluate(player)).toBe(false);
            });
            it("evaluates next player position", function(){
                spyOn(player, 'move');
                player.cantStart = false;
                expect(game.evaluate(player)).toBe(true);
                expect(player.position).toBe(5);
            });
            it("moves the player two times if player can start and its nextMove is " + app.PLAYER_MOVE_MAX, function(){
                spyOn(player, 'move');
                player.cantStart = false;
                player.nextMove = 6;
                expect(game.evaluate(player)).toBe(true);
                expect(player.move).toHaveBeenCalled();
                expect(player.move.calls.count()).toBe(2);
            });
            it("lets a player start after its next move is " + app.START_MOVE, function(){
                spyOn(player, 'move');
                expect(game.evaluate(player)).toBe(false);
                player.nextMove = app.START_MOVE;
                expect(game.evaluate(player)).toBe(true);
                expect(player.position).toBe(0);
            });
            it("moves a player to the end of a ladder when its next move goes into ladder start", function(){
                spyOn(player, 'move');
                board.addLadder(5, 15);
                player.cantStart = false;
                player.nextMove = 5;
                expect(game.evaluate(player)).toBe(true);
                expect(player.position).toBe(15);
            });
            it("moves a player to the end of a snake when its next move goes into snake start", function(){
                spyOn(player, 'move');
                board.addSnake(15, 5);
                player.cantStart = false;
                player.nextMove = 15;
                expect(game.evaluate(player)).toBe(true);
                expect(player.position).toBe(5);
            });
            it("finish if a player reachs the last field", function(){
                spyOn(player, 'move');
                player.cantStart = false;
                player.position = 95;
                player.nextMove = 5;
                expect(game.evaluate(player)).toBe(true);
                expect(game.winner).toBe(player);
                expect(game.finished).toBe(true);
            });
            it("finish if a player reachs the last field and there is a snake start", function(){
                spyOn(player, 'move');
                board.addSnake(100, 50);
                player.cantStart = false;
                player.position = 95;
                player.nextMove = 5;
                expect(game.evaluate(player)).toBe(true);
                expect(game.winner).toBe(player);
                expect(game.finished).toBe(true);
            });
            it("doesnt finish if a player move beyond the last field", function(){
                spyOn(player, 'move');
                board.addSnake(100, 50);
                player.cantStart = false;
                player.position = 95;
                player.nextMove = 6;
                expect(game.evaluate(player)).toBe(true);
                expect(game.winner).toBeUndefined();
                expect(game.finished).toBeFalsy();
                expect(player.position).toBe(95);
            });
            it("doesnt evaluate if there is a winner", function(){
                spyOn(player, 'move');
                player.cantStart = false;
                player.position = 95;
                player.nextMove = 5;
                expect(game.evaluate(player)).toBe(true);
                expect(game.winner).toBe(player);
                expect(game.finished).toBe(true);
                var player2 = app.Player(95);
                player2.cantStart = false;
                player2.nextMove = 5;
                expect(game.evaluate(player2)).toBe(false);
                expect(game.winner).toBe(player);
                expect(game.finished).toBe(true);
            });
            it("resolves a 1 player game", function(done){
                gameSetup();
                while (game.hasNotFinished()){
                    log("player position: " + player.position);
                    player.move();
                    game.evaluate(player);
                }
                expect(game.winner).toBe(player);
                done();
            });
            it("resolves a 2 player game", function(done){
                gameSetup();
                var player2 = app.Player(0);
                while (game.hasNotFinished()){
                    log("player position: " + player.position);
                    player.move();
                    game.evaluate(player);
                    log("player2 position: " + player2.position);
                    player2.move();
                    game.evaluate(player2);
                }
                if (game.winner === player){
                    log("player1 wins");
                }
                if (game.winner === player2){
                    log("player2 wins");
                }
                expect(game.finished).toBe(true);
                done();
            });
            function gameSetup(){
                board.addLadder(3, 10);
                board.addLadder(13, 25);
                board.addLadder(30, 70);
                board.addLadder(40, 55);
                board.addLadder(74, 95);

                board.addSnake(12, 2);
                board.addSnake(23, 9);
                board.addSnake(60, 42);
                board.addSnake(50, 33);
                board.addSnake(80, 72);
                board.addSnake(98, 61);
            }
        });
    });
    function log(value){
        if (_DEBUG) console.log(value)
    }

})();