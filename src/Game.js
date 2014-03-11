(function() {
  var input;
  var gameboard = window.GameBoard;
  var Game = {
    currentPlayer: "X",
    board: gameboard,
    gamerules: window.GameRules,
    human: window.Human,

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
      this.restartGame();
    },

    winner: function() {
      return this.currentPlayer == "X" ? "Player 1" : "Player 2";
    },

    choicePlayer: function() {
      var input = UI.askChoicePlayer();
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
        UI.inputErrorMessage();
        this.choicePlayer();
      }
      return false;
    },

    nextTurn: function() {
      if(this.gamerules.gameWin(this.board)) {
        UI.winMessage(this.winner());
        this.visualAfterGameOver();
      }
      else if(this.gamerules.gameTie(this.board)) {
        UI.tieMessage();
        this.visualAfterGameOver();
      }
    },

    play: function() {
      var _this = this;
      if (this.choicePlayer()) {
        return;
      } 
      this.newGame();
      _this.human.choiceSpot(_this.board, _this.currentPlayer);
      $("tr td").click(function(e) {
        _this.nextTurn();
        e.stopPropagation();
      });
    },

    startGame: function() {
      var _this = this;
      UI.hideButton(".btn-restart", ".btn-new");
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
