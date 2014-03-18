describe ("Test UI", function () {
  describe ("Test Computer Message", function() {
    var callback = function(){};
    beforeEach (function() {
      setFixtures(' <h1 id = "Computer">Please wait until computer choice..</h1>');
    });

    it ("Hides computer message", function() {
      UI.hideComputerMessage();
      expect($("#Computer")).toBeHidden();
    });

    it ("Show computer message", function() {
      UI.showComputerMessage(callback);
      expect($("#Computer")).toBeVisible();
    });

    it ("Call computerChoice function after show computer message", function() {
      var computerChoice = spyOn(Game, "computerChoice");
      UI.showComputerMessage(Game.computerChoice);
      expect(computerChoice).toHaveBeenCalled();
    });
  });

  describe ("Test Human Message", function() {
    beforeEach (function() {
      setFixtures(' <h1 id = "Human">Click a spot you want.</h1> ');
    });

    it ("Hides human message", function() {
      UI.hideHumanMessage();
      expect($("#Human")).toBeHidden();
    });

    it ("Shows human message", function() {
      UI.showHumanMessage();
      expect($("#Human")).toBeVisible();
    });
  });

  describe ("Test get class function", function() {
    it("get class in element", function() {
      setFixtures(' <button type="button" class = "btn-start">Start Game</button> ');
      expect(UI.getClass("button")).toBe("btn-start");
    });
  });

  describe ("Test click", function() {
    var introGame;
    var humanChoice;
    var unbindClick;
    var resetGame;
    var computerChoice;

    beforeEach(function() {
      introGame = spyOn(Game, "introGame");
      humanChoice = spyOn(Game, "humanChoice");
      unbindClick = spyOn(UI, "unbindClick");
      resetGame = spyOn(Game, "resetGame");
      computerChoice = spyOn(Game, "computerChoice");
      setFixtures(' <button type="button" class = "btn-start">Start Game</button> \
                    <button type="button" class = "btn-new">New Game</button> \
                    <button type="button" class = "btn-restart">Restart Game</button> \
                    <table> <td id = "0"></td><td id = "0"></td></table> ');
    });

    it("call humanChoice function after td click", function() {
      UI.clickSpot(Game.humanChoice);
      $("tr td").click();
      expect(humanChoice).toHaveBeenCalled();
    });

    it("call introGame function after start button click", function() {
      UI.clickButton(".btn-start", Game.introGame);
      $(".btn-start").click();
      expect(introGame).toHaveBeenCalled();
    });

    it("call functions after new button click", function() {
      UI.clickButton(".btn-new", Game.introGame);
      $(".btn-new").click();
      expect(unbindClick).toHaveBeenCalled();
      expect(resetGame).toHaveBeenCalled();
      expect(introGame).toHaveBeenCalled();
    });

    it("call reset and introGame function after restart button click", function() {
      UI.clickButton(".btn-restart", Game.introGame);
      $(".btn-restart").click();
      expect(resetGame).toHaveBeenCalled();
      expect(introGame).toHaveBeenCalled();
    });
  });

  describe ("Test unbindClick function", function() {
    it("tr td unbind", function() {
      var click = spyOnEvent('tr td', 'click');
      setFixtures('<table> <td id = "0"></td><td id = "0"></td></table>');
      UI.unbindClick("tr td");
      expect(click).not.toHaveBeenTriggered();
    });
  });

  describe ("Test removeText function", function() {
    it("tr td empty after event running", function() {
      setFixtures(' <table> <tr> <td id = "0">O</td><td id = "1">X</td><td id = "2"></td></tr> </table>');
      UI.removeText("tr td");
      expect($("tr td")).toBeEmpty();
    });
  });

  describe ("Test getTextContents function", function() {
    it("get text contents in element", function() {
      setFixtures(' <table> <tr> <td id = "0">O</td><td id = "1">X</td><td id = "2"></td></tr> </table>');
      expect(UI.getTextContents("0")).toBe("O");
    });
  });

  describe ("Test setTextContents funciton", function() {
    it("set 'X' in td after event running", function() {
      setFixtures(' <table> <tr> <td id = "0">O</td><td id = "1">X</td><td id = "2"></td></tr> </table>');
      UI.setTextContents("2", "X");
      expect($("#2")).toHaveText("X");
    });
  });

  describe ("Test alert events", function() {
    var winner = "Player1";
    var alert;

    beforeEach (function() {
      alert = spyOn(window, "alert");
    });

    it ("Pops up a spot Error Message", function() {
      UI.spotErrorMessage();
      expect(alert).toHaveBeenCalledWith("That is not an available spot.\nPlease choose a different spot.");
    });

    it ("Pops up a win Message", function() {
      UI.winMessage(winner);
      expect(alert).toHaveBeenCalledWith("Congratulations.\n"+ winner +" win!!");
    });

    it ("Pops up a tie Message", function() {
      UI.tieMessage();
      expect(alert).toHaveBeenCalledWith("Game is tied.\nGame Over.");
    });

    it ("Pops up a inputError Message", function() {
      UI.inputErrorMessage();
      expect(alert).toHaveBeenCalledWith("You have to choose 'y' or 'n'.");
    });
  });

  describe ("Test prompt events", function() {
    var prompt;
    var chooesnPlayer;
    it ("Pops up a message to ask about choosen player", function() {
      prompt = spyOn(window, "prompt").and.returnValue("y");
      chooesnPlayer = UI.askFirstMove();
      UI.askFirstMove();
      expect(prompt).toHaveBeenCalledWith("Do you require the first move? (y/n)");
      expect(chooesnPlayer).toEqual("y");
    });
  });

  describe ("Test Displaing Button", function() {
    var unbind;
    beforeEach (function() {
      unbind = spyOn($.fn, "unbind");
      setFixtures(' <button type="button" class = "btn-start">Start Game</button> \
                    <button type="button" class = "btn-new">New Game</button> \
                    <button type="button" class = "btn-restart">Restart Game</button> ');
    });

    it ("Hides start Button and unbind events, Show new Button", function() {
      UI.toggleDisplayedButton(".btn-start", ".btn-new");
      expect($(".btn-start")).toBeHidden();
      expect(unbind).toHaveBeenCalled();
      expect($(".btn-start")).not.toHandle("click");
      expect($(".btn-new")).toBeVisible();
    });

    it ("Hides restart and new Button", function() {
      UI.hideButton(".btn-restart", ".btn-new");
      expect($(".btn-new")).toBeHidden();
      expect($(".btn-restart")).toBeHidden();
    });
  });

  describe ("Test visualAfterChoice function", function() {
    var toggleDisplayedButton;
    var e;

    beforeEach (function() {
      e = jQuery.Event("click");
      toggleDisplayedButton = spyOn(UI, "toggleDisplayedButton");
      setFixtures(' <button type="button" class = "btn btn-start">Start Game</button> \
                    <button type="button" class = "btn-new">New Game</button> \
                    <button type="button" class = "btn-restart">Restart Game</button> ');
    });

    it ("call toggleDisplay function with start and new argument If button is start", function() {
      jQuery(".btn-start").trigger(e);
      UI.visualAfterChoice(e.target);
      expect(toggleDisplayedButton).toHaveBeenCalledWith('.btn-start', '.btn-new');
    });

    it ("call toggleDisplay function with restart and new argument If button is not start", function() {
      jQuery(".btn-new").trigger(e);
      UI.visualAfterChoice(e.target);
      expect(toggleDisplayedButton).toHaveBeenCalledWith('.btn-restart', '.btn-new');
    });
  });

  describe ("Test visualAfterGameOver function", function() {
    var toggleDisplayedButton;
    var restartGame;
    var unbind;
    var click;

    beforeEach (function() {
      toggleDisplayedButton = spyOn(UI, "toggleDisplayedButton");
      restartGame = spyOn(Game, "restartGame");
      unbind = spyOn($.fn, "unbind");
      click = spyOnEvent('tr td', 'click');
    });

    it ("Test call function after game over", function() {
      UI.visualAfterGameOver();
      expect(unbind).toHaveBeenCalled();
      expect(click).not.toHaveBeenTriggered();
      expect(toggleDisplayedButton).toHaveBeenCalled();
      expect(restartGame).toHaveBeenCalled();
    });
  });

  describe ("Test visualWhenGameOver function", function() {
    var winMessage;
    var tieMessage;
    var visualAfterGameOver;

    beforeEach (function() {
      winMessage = spyOn(UI, "winMessage");
      tieMessage = spyOn(UI, "tieMessage");
      visualAfterGameOver = spyOn(UI, "visualAfterGameOver");
    });

    describe ("Message pops up when GameOver", function() {
      it ("Pops up for win and click event doesn't work,if the Game win.", function() {
        GameBoard.spots = ["X", "X", "X", "O", 5, "O", 7, 8, 9];
        UI.visualWhenGameOver("X");
        expect(winMessage).toHaveBeenCalled();
        expect(visualAfterGameOver).toHaveBeenCalled();
      });

      it ("Pops up for tie and click event doesn't work,if the Game tie.", function() {
        GameBoard.spots = ["X", "O", "X", "O", "X", "X", "O", "X", "O"];
        UI.visualWhenGameOver("X");
        expect(tieMessage).toHaveBeenCalled();
        expect(visualAfterGameOver).toHaveBeenCalled();
      });

      it ("Not Pops up any message and click event works,if the Game is not won or tied.", function() {
        GameBoard.spots = ["X", 2, 3, 4, 5, 6, 7, 8, 9];
        UI.visualWhenGameOver("X");
        expect(winMessage).not.toHaveBeenCalled();
        expect(tieMessage).not.toHaveBeenCalled();
        expect(visualAfterGameOver).not.toHaveBeenCalled();
      });
    });
  });

  describe ("Test startGame function", function() {
    var hideButton;
    var hideComputerMessage;
    var hideHumanMessage;
    var introGame;

    beforeEach(function () {
      hideButton = spyOn(UI, "hideButton");
      hideComputerMessage = spyOn(UI, "hideComputerMessage");
      hideHumanMessage = spyOn(UI, "hideHumanMessage");
      introGame = spyOn(Game, "introGame");
      setFixtures(' <button type="button" class = "btn-start">Start Game</button> ');
    });

    it ("after start button click call introGame", function() {
      UI.startGame();
      expect(hideComputerMessage).toHaveBeenCalled();
      expect(hideHumanMessage).toHaveBeenCalled();
      $(".btn-start").click();
      expect(introGame).toHaveBeenCalled();
    });
  });

  describe ("Test resetGame function", function() {
    it ("reset Gameabord and tr td", function() {
      GameBoard.spots = ["O", "X", 3, 4, 5, 6, 7, 8, 9];
      setFixtures(' <table> <tr> <td id = "0">O</td><td id = "1">X</td><td id = "2"></td></tr> </table>');
      UI.resetGame();
      expect($("tr td")).toBeEmpty();
      expect(GameBoard.spots).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });
  });

  describe ("Test newGame function", function() {
    it ("when new button click call resetGame() and introGame", function() {
      var introGame = spyOn(Game, "introGame");
      var resetGame = spyOn(UI, "resetGame");
      setFixtures(' <button type="button" class = "btn-new">New Game</button> ');
      UI.newGame();
      $(".btn-new").click();
      expect(introGame).toHaveBeenCalled();
      expect(resetGame).toHaveBeenCalled();
    });

    it ("unbind new button and td after clicked new button", function() {
      var buttonclick = spyOnEvent('.btn-new', 'click');
      var spotclick = spyOnEvent('tr td', 'click');
      UI.newGame();
      $(".btn-new").click();
      expect(buttonclick).not.toHaveBeenTriggered();
      expect(spotclick).not.toHaveBeenTriggered();
    });
  });

  describe ("Test restartGame function", function() {
    it ("when restart button click call resetGame() and introGame", function() {
      var introGame = spyOn(Game, "introGame");
      var resetGame = spyOn(UI, "resetGame");
      setFixtures(' <button type="button" class = "btn-restart">Restart Game</button> ');
      UI.restartGame();
      $(".btn-restart").click();
      expect(introGame).toHaveBeenCalled();
      expect(resetGame).toHaveBeenCalled();
    });
  });
});
