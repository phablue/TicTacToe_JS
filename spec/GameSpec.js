describe ("Test Game", function() {
  describe ("Test winner function", function() {
    var thePlayer;

    it ("Player1 if current player is 'X'", function() {
      currentPlayer = "X"
      thePlayer = Game.winner(currentPlayer);
      expect(thePlayer).toBe("Player");
    });

    it ("Player1 if current player is 'X'", function() {
      currentPlayer = "O"
      thePlayer = Game.winner(currentPlayer);
      expect(thePlayer).toBe("Computer");
    });
  });

  describe ("Teste firstMove function", function() {
    var input;
    var visualAfterChoice;

    beforeEach(function() {
      Game.currentPlayer = "";
      visualAfterChoice = spyOn(UI, "visualAfterChoice");
    })

    it ("If input is null return true", function() {
      var askFirstMove = spyOn(UI, "askFirstMove").and.returnValue(null);
      input = askFirstMove;
      expect(Game.firstMove()).toBeTruthy();
    })

    it ("If input is '' return true", function() {
      var askFirstMove = spyOn(UI, "askFirstMove").and.returnValue("");
      input = askFirstMove;
      expect(Game.firstMove()).toBeTruthy();
    })

    it ("If input is 'y', will call visualAfterChoice() and will change current player", function() {
      var askFirstMove = spyOn(UI, "askFirstMove").and.returnValue("y");
      input = askFirstMove;
      Game.firstMove();
      expect(visualAfterChoice).toHaveBeenCalled();
      expect(Game.goFirst).toBe("y");
    })

    it ("If input is 'n', will call visualAfterChoice() and will change current player", function() {
      var askFirstMove = spyOn(UI, "askFirstMove").and.returnValue("n");
      input = askFirstMove;
      Game.firstMove();
      expect(visualAfterChoice).toHaveBeenCalled();
      expect(Game.goFirst).toBe("n");
    })
  });

  describe ("Test checkGameOver function", function() {
    var visualWhenGameOver;

    beforeEach (function() {
      visualWhenGameOver = spyOn(UI, "visualWhenGameOver");
    });

    describe ("Call UI message functions", function() {
      it ("call visualWhenGameOver function, if the Game win.", function() {
        GameBoard.spots = ["X", "X", "X", "O", 5, "O", 7, 8, 9];
        Game.checkGameOver("X");
        expect(visualWhenGameOver).toHaveBeenCalled();
      });

      it ("call visualWhenGameOver function, if the Game tie.", function() {
        GameBoard.spots = ["X", "O", "X", "O", "X", "X", "O", "X", "O"];
        Game.checkGameOver("X");
        expect(visualWhenGameOver).toHaveBeenCalled();
      });

      it ("return true, if the Game win.", function() {
        GameBoard.spots = ["X", 2, "X", "O", "O", "O", "X", 8, 9];
        expect(Game.checkGameOver("O")).toBeTruthy();
      });

      it ("return true, if the Game tie.", function() {
        GameBoard.spots = ["X", "O", "X", "O", "X", "X", "O", "X", "O"];
        expect(Game.checkGameOver("X")).toBeTruthy();
      });

      it ("return false,if the Game is not won or tied.", function() {
        GameBoard.spots = ["X", 2, 3, 4, 5, 6, 7, 8, 9];
        expect(Game.checkGameOver("X")).toBeFalsy();
      });
    });
  });

  describe ("Test humanPlay function", function() {
    var showHumanMessage;
    var hideHumanMessage;
    var computerPlay;
    var click;

    beforeEach(function() {
      GameBoard.spots = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      showHumanMessage = spyOn(UI, "showHumanMessage");
      hideHumanMessage = spyOn(UI, "hideHumanMessage");
      computerPlay = spyOn(Game, "computerPlay");
      click = spyOnEvent('tr td', 'click');
      setFixtures(' <h1 id = "Human">Click a spot you want.</h1> \
                    <table> <tr> \
                      <td id = "0"></td> \
                      <td id = "1">X</td> \
                      <td id = "2"></td> \
                    </tr>  </table>');
    });

    it ("Shows message for human player after humanPlay running", function() {
      Game.humanPlay(Game.computerPlay);
      expect(showHumanMessage).toHaveBeenCalled();
    });

    it ("cant click and hide human message after human choice a spot", function() {
      Game.humanPlay(Game.computerPlay);
      $("#0").click();
      expect($("#0")).toHaveText("X");
      expect(click).not.toHaveBeenTriggered();
      expect(hideHumanMessage).toHaveBeenCalled();
    })

    it ("call computerPlay if not game over", function() {
      Game.humanPlay(Game.computerPlay);
      $("#0").click();
      expect(computerPlay).toHaveBeenCalledWith(Game.play);
    })

    it ("tr td stop to click if game over", function() {
      setFixtures('<table> <td id = "0">X</td></table>');
      Game.humanPlay(Game.computerPlay);
      $("#2").click();
      expect($("tr td")).not.toHaveBeenTriggered();
      expect(computerPlay).not.toHaveBeenCalledWith(Game.play);
    })
  })

  describe ("Test computerPlay function", function() {
    var humanPlay;
    var showComputerMessage;

    beforeEach(function() {
      showComputerMessage = spyOnEvent("#Computer", "show");
      humanPlay = spyOn(Game, "humanPlay");
      setFixtures(' <h1 id = "Computer">Please wait until computer choice..</h1> \
                    <table> <tr> \
                      <td id = "0"></td> \
                      <td id = "1">X</td> \
                      <td id = "2"></td> \
                    </tr>  </table>');
    });

    it ("call humanPlay if not game over", function() {
      Game.computerPlay(Game.humanPlay);
      expect(humanPlay).toHaveBeenCalledWith(Game.play);
    });

    it ("tr td stop to click if game over", function() {
      setFixtures('<table> <td id = "0">X</td> <td id = "2">X</td></tr> </table>');
      Game.computerPlay(Game.humanPlay);
      expect(humanPlay).not.toHaveBeenCalledWith(Game.play);
    })
  });

  describe ("Test introGame function", function() {
    var firstMove;
    var newGame;
    var play;

    it ("Call other function", function() {
      firstMove = spyOn(Game, "firstMove");
      newGame = spyOn(Game, "newGame");
      Game.introGame();
      expect(firstMove).toHaveBeenCalled();
      expect(newGame).toHaveBeenCalled();
    });

    it ("if goFirst is true return", function() {
      play = spyOn(Game, "play");
      firstMove = spyOn(Game, "firstMove").and.returnValue(true);
      Game.introGame();
      expect(play).not.toHaveBeenCalled();
    });

    it ("if goFirst is not true call play", function() {
      firstMove = spyOn(Game, "firstMove").and.returnValue("");
      play = spyOn(Game, "play");
      Game.introGame();
      expect(play).toHaveBeenCalled();
    });
  });

  describe ("Test play function", function() {
    var humanPlay;
    var computerPlay;

    beforeEach(function() {
      humanPlay = spyOn(Game, "humanPlay");
      computerPlay = spyOn(Game, "computerPlay");
    });

    it ("call humanplay if goFirst is 'y'", function() {
      Game.goFirst = "y";
      Game.play();
      expect(humanPlay).toHaveBeenCalled();
    });

    it ("call computerPlay if goFirst is 'n'", function() {
      Game.goFirst = "n";
      Game.play();
      expect(computerPlay).toHaveBeenCalled();
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
      Game.startGame();
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
      Game.resetGame();
      expect($("tr td")).toBeEmpty();
      expect(GameBoard.spots).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });
  });

  describe ("Test newGame function", function() {
    it ("when new button click call resetGame() and introGame", function() {
      var introGame = spyOn(Game, "introGame");
      var resetGame = spyOn(Game, "resetGame");
      setFixtures(' <button type="button" class = "btn-new">New Game</button> ');
      Game.newGame();
      $(".btn-new").click();
      expect(introGame).toHaveBeenCalled();
      expect(resetGame).toHaveBeenCalled();
    });

    it ("unbind new button and td after clicked new button", function() {
      var buttonclick = spyOnEvent('.btn-new', 'click');
      var spotclick = spyOnEvent('tr td', 'click');
      Game.newGame();
      $(".btn-new").click();
      expect(buttonclick).not.toHaveBeenTriggered();
      expect(spotclick).not.toHaveBeenTriggered();
    });
  });

  describe ("Test restartGame function", function() {
    it ("when restart button click call resetGame() and introGame", function() {
      var introGame = spyOn(Game, "introGame");
      var resetGame = spyOn(Game, "resetGame");
      setFixtures(' <button type="button" class = "btn-restart">Restart Game</button> ');
      Game.restartGame();
      $(".btn-restart").click();
      expect(introGame).toHaveBeenCalled();
      expect(resetGame).toHaveBeenCalled();
    });
  });
});
