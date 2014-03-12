describe ("Test UI", function () {
  describe ("Test Computer Message", function() {
    beforeEach (function() {
      setFixtures(' <h1 id = "Computer">Please wait until computer choice..</h1> ');
    });

    it ("Shows computer message", function() {
        UI.showComputerMessage();
        expect($("#jasmine-fixtures #Computer")).toBeVisible();
    });

    it ("Hides computer message", function() {
        UI.hideComputerMessage();
        expect($("#jasmine-fixtures #Computer")).toBeHidden();
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
      expect(alert).toHaveBeenCalledWith("You have to choose 'X' or 'O'.");
    });
  });

  describe ("Test prompt events", function() {
    var prompt;
    var chooesnPlayer;
    it ("Pops up a message to ask about choosen player", function() {
      prompt = spyOn(window, "prompt").and.returnValue("X");
      chooesnPlayer = UI.askChoicePlayer();
      UI.askChoicePlayer();
      expect(prompt).toHaveBeenCalledWith("What player do you require? ('X' or 'O'):");
      expect(chooesnPlayer).toEqual("X");
    });
  });

  describe ("Test Displaing Button", function() {
    var unbind;
    beforeEach (function() {
      unbind = spyOn($.fn, "unbind");
      setFixtures(' <button type="button" class = "btn-start">Start Game</button> \
                              <button type="button" class = "btn-new">New Game</button> \
                              <button type="button" class = "btn-restart">Restart Game</button> \
                              <tr> \
                                <td id = "0">X</td> \
                                <td id = "1">O</td> \
                                <td id = "2">X</td> \
                              </tr> ');
    });

    it ("Hides start Button and unbind events, Show new Button", function() {
      UI.toggleDisplayedButton("#jasmine-fixtures .btn-start", "#jasmine-fixtures .btn-new");
      expect($("#jasmine-fixtures .btn-start")).toBeHidden();
      expect(unbind).toHaveBeenCalled();
      expect($("#jasmine-fixtures .btn-start")).not.toHandle("click");
      expect($("#jasmine-fixtures .btn-new")).toBeVisible();
    });

    it ("Hides restart and new Button", function() {
      UI.hideButton("#jasmine-fixtures .btn-restart", "#jasmine-fixtures .btn-new");
      expect($("#jasmine-fixtures .btn-new")).toBeHidden();
      expect($("#jasmine-fixtures .btn-restart")).toBeHidden();
    });
  });
});