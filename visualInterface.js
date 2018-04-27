const pickIcon = e => {
    const icon = e.target;

    // Выбираем радиокнопку с лейблом
    icon.previousSibling.checked = true;

    // Вставляем ее на место "сейчас выбрано"
    const picture = icon.cloneNode('deep');
    picture.classList.add('picked-img')
    const player = icon.parentElement.parentElement.parentElement;
    const mark = player.getElementsByClassName('mark')[0];
    mark.innerHTML = '';
    mark.appendChild(picture);
    
    // Пересчитываем все радиокнопки и добавляем классы невидимости
    const allLabels = document.querySelectorAll('.picker__label');
    for (let i = 0; i < 7; ++i) {
        const label1 = allLabels[i];
        const label2 = allLabels[i + 7];
        label1.classList.remove('picker__label_hidden');
        label2.classList.remove('picker__label_hidden');
        if (label1.children[0].checked || label2.children[0].checked) {
            label1.classList.add('picker__label_hidden');
            label2.classList.add('picker__label_hidden');
        };
    };
    
    // Создаем новую игру, чтобы избежат коллизий
    createNewGame();
};

const upgradeInterface = () => {
    // Чистим колонки для вставки элементов
    const pickers = document.querySelectorAll('.picker');
    Array.prototype.slice.call(pickers).forEach(picker => picker.innerHTML = '');
    
    // Создаем лейблы и вставляем их в колонки
    for (let i = 1; i <= 7; ++i) {
        const icon1 = create('label');
        icon1.classList.add('picker__label', `label${i}`);
        
        const input = create('input', {
            'type': 'radio',
            'value': i,
            'class': 'picker__input'
        });
        icon1.appendChild(input);
        
        const img = create('img', {
            'src': `./pictures/${i}.svg`,
            'class': 'picker__img',
            'value': i
        });
        icon1.appendChild(img);

        icon1.children[0].setAttribute('name', 'player1');
        icon1.children[1].addEventListener('click', pickIcon);
        pickers[0].appendChild(icon1);
        
        const icon2 = icon1.cloneNode('deep');
        icon2.children[0].setAttribute('name', 'player2');
        pickers[1].appendChild(icon2);
        icon2.children[1].addEventListener('click', pickIcon);
    };
    
    // Кликаем по первой иконке в колонке 1 и по второй в колонке 2
    const event = new Event('click');
    document.querySelectorAll('.label1')[0].children[1].dispatchEvent(event);
    document.querySelectorAll('.label2')[1].children[1].dispatchEvent(event);
};

document.addEventListener('DOMContentLoaded', () => {
    upgradeInterface();
    document.querySelector('.setting__new-game').addEventListener('click', createNewGame);
});
