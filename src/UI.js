(function() {
  var UI = {
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

    ClickButton: function(button, callback) {
      $(button).click(function(e) {
        if (button == ".btn-new") {
          UI.unbindClick(".btn-new");
          UI.unbindClick("tr td");
          Game.resetGame();
        }
        else if (button == ".btn-restart") {
          Game.resetGame();
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
    }
  };
  window.UI = UI;
})();
