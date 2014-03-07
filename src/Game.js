(function() {
  var input;
  var gameboard = window.GameBoard;
  var ui = window.UI;
  var Game = {
    currentPlayer: "X",
    board: gameboard,
    rules: window.GameRules,
    human: window.Human,

    nextTurn: function() {
      if(this.rules.gameWin(this.board)) {
        ui.winMessage();
        $("tr td").unbind();
        $(".btn-new").hide();
        $(".btn-restart").show();
        this.restartGame();
      }
      else if(this.rules.gameTie(this.board)) {
        ui.tieMessage();
        $("tr td").unbind();
        $(".btn-new").hide();
        $(".btn-restart").show();
        this.restartGame();
      }
    },

    goFirst: function() {
      var input = ui.askGoFirst();
      console.log(input);
      if (input === null || input === "") {
        return true;
      }
      else if(input == "y") {
        this.currentPlayer = "X";
      }
      else if(input == "n") {
        this.currentPlayer = "O";
      }
      else {
        ui.inputErrorMessage();
        this.goFirst();
      }
      return false;
    },

    startGame: function() {
      $(".btn-restart").hide();
      $(".btn-new").hide();
      var _this = this;
      $(".btn-start").click(function() {
        _this.play();
      });
    },

    newGame: function() {
      $(".btn-start").hide();
      $(".btn-new").show();
      var _this = this;
      $(".btn-new").click(function() {
        _this.resetGame();
      });
    },

    restartGame: function() {
      var _this = this;
      $(".btn-restart").click(function() {
        $(".btn-restart").hide();
        $(".btn-new").show();
        _this.resetGame();
      });
    },

    resetGame: function() {
      $("tr td").empty();
      this.board.resetBoard();
      this.play();
    },

    play: function() {
      var _this = this;
      if (_this.goFirst()) {
        return;
      }
      this.newGame();
      this.human.choiceSpot(_this.board, _this.currentPlayer);
      $("tr td").click(function() {
        _this.nextTurn();
      });
    }
  };
  window.Game = Game;
})();
