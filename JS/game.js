
board = [1,2,3,4,5,6,7,8,9];

mark: function(chosen_spot, current_player) {
	$("#" + chosen_spot).replaceWith(current_player);
	board[chosen_spot] = current_player;
}
next_player: function(current_player) {
	(current_player == "X") ? "O" : "X"
}

available_spots: function() {
	$("td:empty")
}

wins = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [6,4,2]];
gamerules: function() {
	win: function() {
		for ( n in this.wins) {
			var system = this.wins[n];
			var s = this.board[system[0]] + this.board[system[1]] + this.board[system[2]];
			if (s == "XXX" || s == "OOO" ) {
				return true;
			}
			else {
				return false
			}
		}
	}
	tie: function() {
		if (available_spots().length) {
			return false
		}
		else {
			return true
		}
	}
	game_over: function() {
		if (win() || tie()) {
			return true
		} 
		else {
			return false
		};
	}
}


