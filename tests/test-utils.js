function waitIFrameLoad(doneCallback) {
    let iFrame = getTestedIFrame();

    if (!iFrame) {
        setTimeout(waitIFrameLoad, 1000);
    } else if (iFrame.contentDocument.readyState !== 'complete') {
        iFrame.contentWindow.addEventListener('load', () => doneCallback());
    } else {
        doneCallback();
    }
}

function restart() {
    getTestedIFrame().contentWindow.replay();
}

function getTestedIFrame() {
    return document.getElementById('tested-content');
}

function movesToFieldString(moves) {
    let field = '_'.repeat(9).split('');

    moves.forEach((move, order) => {
        field[3 * move[0] + move[1]] = order % 2 ? 'o' : 'x';
    });

    return field.join('');
}

function clickTo(row, column) {
    getTestedIFrame().contentDocument
        .getElementsByTagName('tr')[row]
        .getElementsByTagName('td')[column]
        .click();
}

function getFinalStatus() {
    return getTestedIFrame().contentDocument
        .getElementById('final-status')
        .getAttribute('value');
}
