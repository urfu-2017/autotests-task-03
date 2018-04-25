// Реализуй логику выбора победителя в этом файле
const isWinnerArray = array => array.every(elem => elem !== '' && elem === array[0]);

const isWinner = board => {
    let result = board.some(row => isWinnerArray(row));
    result = result || board.some((elem, i) => {
        return isWinnerArray([board[0][i], board[1][i], board[2][i]]);
    });
    result = result || isWinnerArray([board[0][0], board[1][1], board[2][2]]);
    return result || isWinnerArray([board[0][2], board[1][1],board[2][0]]);
}