describe('cross-zero', () => {
    const playingField = document.getElementById('playing-field');

    it('Первым ходит крестик', () => {
        chai.assert(playingField.className === 'current_x');
    });

    it('Вторым ходит нолик', () => {
        document.getElementById('td-0-0').click();

        chai.assert(playingField.className === 'current_o');
    });

    [
        ['xxx|oo_|___', 'x'],
        ['xo_|xo_|x__', 'x'],
        ['xo_|ox_|__x', 'x'],
        ['ooo|xx_|x__', 'o'],
        ['ox_|ox_|o_x', 'o'],
        ['ox_|xo_|x_o', 'o'],
        ['oxx|xoo|xox', '-'],
        ['xox|xox|oxo', '-'],
    ].forEach(test => {
        it(`Итог игры: ${test[1]}, если поле == ${test[0]}`, () => {
            const field = test[0].split('|').map(line => line.split(''));

            field.map((line, i) => line.map((cell, j) => {
                if (cell !== '_') {
                    document.getElementById(`${i}-${j}`).setAttribute('value', cell);
                }
            }));

            getStatePlay();

            chai.assert(winner === test[1]);
        })
    });

    afterEach(() => document.getElementById('play-again').click());
});
