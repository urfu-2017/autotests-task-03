// Реализуй логику выбора победителя в этом файле
function getWinner(lines) {
	let winner = null;
	for (var i = 0; i < 3; i += 1) {
		const l = lines[i];
		if (l[0].length && l.every(c => c === l[0]))
			return l[0];
	};
	var columnIdx = 0;
	while (columnIdx < 3) {
		const upperCellPlayer = lines[0][columnIdx];
		for (var rowIdx = 0; rowIdx < 3; rowIdx += 1) {
			if (!upperCellPlayer.length || lines[rowIdx][columnIdx] != upperCellPlayer)
				break;
			if (rowIdx == 2)
			    return upperCellPlayer;
		}
		columnIdx += 1;
	}
	let firstDiag = [];
	let secondDiag = [];
	for (var i = 0; i < 3; i += 1) {
		firstDiag.push(lines[i][i]);
		secondDiag.push(lines[i][2 - i]);
	}
	if (firstDiag[0].length && firstDiag.every(c => c === firstDiag[0]))
		return firstDiag[0];
	if (secondDiag[0].length && secondDiag.every(c => c === secondDiag[0]))
		return secondDiag[0];
	return null;
}