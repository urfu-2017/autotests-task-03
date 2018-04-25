
const pickIcon = e => {
    e.preventDefault();
    e.target.previousSibling.checked = true;
    const picture = e.target.cloneNode('deep');
    const player = e.target.parentElement.parentElement.parentElement;
    const mark = player.getElementsByClassName('mark')[0];
    mark.innerHTML = '';
    mark.appendChild(picture);
    
    const allLabels = document.getElementsByClassName('picker__label');
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
    
    createNewGame();
};

const upgradeInterface = () => {    
    const pickers = document.getElementsByClassName('picker');
    Array.prototype.slice.call(pickers).forEach(picker => picker.innerHTML = '');
    
    for (let i = 1; i <= 7; ++i) {
        const icon = document.createElement('label');
        icon.setAttribute('class', `picker__label label${i}`);
        
        const img = document.createElement('img');
        img.setAttribute('src', `./pictures/${i}.svg`);
        img.setAttribute('class', 'picker__img');
        img.setAttribute('value', i);
        
        const input = document.createElement('input');
        input.setAttribute('type', 'radio');
        input.setAttribute('value', i);
        input.setAttribute('class', 'picker__input');
        
        icon.appendChild(input);
        icon.appendChild(img);
        
        const icon2 = icon.cloneNode('deep');
        
        icon.children[0].setAttribute('name', 'player1');
        pickers[0].appendChild(icon);
        
        icon2.children[0].setAttribute('name', 'player2');
        pickers[1].appendChild(icon2);
        
        icon.children[1].onclick = pickIcon;
        icon2.children[1].onclick = pickIcon;
    };
    
    const event = new Event('click');
    document.getElementsByClassName('label1')[0].children[1].dispatchEvent(event);
    document.getElementsByClassName('label2')[1].children[1].dispatchEvent(event);
};
