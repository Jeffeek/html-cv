let menuElem = document.getElementById('sweeties');
let titleElem = menuElem.querySelector('.title');

titleElem.onclick = function()
{
    menuElem.classList.toggle('open');
};