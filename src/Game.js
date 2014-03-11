(function() {
  var input;
  var gameboard = window.GameBoard;
  var ui = window.UI;
  var Game = {
    currentPlayer: "X",
    board: gameboard,
    gamerules: window.GameRules,
    human: window.Human,

    visualAfterChoice: function() {
      if ($(event.target).attr('class') == "btn btn-start") {
        ui.toggleDisplayedButton(".btn-start", ".btn-new");
      }
      else {
        ui.toggleDisplayedButton(".btn-restart", ".btn-new");
      }
    },

    visualAfterGameOver: function() {
      $("tr td").unbind();
      ui.toggleDisplayedButton(".btn-new", ".btn-restart");
      this.restartGame();
    },

    winner: function() {
      return this.currentPlayer == "X" ? "Player 1" : "Player 2";
    },

    choicePlayer: function() {
      var input = ui.askChoicePlayer();
      if (input === null || input === "") {
        return true;  
      }
      else if(input == "X") {
        this.currentPlayer = "X";
        this.visualAfterChoice();
      }
      else if(input == "O") {
        this.currentPlayer = "O";
        this.visualAfterChoice();
      }
      else {
        ui.inputErrorMessage();
        this.choicePlayer();
      }
      return false;
    },

    nextTurn: function() {
      if(this.gamerules.gameWin(this.board)) {
        ui.winMessage(this.winner());
        this.visualAfterGameOver();
      }
      else if(this.gamerules.gameTie(this.board)) {
        ui.tieMessage();
        this.visualAfterGameOver();
      }
    },

    play: function() {
      var _this = this;
      if (this.choicePlayer()) {
        return;
      } 
      this.newGame();
      $("tr td").click(function() {
        _this.human.choiceSpot(_this.board, _this.currentPlayer);
        _this.nextTurn();
        _this.currentPlayer = _this.human.changePlayer(_this.currentPlayer);
      });
    },

    startGame: function() {
      var _this = this;
      ui.hideButton(".btn-restart", ".btn-new");
      $(".btn-start").click(function(e) {
        _this.play();
        e.stopPropagation();
      });
    },

    resetGame: function() {
      $("tr td").empty();
      this.board.resetBoard();
    },

    newGame: function() {
      var _this = this;
      $(".btn-new").click(function(e) {
        _this.resetGame();
        _this.choicePlayer()
        e.stopPropagation();
      });
    },

    restartGame: function() {
      var _this = this;
      $(".btn-restart").click(function(e) {
        _this.resetGame();
        _this.play();
        e.stopPropagation();
      });
    }
  };
  window.Game = Game;
})();
