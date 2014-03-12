(function() {
  var UI = {
    showComputerMessage: function() {
      $("#Computer").show();
    },

    hideComputerMessage: function() {
      $("#Computer").hide();
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
      alert("You have to choose 'X' or 'O'.");
    },

    askChoicePlayer: function() {
      return prompt("What player do you require? ('X' or 'O'):");
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
