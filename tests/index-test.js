function clickTable(num) {
    let cell = document.getElementsByTagName('td');
    cell[num-1].click();
}

describe('tic tac toe', () => {
    [
        {
            win: 'Крестики',
            winningSlogan: 'Победили крестики',
            cells: [1,3,4,6,7],
        },
        {
            win: 'Нолики',
            winningSlogan: 'Победили нолики',
            cells: [4,7,5,8,1,9]
        },
        {
            win: 'Крестики',
            winningSlogan: 'Победили крестики',
            cells: [7,4,5,2,3],
        },
        {
            win: 'Нолики',
            winningSlogan: 'Победили нолики',
            cells: [4,1,7,5,8,9]
        },
        {
            win: 'Ничья',
            winningSlogan: 'Ничья',
            cells: [4,1,7,8,5,3,2,6,9]
        }
    ].forEach(element => {
        it(`should print winner ${element.win} for ${element.cells}`, () => {
            element.cells.forEach(cell => {
                clickTable(cell);
            });
            let winner = document.querySelector('.winner__p').innerText;
            console.log(winner);
            document.querySelector('.button-wrapper__button').click();
            chai.assert.equal(element.winningSlogan, winner)
        });
    });
});
