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
    it('should sum digits', () => chai.assert(1 + 1, 2));
    it('should say first player win', () => {
        fillField(new Array(0,0,2,0,0,1,1,1,0,2));//победитель в строке
        chai.assert.equal(result.innerHTML, "Первый игрок победил");
    });
    it('should say second player win', () => {
        fillField(new Array(0,0,0,2,1,1,1,2,2,0,2,2));//победитель в столбце
        chai.assert.equal(result.innerHTML, "Второй игрок победил");
    });
    it('should sum digits', () => chai.assert(1 + 1, 2));
    it('should say first player win', () => {
        fillField(new Array(0,2,2,2,1,1,1,0,2,0));//победитель в побочной диагонали
        chai.assert.equal(result.innerHTML, "Первый игрок победил");
    });
    it('should say second player win', () => {
        fillField(new Array(1,0,0,0,0,1,1,1,2,1,2,2));//победитель в главной диагонали
        chai.assert.equal(result.innerHTML, "Второй игрок победил");
    });
    it('should say no winner', () => {
        fillField(new Array(0,0,0,1,0,2,2,2,2,1,2,0,1,0,1,1,1,2)    );
        chai.assert.equal(result.innerHTML, "Ничья");
    });
    it ('should not write result in new game',() => {
        chai.assert.equal(result.innerHTML, "Сделайте ход");
    });
});
