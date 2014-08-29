/*global describe, it, expect, spyOn, beforeEach, fs, xit, done, jasmine, afterEach, xdescribe */

(function(){
    "use strict";
    
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
        });
        describe("Game", function(){
            var board, game, player;
            beforeEach(function(){
                board = app.Board(10, 10);
                game = app.init(board);
                player = app.Player(0);
                player.nextMove = 5;
            });
            it("evaluates next player position only if the player can continue", function(){
                expect(game.evaluate(player)).toBe(false);
            });
            it("evaluates next player position", function(){
                player.cantStart = false;
                expect(game.evaluate(player)).toBe(true);
                expect(player.position).toBe(5);
            });
            
        });
    });

})();