const push = (x, y) => 
document.getElementById(`${x}-${y}`).parentNode.click(); 
const cliclOnButton = document.getElementById("refresh");
describe('cross-first', () => { 
    // Этот тест можно уалить, он нужен для проверки сборки 
    it('should sum digits', () => chai.assert(1 + 1, 2)); 
    cliclOnButton.click();
    it('row win x, should alert x wins', () => { 
        cliclOnButton.click();
        push(0, 0); 
        push(1, 0); 
        push(0, 1); 
        push(1, 1); 
        push(0, 2); 
        const actual = counter(); 
        chai.expect(actual).to.equal(1);
        cliclOnButton.click();
    }); 
    it('zigzag win x, should alert x wins', () => { 
        cliclOnButton.click(); 
        push(0, 0); 
        push(1, 0); 
        push(1, 1); 
        push(2, 0); 
        push(2, 2); 
        const actual = counter(); 
        chai.expect(actual).to.equal(1);
        cliclOnButton.click(); 
    }); 
    it('column win x, should alert x wins', () => { 
        cliclOnButton.click();
        push(0, 0); 
        push(0, 1); 
        push(1, 0); 
        push(1, 1); 
        push(2, 0); 
        const actual = counter(); 
        chai.expect(actual).to.equal(1);
        cliclOnButton.click(); 
    }); 
    it('-zigzag win x, should alert x wins', () => { 
        cliclOnButton.click(); 
        push(0, 2); 
        push(0, 1); 
        push(1, 1); 
        push(2, 1); 
        push(2, 0); 
        const actual = counter(); 
        chai.expect(actual).to.equal(1);
        cliclOnButton.click();
    });
    it('x win, if did double click on element', () => { 
        cliclOnButton.click();
        push(0, 2); 
        push(0, 2);
        push(0, 1); 
        push(0, 1); 
        push(1, 1); 
        push(1, 1); 
        push(2, 1); 
        push(2, 1); 
        push(2, 0); 
        const actual = counter(); 
        chai.expect(actual).to.equal(1);
        cliclOnButton.click(); 
    }); 
});
describe('cross-second', () => { 
    it('row win o, should alert o wins', () => { 
        cliclOnButton.click();
        push(0, 0); 
        push(1, 0); 
        push(0, 1); 
        push(1, 1); 
        push(2, 2); 
        push(1, 2); 
        const actual = counter(); 
        chai.expect(actual).to.equal(2);
        cliclOnButton.click();
    }); 
    it('zigzag win o, should alert o wins', () => { 
        cliclOnButton.click();
        push(0, 1); 
        push(0, 0); 
        push(1, 0); 
        push(1, 1); 
        push(2, 0); 
        push(2, 2); 
        const actual = counter(); 
        chai.expect(actual).to.equal(2);
        cliclOnButton.click(); 
    }); 
    it('column win o, should alert o wins', () => { 
        cliclOnButton.click(); 
        push(0, 1); 
        push(0, 0); 
        push(1, 1); 
        push(2, 0); 
        push(2, 2); 
        push(1, 0);
        const actual = counter(); 
        chai.expect(actual).to.equal(2);
        cliclOnButton.click();
    }); 
    it('-zigzag win o, should alert o wins', () => { 
        cliclOnButton.click();
        push(0, 1); 
        push(0, 2); 
        push(2, 1); 
        push(1, 1); 
        push(2, 2); 
        push(2, 0); 
        const actual = counter(); 
        chai.expect(actual).to.equal(2);
        cliclOnButton.click();
    }); 
});
describe('cross-third', () => { 
    it('no winers', () => { 
        cliclOnButton.click(); 
        push(0, 0); 
        push(0, 1); 
        push(1, 0); 
        push(1, 1); 
        push(2, 1); 
        push(2, 0);
        push(0, 2);
        push(1, 2);
        push(2, 2);
        const actual = counter(); 
        chai.expect(actual).to.equal(0);
        cliclOnButton.click(); 
    })
});
describe('check button clearGame', () => { 
    it('o win, when in the middle of the game press the restart button ', () => { 
        cliclOnButton.click();
        push(0, 2); 
        push(0, 1); 
        push(1, 1); 
        push(2, 1); 
        cliclOnButton.click();
        push(0, 1); 
        push(0, 2); 
        push(2, 1); 
        push(1, 1); 
        push(2, 2); 
        push(2, 0);
        const actual = counter(); 
        chai.expect(actual).to.equal(2);
        cliclOnButton.click();
    })
});