
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
            }
        };

        return self;
    }

    app.Player = Player;
    app.init = init; 
})();