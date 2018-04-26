const push = (x, y) => 
document.getElementById(`${x}-${y}`).parentNode.click(); 

describe('cross-first', () => { 
    // Этот тест можно уалить, он нужен для проверки сборки 
    it('should sum digits', () => chai.assert(1 + 1, 2)); 
    cleargame(); 
    it('row win x, should alert x wins', () => { 
        cleargame(); 
        push(0, 0); 
        push(1, 0); 
        push(0, 1); 
        push(1, 1); 
        push(0, 2); 
        const actual = counter(); 
        chai.expect(actual).to.equal(1);
        cleargame(); 
    }); 
    it('zigzag win x, should alert x wins', () => { 
        cleargame(); 
        push(0, 0); 
        push(1, 0); 
        push(1, 1); 
        push(2, 0); 
        push(2, 2); 
        const actual = counter(); 
        chai.expect(actual).to.equal(1);
        cleargame(); 
    }); 
    it('column win x, should alert x wins', () => { 
        cleargame(); 
        push(0, 0); 
        push(0, 1); 
        push(1, 0); 
        push(1, 1); 
        push(2, 0); 
        const actual = counter(); 
        chai.expect(actual).to.equal(1);
        cleargame(); 
    }); 
    it('-zigzag win x, should alert x wins', () => { 
        cleargame(); 
        push(0, 2); 
        push(0, 1); 
        push(1, 1); 
        push(2, 1); 
        push(2, 0); 
        const actual = counter(); 
        chai.expect(actual).to.equal(1);
        cleargame(); 
    });
    
});
describe('cross-second', () => { 
    it('row win o, should alert o wins', () => { 
        cleargame(); 
        push(0, 0); 
        push(1, 0); 
        push(0, 1); 
        push(1, 1); 
        push(2, 2); 
        push(1, 2); 
        const actual = counter(); 
        chai.expect(actual).to.equal(2);
        cleargame(); 
    }); 
    it('zigzag win o, should alert o wins', () => { 
        cleargame(); 
        push(0, 1); 
        push(0, 0); 
        push(1, 0); 
        push(1, 1); 
        push(2, 0); 
        push(2, 2); 
        const actual = counter(); 
        chai.expect(actual).to.equal(2);
        cleargame(); 
    }); 
    it('column win o, should alert o wins', () => { 
        cleargame(); 
        push(0, 1); 
        push(0, 0); 
        push(1, 1); 
        push(2, 0); 
        push(2, 2); 
        push(1, 0);
        const actual = counter(); 
        chai.expect(actual).to.equal(2);
        cleargame(); 
    }); 
    it('-zigzag win o, should alert o wins', () => { 
        cleargame(); 
        push(0, 1); 
        push(0, 2); 
        push(2, 1); 
        push(1, 1); 
        push(2, 2); 
        push(2, 0); 
        const actual = counter(); 
        chai.expect(actual).to.equal(2);
        cleargame(); 
    }); 
});
describe('cross-third', () => { 
    it('no winers', () => { 
        cleargame(); 
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
        cleargame(); 
    }); 
});