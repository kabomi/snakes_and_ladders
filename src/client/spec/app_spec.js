/*global describe, it, expect, spyOn, beforeEach, fs, xit, done, jasmine, afterEach, xdescribe */

(function(){
    "use strict";
    
    describe("Snake and ladders", function (){
        describe("Player", function(){
            it("defines its position", function(){
                 var player = new app.Player(5);
                 expect(player.position).toBe(5);
            });
        });
        
    });

})();