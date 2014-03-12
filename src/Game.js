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
      }
      else if(GameRules.gameTie(GameBoard)) {
        UI.tieMessage();
        this.visualAfterGameOver();
      }
    },

    humanPlay: function() {
      var _this = this;
      $("tr td").click(function(e) {
        Human.choiceSpot(e, GameBoard, _this.user);
        _this.nextTurn(_this.user);
        console.log("human")
        $("tr td").unbind("click", this.humanPlay);
      });
      console.log("human out")
    },

    computerPlay: function() {
      Computer.chooseTheBestSpot(this.computer);
      this.nextTurn(this.computer);
      console.log("comp")
      $("tr td").unbind("click", this.humanPlay);
    },

    play: function() {
      var _this = this;
      this.newGame();
      var firstmove = this.firstMove();
      if (firstmove === true) {
        return;
      }
      else if (firstmove === "y") {
        this.humanPlay(function() {
          this.computerPlay();
        });
        console.log("y")
      }
      else {
        $("tr td").click(function(e) {
          console.log("n in")
          _this.computerPlay();
          _this.humanPlay();
          $("tr td").unbind("click");
          _this.play();
        });
        console.log("n out")
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
