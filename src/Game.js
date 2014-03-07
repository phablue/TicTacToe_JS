(function() {
  var input;
  var gameboard = window.GameBoard;
  var ui = window.UI;
  var Game = {
    currentPlayer: "X",
    board: gameboard,
    rules: window.GameRules,
    human: window.Human,

    choicePlayer: function() {
      var input = ui.askChoicePlayer();
      if (input === null || input === "") {
        return true;
      }
      else if(input == "X") {
        this.currentPlayer = "X";
      }
      else if(input == "O") {
        this.currentPlayer = "O";
      }
      else {
        ui.inputErrorMessage();
        this.choicePlayer();
      }
      return false;
    },

    play: function() {
      console.log("hi")
      var _this = this;
      if (_this.choicePlayer()) {
        return;
      }
      this.newGame();
      this.human.choiceSpot(_this.board, _this.currentPlayer);
      $("tr td").click(function() {
        _this.nextTurn();
        event.stopImmediatePropagation();
      });
    },

    nextTurn: function() {
      if(this.rules.gameWin(this.board)) {
        ui.winMessage(this.winner());
        $("tr td").unbind();
        ui.toggleDisplayedButton(".btn-new", ".btn-restart");
        this.restartGame();
      }
      else if(this.rules.gameTie(this.board)) {
        ui.tieMessage();
        $("tr td").unbind();
        ui.toggleDisplayedButton(".btn-new", ".btn-restart");
        this.restartGame();
      }
    },

    winner: function() {
      return this.currentPlayer == "X" ? "Player1" : "Player 2";
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
      ui.toggleDisplayedButton(".btn-start", ".btn-new");
      $(".btn-new").click(function() {
        _this.resetGame();
        _this.play();
      });
    },

    restartGame: function() {
      var _this = this;
      $(".btn-restart").click(function() {
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
