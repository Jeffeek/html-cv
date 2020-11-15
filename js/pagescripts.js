//ищем нужное меню
let menu = document.getElementById('drop-down-test');
//находим ноду "головы"
let head =  menu.getElementsByTagName('div')[0];
//находим лист всех элементов в списке
let list = menu.getElementsByTagName('div')[1];
//находим стрелочку управления
let arrow = head.getElementsByTagName('span')[1];

//событие на клик по стрелочке
arrow.onclick = function()
{
    //тогглим скрытие/раскрытие списка
    list.classList.toggle('hide');
    //тогглим саму стрелочку
    arrow.classList.toggle('open');
};