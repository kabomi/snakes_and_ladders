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
                player.move(5);
                expect(player.position).toBe(10);
                player.move(10);
                expect(player.position).toBe(20);
            });
            it("moves backwards from its current position", function(){
                player.moveBackwards(5);
                expect(player.position).toBe(0);
            });
        });
        
    });

})();