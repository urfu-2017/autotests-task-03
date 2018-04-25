const createGame = () =>  {
    const button = document.querySelector('.button');
    button.addEventListener('click', () => {
        game = Game();
        const board = document.querySelector('.board');
        board.innerHTML = '';
        for(let i = 0; i < 9; i++) {
            const div = document.createElement('div');
            div.classList.add('cell');
            div.addEventListener('click', function cellClick() {
                div.style.opacity = 1;
                let mark = game.getMark()
                div.innerHTML = mark;
                game.acceptUserMove(Math.floor(i / 3), i % 3);
                if(game.findWinner()) {
                    const winner = mark === 'x'? "крестики" : "нолики";
                    board.innerHTML = `${winner}`;
                };

                div.removeEventListener('click', cellClick);
            });
            board.appendChild(div);
        }
    })
    const e = new Event('click');
    button.dispatchEvent(e);
}


document.addEventListener('DOMContentLoaded', () => {
    createGame();
});
