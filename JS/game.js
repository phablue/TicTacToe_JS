$(document).ready(function() {
	board = [1,2,3,4,5,6,7,8,9],
	available_spot = [],
	current_player = "X",
	win = false, 
	tie = false,
	rule4win = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [6,4,2]],
	$("td").click(function(e) {
		$("#" + e.target.id).text(current_player);
		board[e.target.id] = current_player;
		for ( n in this.wins) {
			var system = this.wins[n];
			var s = this.board[system[0]] + this.board[system[1]] + this.board[system[2]];
			win = (s == "XXX" || s == "OOO" ) ? true : false;
		}
		for (n in this.board) {
				if (typeof(n) === "number") {
					available_spot.push(n) 
					console.log(n);
					debugger
				}
		}
		console.log($("td").val(""));
		tie = (available_spot.length) ? false : true;
		if (win) {
			alert("Player"+ current_player + "win!!!");
		}
		else if(tie) {
			alert("Game is tie");
		}
		current_player = (current_player == "X") ? "O" : "X";
	});
});


