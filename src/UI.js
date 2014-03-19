(function() {
  var UI = {
    showComputerMessage: function(callback) {
      $("#Computer").show(200, function() {
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

    getClass: function(element) {
      return $(element).attr('class')
    },

    clickSpot: function(callback) {
      $("tr td").click(function(e) {
        callback(e.target.id, UI.computerPlay);
      });
    },

    clickButton: function(button, callback) {
      $(button).click(function(e) {
        if (button == "#Xmark" || button == "#Omark") {
          Game.currentPlayer = UI.getTextContents(e.target.id);
          UI.toggleDisplayedButton(".playerMark", ".game");          
        }
        if (button == ".btn-new") {
          UI.unbindClick(".btn-new");
          UI.unbindClick("tr td");
          UI.resetGame();
        }
        else if (button == ".btn-restart") {
          UI.resetGame();
        }
        e.stopPropagation();
        callback(e.target);
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

    visualAfterChoice: function(button) {
      if (this.getClass(button) == "btn-start") {
        this.toggleDisplayedButton(".btn-start", ".btn-new");
      }
      else {
        this.toggleDisplayedButton(".btn-restart", ".btn-new");
      }
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

    mainGame: function() {
      this.hideButton(".game", ".playerMark");
      $(".player").click(function(e) {
        UI.toggleDisplayedButton(".menu", ".playerMark");
        UI.clickButton("#Xmark", UI.introGame);
        UI.clickButton("#Omark", UI.introGame);
      });
    },

    introGame: function(button) {
      UI.newGame();
      if (Game.firstMove(button) === true) {
        return;
      }
      Game.playGame();
    },

    startGame: function() {
      this.hideButton(".btn-restart", ".btn-new");
      this.hideComputerMessage();
      this.hideHumanMessage();
      this.clickButton(".btn-start", UI.introGame);
    },

    resetGame: function() {
      this.removeText("tr td");
      GameBoard.resetBoard();
    },

    newGame: function() {
      this.hideComputerMessage();
      this.hideHumanMessage();
      this.clickButton(".btn-new", UI.introGame);
    },

    restartGame: function() {
      this.clickButton(".btn-restart", UI.introGame);
    },

    humanPlay: function() {
      UI.showHumanMessage();
      UI.clickSpot(Game.humanChoice)
    },

    computerPlay: function() {
      UI.showComputerMessage(Game.computerChoice);
    }
  };
  window.UI = UI;
})();
