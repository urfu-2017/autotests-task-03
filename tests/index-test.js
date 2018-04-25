const button = document.getElementById('new');

function fillField(fields){
    for (var i=0; i<fields.length; i+=2){
        var x = playingField.rows.item(fields[i]).cells;
        x[fields[i+1]].click();
    }
}


describe('cross-zero', () => {
	beforeEach(() => {
        button.click();
    });
    var config = [
        //проверка на победу
        { sequence: [0,0, 1,0, 0,1, 1,1, 0,2], result: "Первый игрок победил" },
        { sequence: [2,2, 0,2, 1,2, 1,1, 2,1, 2,0], result: "Второй игрок победил" },
        //проверка ничьи
        { sequence: [0,0, 0,1, 0,2, 2,0, 2,1, 2,2, 1,0, 1,1, 1,2], result: "Ничья" },
        //проверка передачи хода кликом по уже занятым клеткам
        { sequence: [0,0, 0,1, 0,0, 1,1, 0,2, 0,0, 0,1, 2,2], result: "Первый игрок победил" },
        //игра еще идет
        { sequence: [0,0], result: "Сделайте ход" },
    ];
    config.forEach((_case) => {
        it(`should be: '${_case.result}${`' for sequence: ${_case.sequence}`}`, () => {
            fillField(_case.sequence);
            chai.assert.equal(result.innerHTML, _case.result);
        });
    });
});