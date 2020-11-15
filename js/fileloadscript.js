function dropHandler(evt) 
{
    evt.stopPropagation();
    evt.preventDefault();
 
    var files = evt.dataTransfer.files;
 
    if (files.length != 1) 
    {
        console.log("Please drag and drop 1 file!");
        return;
    }

    var file = files[0];
 
    var fileReader = new FileReader();
 
    fileReader.onloadstart = (progressEvent) =>
    {
        console.log('onload');
    }
 
    fileReader.onload = (progressEvent) =>
    {
        console.log("onload!");     
    }
 
    fileReader.onloadend = (progressEvent) =>
    {
        console.log("onloadend!");
        var stringData = fileReader.result;
        let object = JSON.parse(stringData);
        console.log(object);
        parseHeader(object);
        parseSections(object);
        prepareSendButton(object.email, object.sex, object.fullName);
    }
 
    fileReader.onerror = (progressEvent) =>
    {
        console.log("onerror!");
    }

    fileReader.readAsText(file, "UTF-8"); // fileReader.result -> String.
}
 
function dragoverHandler(evt) 
{
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy';
}

function prepareSendButton(email, sex, fullName)
{
    let btn = document.getElementById('btnSend');
    btn.classList.remove('hidden-true');
    let date = new Date();
    let targetSex = sex === "male" ? "Уважаемый" : "Уважаемая";
    let message = `mailto:${email}?subject=Приглашение на собеседование&body=${targetSex} ${fullName}, приглашаем Вас на собеседование в компанию Artezio.\n\n${date.toDateString()}`;
    console.log(message);
    btn.onclick = function()
    {
        window.location.href = message;
    }
}

function parseHeader(profileObject)
{
    let name = profileObject.fullName;
    let position = profileObject.position;
    let phone = profileObject.phone;
    let email = profileObject.email;
    let sex = profileObject.sex;
    let age = profileObject.age;
    let image = profileObject.image;

    let nameNode = getNameNode();
    nameNode.textContent = name;

    let positionNode = getPositionNode();
    positionNode.textContent = position;

    let phoneNode = getPhoneNode();
    phoneNode.textContent = phone;

    let emailNode = getEmailNode();
    emailNode.textContent = email;

    let imageNode = getProfileImageNode();
    imageNode.setAttribute('src', image);
}


function parseSections(profileObject)
{
    let sections = profileObject.sections;
    let sectionsWrapper = getSectionsNode();
    for (let i = 0; i < sections.length; i++)
    {
        let section = createSection(sections[i]);
        sectionsWrapper.appendChild(section);
        bindArrows(section);
    }
}

function getProfileImageNode()
{
    return document.getElementById('profile-photo');
}

function getNameNode()
{
    return document.getElementById('name');
}

function getPositionNode()
{
    return document.getElementById('position');
}

function getContactsNode()
{
    return document.getElementById('contacts');
}

function getPhoneNode()
{
    return getContactsNode().children.item(0).children.item(1);
}

function getEmailNode()
{
    return getContactsNode().children.item(1).children.item(1);
}

function getSectionsNode()
{
    return document.getElementById('sections');
}

function createSection(sectionObject)
{
    let section = document.createElement('div');
    section.classList.add('section');
    let dropDown = document.createElement('div');
    dropDown.classList.add('drop-down');
    let dropDownHead = document.createElement('div');
    dropDownHead.classList.add('drop-down-head');
    let headText = document.createElement('span');
    headText.textContent = sectionObject.title.toUpperCase();
    let headArrow = document.createElement('span');
    headArrow.classList.add('btn', 'glyph', 'arrow', 'icon-arrow-down')
    dropDownHead.appendChild(headText);
    dropDownHead.appendChild(headArrow);
    let list = document.createElement('div');
    list.classList.add('drop-down-list');
    if (sectionObject.isOpen == true)
    {
        list.classList.add('hide');
        headArrow.classList.add('open');
    }
    for (let i = 0; i < sectionObject.items.length; i++)
    {
        let item = createItem(sectionObject.items[i]);
        list.appendChild(item);
    }
    dropDown.appendChild(dropDownHead)
    dropDown.appendChild(list);
    section.appendChild(dropDown);

    console.dir(section);

    return section;
}

function createItem(item)
{
    let itemElem = document.createElement('div');
    itemElem.classList.add('drop-down-item');
    let title = document.createElement('span');
    title.classList.add('text-bd-3');
    title.textContent = item.title;
    let subTitle = document.createElement('span');
    subTitle.classList.add('text-lgt-blue');
    subTitle.textContent = item.subTitle;
    let date = document.createElement('span');
    date.textContent = `${item.from} - ${item.to}`;
    date.classList.add('text-lgt-gray');
    let itemsList = document.createElement('ul');
    itemsList.classList.add('list');
    for (let i = 0; i < item.items.length; i++)
    {
        let listItem = document.createElement('li');
        let listItemText = document.createElement('span');
        listItemText.textContent = item.items[i];
        listItem.appendChild(listItemText);
        itemsList.appendChild(listItem);
    }
    itemElem.appendChild(title);
    itemElem.appendChild(subTitle);
    itemElem.appendChild(date);
    itemElem.appendChild(itemsList);
    return itemElem;
}

function bindArrows(section)
{
    let list = section.children.item(0).children.item(1);
    let arrow = section.children.item(0).children.item(0).children.item(1);
    section.onclick = async function(event)
    {
        list.classList.toggle('hide');
        arrow.classList.toggle('open');
    }  
}
