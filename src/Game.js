(function() {
  var input;
  var gameboard = window.GameBoard;
  var ui = window.UI;
  var Game = {
    currentPlayer: "X",
    board: gameboard,
    gamerules: window.GameRules,
    human: window.Human,

    choicePlayer: function() {
      var input = ui.askChoicePlayer();
      if (input === null || input === "") {
        return true;
      }
      else if(input == "X") {
        this.currentPlayer = "X";
        ui.toggleDisplayedButton(".btn-start", ".btn-new");
      }
      else if(input == "O") {
        this.currentPlayer = "O";
        ui.toggleDisplayedButton(".btn-start", ".btn-new");
      }
      else {
        ui.inputErrorMessage();
        this.choicePlayer();
      }
      return false;
    },

    play: function() {
      this.newGame();
      var _this = this;
      if (_this.choicePlayer()) {
        return;
      }
      $("tr td").click(function() {
        _this.human.choiceSpot(_this.board, _this.currentPlayer);
        _this.nextTurn();
        _this.currentPlayer = _this.human.changePlayer(_this.currentPlayer);
      });
    },

    nextTurn: function() {
      if(this.gamerules.gameWin(this.board)) {
        ui.winMessage(this.winner());
        $("tr td").unbind();
        ui.toggleDisplayedButton(".btn-new", ".btn-restart");
        this.restartGame();
      }
      else if(this.gamerules.gameTie(this.board)) {
        ui.tieMessage();
        $("tr td").unbind();
        ui.toggleDisplayedButton(".btn-new", ".btn-restart");
        this.restartGame();
      }
    },

    winner: function() {
      return this.currentPlayer == "X" ? "Player 1" : "Player 2";
    },

    startGame: function() {
      var _this = this;
      ui.hideButton(".btn-restart", ".btn-new");
      $(".btn-start").click(function() {
        _this.play();
      });
    },

    newGame: function() {
      var _this = this;
      $(".btn-new").one("click", function() {
        _this.resetGame();
      });
    },

    restartGame: function() {
      var _this = this;
      $(".btn-restart").one("click", function() {
        ui.toggleDisplayedButton(".btn-restart", ".btn-new");
        _this.resetGame();
        _this.play();
      });
    },

    resetGame: function() {
      $("tr td").empty();
      this.board.resetBoard();
    }
  };
  window.Game = Game;
})();
