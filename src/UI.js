(function() {
  var UI = {
    gameType: null,

    showComputerMessage: function(callback) {
      $("#Computer").show("fast", function() {
        callback(UI.humanPlay);
      });
    },

    hideComputerMessage: function() {
      $("#Computer").hide();
    },

    showHumanMessage: function() {
      $("#Human").show();
    },

    hideHumanMessage: function() {
      $("#Human").hide();
    },

    changeHumanMessage: function() {
      if (UI.gameType === ".player") {
        UI.setTextContents("Human", "Click a spot you want.");
      }
      else {
        UI.setTextContents("Human", "Player '" + Game.currentPlayer + "' click a spot you want.");
      }
    },

    clickSpot: function(callback) {
      $("tr td").click(function(e) {
        if (UI.gameType === ".player") {
          callback(e.target.id, UI.computerPlay);
        }
        else {
          callback(e.target.id, UI.humanPlay);
        }
      });
    },

    clickButton: function(button, callback) {
      $(button).click(function(e) {
        if (button == ".player" || button == ".players") {
          UI.gameType = button;
          return UI.choiceMark();
        }
        else if (button == "#Xmark" || button == "#Omark") {
          Game.currentPlayer = UI.getTextContents(e.target.id);
          UI.toggleDisplayedButton(".playerMark", ".game");
        }
        else if (button == ".btn-new") {
          UI.hideButton(".game")
          UI.unbindClick("button");
          UI.unbindClick("tr td");
          UI.resetGame();
        }
        else if (button == ".btn-restart") {
          UI.hideButton(".game")
          UI.unbindClick("button");
          UI.resetGame();
        }
        e.stopPropagation();
        callback();
      });
    },

    unbindClick: function(element) {
      $(element).unbind("click");
    },

    removeText: function(element) {
      $(element).empty();
    },

    getTextContents: function(elementID) {
      return $("#" + elementID).text()
    },

    setTextContents: function(elementID, TextContents) {
      $("#" + elementID).text(TextContents);
    },

    spotErrorMessage: function() {
      alert("That is not an available spot.\nPlease choose a different spot.");
    },

    winMessage: function(winner) {
      alert("Congratulations.\n"+ winner +" win!!");
    },

    tieMessage: function() {
      alert("Game is tied.\nGame Over.");
    },

    inputErrorMessage: function() {
      alert("You have to choose 'y' or 'n'.");
    },

    askFirstMove: function() {
      return prompt("Do you require the first move? (y/n)");
    },

    toggleDisplayedButton: function(hideClass, showClass) {
      $(hideClass).hide();
      $(hideClass).unbind();
      $(showClass).show()
    },

    hideButton: function(hideClass1, hideClass2) {
      $(hideClass1).hide();
      $(hideClass2).hide();
    },

    visualAfterGameOver: function() {
      this.unbindClick("tr td");
      this.toggleDisplayedButton(".btn-new", ".btn-restart");
      this.hideComputerMessage();
      this.hideHumanMessage();
      this.restartGame();
    },

    visualWhenGameOver: function(currentPlayer) {
      if(GameRules.gameWin(GameBoard)) {
        this.winMessage(Game.winner(currentPlayer));
        this.visualAfterGameOver();
      }
      else if(GameRules.gameTie(GameBoard)) {
        this.tieMessage();
        this.visualAfterGameOver();
      }
    },

    choiceMark: function() {
      UI.hideButton(".btn-new", ".btn-restart");
      UI.toggleDisplayedButton(".menu", ".playerMark");
      UI.clickButton("#Xmark", UI.introGame);
      UI.clickButton("#Omark", UI.introGame);
    },

    mainGame: function() {
      UI.toggleDisplayedButton(".btn-start", ".menu");
      UI.clickButton(".player");
      UI.clickButton(".players");
    },

    introGame: function() {
      UI.newGame();
      Game.firstMove();
      Game.playGame();
    },

    startGame: function() {
      this.hideButton(".menu");
      this.hideButton(".game", ".playerMark");
      this.clickButton(".btn-start", UI.mainGame);
    },

    resetGame: function() {
      this.removeText("tr td");
      GameBoard.resetBoard();
    },

    newGame: function() {
      this.hideComputerMessage();
      this.hideHumanMessage();
      this.clickButton(".btn-new", UI.mainGame);
    },

    restartGame: function() {
      this.clickButton(".btn-restart", UI.mainGame);
    },

    humanPlay: function() {
      UI.changeHumanMessage();
      UI.showHumanMessage();
      UI.clickSpot(Game.humanChoice)
    },

    computerPlay: function() {
      UI.showComputerMessage(Game.computerChoice);
    }
  };
  window.UI = UI;
})();
