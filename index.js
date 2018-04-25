// Реализуй логику выбора победителя в этом файле

const X = 'x'
const O = 'o'
const playingField = document.getElementById('playing-field')
const winnerTable = document.getElementById('winner')
const cellCache = []


function getCell(row, col) {
    const id = row + '-' + col
    const cached = cellCache[id]
    if (cached) {
        return cached
    }

    const elem = document.getElementById(id)
    if (!elem) {
        throw Error('Cell ' + id + ' not found, there is only 3x3 field')
    }
    return cellCache[id] = elem
}

function markCell(cell, val) {
    if (val !== X && val !== O) {
        throw Error('Only ' + X + ' or ' + Y + ' is valid cell value')
    }
    cell.firstChild.setAttribute('value', val)
}

function cellValue(cell) {
    return cell.firstChild.value.trim()
}

function getCellValue(row, col) {
    return cellValue(getCell(row, col))
}

function getCells() {
    return new Array(...document.getElementsByClassName('cell'))
}


function isWinnableStep(affectedCell, player) {
    const [row, col] = affectedCell.id.split('-').map(i => parseInt(i))

    const markBelongsToPlayer = mark => mark === player

    const line = [1, 2, 3]
    const mainDiag = [[1, 1], [2, 2], [3, 3]]
    const subDiag = [[3, 1], [2, 2], [1, 3]]

    const winRow = line
            .map(i => getCellValue(row, i))
            .every(markBelongsToPlayer)
    
    const winCol = line
            .map(i => getCellValue(i, col))
            .every(markBelongsToPlayer)

    const mainDiagWin = row === col && mainDiag
            .map(pair => getCellValue(...pair))
            .every(markBelongsToPlayer)

    const subDiagWin = row === 4 - col && subDiag
            .map(pair => getCellValue(...pair))
            .every(markBelongsToPlayer)

    const winDiag = mainDiagWin || subDiagWin

    const winPaths = []

    if (winRow)
        winPaths.push(line.map(i => getCell(row, i)))

    if (winCol)
        winPaths.push(line.map(i => getCell(i, col)))

    if (mainDiagWin)
        winPaths.push(mainDiag.map(pair => getCell(...pair)))

    if (subDiagWin)
        winPaths.push(subDiag.map(pair => getCell(...pair)))

    return {
        isWin: winPaths.length > 0,
        winPaths: winPaths
    }
}


function isFieldFilled() {
    return getCells().every(cellValue)
}


let currentPlayer = X
playingField.setAttribute('current-player', currentPlayer)


function doTurn(chosenCell) {
    const turnResult = {
        winner: '',
        somethingHappens: false
    }

    if (!cellValue(chosenCell)) {
        turnResult.somethingHappens = true
        markCell(chosenCell, currentPlayer)
        const {isWin, winPaths} = isWinnableStep(chosenCell, currentPlayer)

        if (isWin) {
            turnResult.winner = currentPlayer
            turnResult.winPaths = winPaths
        } else if (isFieldFilled()) {
            turnResult.winner = 'draw'
        }

        currentPlayer = currentPlayer === X ? O : X
    }

    turnResult.nextPlayer = currentPlayer
    return turnResult
}

function praiseWinner({winner, winPaths}) {
    winnerTable.setAttribute('name', winner)
    playingField.removeEventListener('click', clickCb)
    playingField.addEventListener('click', wipe)
}


function processUserAction(cellTarget) {

    if (!cellTarget 
        || !cellTarget.getAttribute 
        || cellTarget.getAttribute('class') !== 'cell')
        throw Error("User choose not a Cell")

    const turnResult = doTurn(cellTarget)

    if (turnResult.winner) {
        praiseWinner(turnResult)
    }

    playingField.setAttribute('current-player', turnResult.nextPlayer)
    return turnResult
}


function wipe() {
    currentPlayer = X
    playingField.setAttribute('current-player', currentPlayer)
    winnerTable.removeAttribute('name')
    getCells().forEach(cell => cell.firstChild.removeAttribute('value'))

    playingField.removeEventListener('click', clickCb)
    playingField.removeEventListener('click', wipe)
    playingField.addEventListener('click', clickCb)
}

function clickCb(event) {
    if (event.target.getAttribute('class') !== 'cell') {
        return
    }
    processUserAction(event.target)
}

playingField.addEventListener('click', clickCb)
