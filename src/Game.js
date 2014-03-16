(function() {
  var input;
  var Game = {
    user: "X",
    computer: "O",
    firstmove: null,

    visualAfterChoice: function() {
      if ($(event.target).attr('class') == "btn btn-start") {
        UI.toggleDisplayedButton(".btn-start", ".btn-new");
      }
      else {
        UI.toggleDisplayedButton(".btn-restart", ".btn-new");
      }
    },

    visualAfterGameOver: function() {
      $("tr td").unbind();
      UI.toggleDisplayedButton(".btn-new", ".btn-restart");
      UI.hideComputerMessage();
      UI.hideHumanMessage();
      this.restartGame();
    },

    winner: function(currentPlayer) {
      return currentPlayer == "X" ? "Player" : "Computer";
    },

    firstMove: function() {
      var input = UI.askFirstMove();
      if (input === null || input === "") {
        return true;  
      }
      else if(input == "y" || input == "n") {
        this.visualAfterChoice();
        return input;
      }
      else {
        UI.inputErrorMessage();
        this.firstMove();
      }
    },

    nextTurn: function(currentPlayer) {
      if(GameRules.gameWin(GameBoard)) {
        UI.winMessage(this.winner(currentPlayer));
        this.visualAfterGameOver();
      }
      else if(GameRules.gameTie(GameBoard)) {
        UI.tieMessage();
        this.visualAfterGameOver();
      }
    },

    humanPlay: function(e, callback) {
      Human.choiceSpot(e, GameBoard, this.user);
      UI.hideHumanMessage();
      this.nextTurn(this.user);
      $("tr td").unbind("click", Game.humanPlayHandler);
      callback(this.play);
    },

    humanPlayHandler: function() {
      Game.humanPlay(event, Game.computerPlay);
    },

    computerPlay: function(callback) {
      $("#Computer").show(200,function() {
        Computer.chooseTheBestSpot(Game.computer);
        Game.nextTurn(Game.computer);        
        callback();
      });
    },

    introGame: function() {
      this.firstmove = this.firstMove();
      this.newGame();
      if (this.firstmove === true) {
        return;
      }
      this.play();
    },

    play: function() {
      if (Game.firstmove === "y") {
        UI.showHumanMessage();
        $("tr td").bind("click", Game.humanPlayHandler);
      }
    },

    startGame: function() {
      var _this = this;
      UI.hideButton(".btn-restart", ".btn-new");
      UI.hideComputerMessage();
      UI.hideHumanMessage();
      $(".btn-start").click(function(e) {
        _this.introGame();
        e.stopPropagation();
      });
    },

    resetGame: function() {
      $("tr td").empty();
      GameBoard.resetBoard();
    },

    newGame: function() {
      var _this = this;
      var newgame;
      $(".btn-new").click(function(e) {
        $(".btn-new").unbind("click");
        _this.resetGame();
        $("tr td").unbind("click");
        _this.introGame();
      });
    },

    restartGame: function() {
      var _this = this;
      $(".btn-restart").click(function(e) {
        _this.resetGame();
        _this.introGame();
        e.stopPropagation();
      });
    }
  };
  window.Game = Game;
})();
