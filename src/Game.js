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
        return true;
      }
      else if(GameRules.gameTie(GameBoard)) {
        UI.tieMessage();
        this.visualAfterGameOver();
      }
    },

    humanPlay: function(e) {
      Human.choiceSpot(e, GameBoard, this.user);
      this.nextTurn(this.user);
    },

    computerPlay: function() {
      var _this = this;
      $("#Computer").show(220, function() {
        Computer.chooseTheBestSpot(_this.computer);
        _this.nextTurn(_this.computer);
      });
    },

    play: function() {
      var _this = this;
      this.newGame();
      var firstmove = this.firstMove();
      if (firstmove === true) {
        return;
      }
      else if (firstmove === "y") {
        $("tr td").click(function(e) {
          _this.humanPlay(e);
          _this.computerPlay();
          console.log("y")
        });
      }
      else {
        this.computerPlay(function() {
          $("tr td").click(function(e) {
            console.log("n click")
            _this.humanPlay(e);
          });
        });
      }
    },

    startGame: function() {
      var _this = this;
      UI.hideButton(".btn-restart", ".btn-new");
      UI.hideComputerMessage();
      $(".btn-start").click(function(e) {
        _this.play();
        e.stopPropagation();
      });
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
