
(function loadSectionsScript()
{
    let sections = document.getElementsByClassName('section');
    for (let i = 0; i < sections.length; i++)
    {
        bindArrows(sections[i]);
    }
})();

function bindArrows(section)
{
    let list = section.children.item(0).children.item(1);
    let arrow = section.children.item(0).children.item(0).children.item(1);
    section.children.item(0).children.item(0).onclick = function(event)
    {
        list.classList.toggle('hide');
        arrow.classList.toggle('open');
    }  
}

(function bindSendButton()
{
    let date = new Date();
    let btn = document.getElementById('btnSend');
    let message = `mailto:ilyushin_misha@mail.ru?subject=Приглашение на собеседование&body=Уважаемый Mikhail Ilyushin, приглашаем Вас на собеседование в компанию Artezio.\n\n${date.toDateString()}`;
    btn.onclick = function()
    {
        window.location.href = message;
    }
})();