// Реализуй логику выбора победителя в этом файле
function getWinner(lines) {
	for (var i = 0; i < 3; i++) {
		const line = lines[i];
		if (line[0].length && line.every(c => c === line[0]))
			return line[0];
	};
    for (var coloumnIndex = 0; coloumnIndex < 3; coloumnIndex++) {
        const firstCell = lines[0][coloumnIndex];
		for (var rowIndex = 0; rowIndex < 3; rowIndex++) {
            if (!firstCell.length || lines[rowIndex][coloumnIndex] !== firstCell)
				break;
			if (rowIndex === 2)
			    return firstCell;
		}
	}
	let firstDiag = [];
	let secondDiag = [];
	for (var i = 0; i < 3; i++) {
		firstDiag.push(lines[i][i]);
		secondDiag.push(lines[i][2 - i]);
	}
	if (firstDiag[0].length && firstDiag.every(c => c === firstDiag[0]))
		return firstDiag[0];
	if (secondDiag[0].length && secondDiag.every(c => c === secondDiag[0]))
		return secondDiag[0];
	return null;
}

function hasWinner(lines) {
    if (getWinner(lines) !== null) {
        return true;
    }
    const hiddenInputs = document.getElementsByTagName("input");
    for (var i = 0; i < hiddenInputs.length; i++) {
        if (hiddenInputs[i].value === "") {
            return false;
        }
    }
    return true;
}