mocha.setup('bdd');
describe('cross-zero', () => {
	beforeEach(function() {
        document.getElementById("clear").click();
    });
  
    function clickCell(id) {
	    document.getElementById(id).parentNode.click();
    }
    function getResult(result) {
	    return '<span>' + result + '</span>'
    }

    it('should clear', () => {
		const cells = [
		    "0-0", "0-1", "0-2", 
		    "1-0", "1-1", "1-2", 
		    "2-0", "2-1", "2-2"
		];
		cells.forEach(clickCell);
		document.getElementById("clear").click();
		cells.forEach(id => chai.assert.equal(document.getElementById(id).value, ''));
	});
	
	it('should change turn after correct placing', () => {
		clickCell("0-0");
		clickCell("0-1");
		chai.assert.equal(document.getElementById("0-1").value, 'o');
	});
	
	it('should not change turn after incorrect placing', () => {
		clickCell("0-0");
		clickCell("0-0");
		clickCell("0-1");
		chai.assert.equal(document.getElementById("0-1").value, 'o');
	});
	
	it('should not show winner at start', () => {
		const winner = document.getElementById("winner");
		chai.assert.equal(winner.innerHTML, '');
	});
	it('should not show winner when there is no one during the game', () => {
		clickCell("0-1");
		clickCell("0-2");
		clickCell("0-0");
		clickCell("2-2");
		clickCell("1-2");
		const winner = document.getElementById("winner");
		chai.assert.equal(winner.innerHTML, '');
	});
	
	it('should not show winner when there is no one at the end', () => {
		clickCell("0-0");
		clickCell("0-1");
		clickCell("0-2");
		clickCell("1-1");
		clickCell("1-0");
		clickCell("1-2");
		clickCell("2-1");
		clickCell("2-0");
		clickCell("2-2");
		const winner = document.getElementById("winner");
		chai.assert.equal(winner.innerHTML, '');
	});
	
	it('should show winner right when there is one', () => {
		clickCell("0-0");
		clickCell("1-0");
		clickCell("0-1");
		clickCell("1-1");
		clickCell("0-2");
		const winner = document.getElementById("winner");
		chai.assert.isAtLeast(winner.innerHTML.length, 1);
	});
	
	it('should show winner in horizontal case', () => {
		clickCell("0-0");
		clickCell("1-0");
		clickCell("0-1");
		clickCell("1-1");
		clickCell("0-2");
		const winner = document.getElementById("winner");
		chai.assert.equal(winner.innerHTML, getResult('x'));
	});
	
	it('should show winner in vertical case', () => {
		clickCell("0-0");
		clickCell("0-1");
		clickCell("1-0");
		clickCell("1-1");
		clickCell("2-0");
		const winner = document.getElementById("winner");
		chai.assert.equal(winner.innerHTML, getResult('x'));
	});
	
	it('should show winner in diagonal case', () => {
		clickCell("0-0");
		clickCell("0-1");
		clickCell("1-1");
		clickCell("2-1");
		clickCell("2-2");
		const winner = document.getElementById("winner");
		chai.assert.equal(winner.innerHTML, getResult('x'));
	});
});
mocha.run();
