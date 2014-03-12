(function() {
  var input;
  var Game = {
    user: "X",
    computer: "O",

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

    winner: function(currentPlayer) {
      return currentPlayer == "X" ? "Player" : "Computer";
    },

    firstMove: function() {
      var input = UI.askChoicePlayer();
      if (input === null || input === "") {
        return true;  
      }
      else if(input == "y" || input == "n") {
        this.visualAfterChoice();
        return input;
      }
      else {
        UI.inputErrorMessage();
        this.choicePlayer();
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

    play: function() {
      var _this = this;
      this.newGame();
      var firstmove = this.firstMove();
      if (firstmove) {
        return;
      }
      else if (firstmove == "y") {
      Human.choiceSpot(GameBoard, this.user);
        $("tr td").click(function(e) {
          _this.nextTurn(_this.user);
          $("tr td").unbind("click");
        });
        // Computer.chooseTheBestSpot(_this.computer);
        // _this.nextTurn(_this.computer);
      }
      else {
        Computer.chooseTheBestSpot(this.computer);
        this.nextTurn(this.computer);
        Human.choiceSpot(GameBoard, this.user);
        $("tr td").click(function(e) {
          _this.nextTurn(_this.user);
          return;
        }
      }
    },

    startGame: function() {
      var _this = this;
      UI.hideButton(".btn-restart", ".btn-new");
      $(".btn-start").click(function(e) {
        _this.play();
        e.stopPropagation();
      });
      UI.hideComputerMessage();
    },

    resetGame: function() {
      $("tr td").empty();
      GameBoard.resetBoard();
    },

    newGame: function() {
      var _this = this;
      var goback = null;
      $(".btn-new").click(function(e) {
        $(".btn-new").unbind("click");
        _this.resetGame();
        $("tr td").unbind("click");
        _this.play();
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
