
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
            move: function(newPosition){
                self.position = self.position + newPosition;
            },
            moveBackwards: function(numPositions){
                self.position = self.position - numPositions;
            }
        };

        return self;
    }

    app.Player = Player;
    app.init = init; 
})();