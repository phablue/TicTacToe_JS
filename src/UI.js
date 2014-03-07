(function() {
  var UI = {
    spotErrorMessage: function() {
      alert("That is not an available spot.\nPlease choose a different spot.");
    },

    winMessage: function() {
      alert("Congratulations.\nYou win!!");
    },

    tieMessage: function() {
      alert("Game is tied.\nGame Over.");
    },

    inputErrorMessage: function() {
      alert("You have to choose 'y' or 'n'.");
    },

    askGoFirst: function() {
      return prompt("Do you require the first move? (y/n):");
    }
  };
  window.UI = UI;
})();