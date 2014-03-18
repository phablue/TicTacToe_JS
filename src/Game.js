(function() {
  var input;
  var Game = {
    user: "X",
    computer: "O",
    goFirst: null,

    visualAfterChoice: function(button) {
      if ($(button).attr('class') == "btn btn-start") {
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
      return true;
    },

    winner: function(currentPlayer) {
      return currentPlayer == "X" ? "Player" : "Computer";
    },

    firstMove: function(button) {
      var input = UI.askFirstMove();
      if (input === null || input === "") {
        return true;
      }
      else if(input == "y" || input == "n") {
        this.visualAfterChoice(button);
        this.goFirst = input;
      }
      else {
        UI.inputErrorMessage();
        this.firstMove();
      }
    },

    nextTurn: function(currentPlayer) {
      if(GameRules.gameWin(GameBoard)) {
        UI.winMessage(this.winner(currentPlayer));
        return this.visualAfterGameOver();
      }
      else if(GameRules.gameTie(GameBoard)) {
        UI.tieMessage();
        return this.visualAfterGameOver();
      }
      return false;
    },

    humanPlay: function(callback) {
      UI.showHumanMessage();
      $("tr td").click(function(e) {
        if (Human.choiceSpot(GameBoard, e.target.id, Game.user)) {
          $("tr td").unbind("click");
          UI.hideHumanMessage();
          if (Game.nextTurn(Game.user) === false) {
            callback(Game.play);
          }
        }
        else {
          return;
        }
      })
    },

    computerPlay: function(callback) {
      $("#Computer").show(200,function() {
        Computer.chooseTheBestSpot(Game.computer);
        if (Game.nextTurn(Game.computer) === false) {
          callback(Game.play);
        }
      });
    },

    introGame: function(button) {
      this.newGame();
      if (this.firstMove(button) === true) {
        return;
      }
      this.play();
    },

    play: function() {
      if (Game.goFirst === "y") {
        Game.humanPlay(Game.computerPlay);
      }
      else if (Game.goFirst === "n") {
        Game.computerPlay(Game.humanPlay);
      }
    },

    startGame: function() {
      UI.hideButton(".btn-restart", ".btn-new");
      UI.hideComputerMessage();
      UI.hideHumanMessage();
      $(".btn-start").click(function(e) {
        Game.introGame(e.target);
        e.stopPropagation();
      });
    },

    resetGame: function() {
      $("tr td").empty();
      GameBoard.resetBoard();
    },

    newGame: function() {
      $(".btn-new").click(function(e) {
        $(".btn-new").unbind("click");
        Game.resetGame();
        $("tr td").unbind("click");
        Game.introGame(e.target);
      });
    },

    restartGame: function() {
      $(".btn-restart").click(function(e) {
        Game.resetGame();
        Game.introGame(e.target);
        e.stopPropagation();
      });
    }
  };
  window.Game = Game;
})();
