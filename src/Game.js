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

    humanPlay: function(callback) {
      $("tr td").click(function(e) {
        if (Human.choiceSpot(e, GameBoard, Game.user)) {
          $("tr td").unbind("click");
          UI.hideHumanMessage();
          Game.nextTurn(Game.user);
          callback(Game.play);
        }
        else {
          return;
        }
      })
    },

    computerPlay: function(callback) {
      $("#Computer").show(200,function() {
        Computer.chooseTheBestSpot(Game.computer);
        Game.nextTurn(Game.computer);
        callback(Game.play);
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
        Game.humanPlay(Game.computerPlay);
      }
      else {
        Game.computerPlay(Game.humanPlay);
      }
    },

    startGame: function() {
      UI.hideButton(".btn-restart", ".btn-new");
      UI.hideComputerMessage();
      UI.hideHumanMessage();
      $(".btn-start").click(function(e) {
        Game.introGame();
        e.stopPropagation();
      });
    },

    resetGame: function() {
      $("tr td").empty();
      GameBoard.resetBoard();
    },

    newGame: function() {
      var newgame;
      $(".btn-new").click(function(e) {
        $(".btn-new").unbind("click");
        Game.resetGame();
        $("tr td").unbind("click");
        Game.introGame();
      });
    },

    restartGame: function() {
      $(".btn-restart").click(function(e) {
        Game.resetGame();
        Game.introGame();
        e.stopPropagation();
      });
    }
  };
  window.Game = Game;
})();
