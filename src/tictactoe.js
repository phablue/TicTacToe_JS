board = [1, 2, 3, 4, 5, 6, 7, 8, 9];
current_player = "X";

function change_player(current_player) {
  return current_player = (current_player == "X" ? "O" : "X");
}

function mark_chosen_spot(e) {
  var chosen_spot
  if (e == null) {
    chosen_spot = event.srcElement.id;
  }
  else {
    chosen_spot = e.target.id;
  }
  document.getElementById(chosen_spot).innerHTML = current_player;
  board[chosen_spot] = current_player;
  change_player(current_player);
}

function valid_spots(board) {
  var available_spots = [];
  for (spot in board) {
    if (typeof(board[spot]) === "number") {
      available_spots.push(board[spot]);
    }
  }
  return available_spots;
}

function game_over(board) {
  return game_win(board) || game_tie(board);
}

function game_win(board) {
  var rules_of_win = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];
  for (r in rules_of_win) {
    var rule = rules_of_win[r];
    var state = this.board[rule[0]] + this.board[rule[1]] + this.board[rule[2]];
    if (state == "XXX" || state == "OOO") {
      return true;
    }
  }
  return false;
}

function game_tie(board) {
  return tie = ((valid_spots(board).length) ? false : true);
}

function game(board) {
  game_continue = true;
  while (game_continue) {
    document.onclick = mark_chosen_spot;
    if (game_over(board)) {
      break;
    }
    document.onclick = mark_chosen_spot;
    if (game_over(board)) {
      break;
    }
  }
}
