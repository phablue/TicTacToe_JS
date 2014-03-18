describe ("Test UI", function () {
  describe ("Test Computer Message", function() {
    beforeEach (function() {
      setFixtures(' <h1 id = "Computer">Please wait until computer choice..</h1>');
    });

    it ("Hides computer message", function() {
        UI.hideComputerMessage();
        expect($("#Computer")).toBeHidden();
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
});