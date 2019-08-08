'use strict';
// const URL = 'https://urozaev.github.io/testingXML/filecopy.xml'; - второй тестовый url
const URL = 'https://urozaev.github.io/testingXML/file.xml';
const XHR = new XMLHttpRequest();

XHR.addEventListener('load', onLoad);
XHR.open('GET', URL, false);
XHR.send();

function onLoad() {
    // Считаем количество ссылок в XML
    let xmlDoc = XHR.responseXML;
    let links = xmlDoc.getElementsByTagName('a');
    let linksNumber = document.getElementById('links');

    linksNumber.innerHTML = `В XML-документе находится: ${links.length} ссылки`;
    
    // Считаем общее количество букв в XML без пробелов и символов
    let words = xmlDoc.getElementsByTagName('FictionBook')[0].textContent;
    let wordsSeparating = words.split(' ').join('');
    let wordsArr = wordsSeparating.replace(/[,0-9-{}()«»:;.–…?№__//"@!.*\s]/g, '');
    
    symbols.textContent = `В документе, внутри тегов: ${wordsArr.normalize().length} букв.`;
 
    // Считаем общее количество букв в XML с пробелами
    let wrdsSpace = document.getElementById('wordsAndSpace');
    let wrdsSpaceArr = wordsSeparating.replace(/[,0-9-{}()«»:;.–…?№__//"!.*]/g, '');
    
    wrdsSpace.textContent = `В документе, внутри тегов: ${wrdsSpaceArr.normalize().length} букв, включая пробельные символы.`;

    // Проверяем битые ссылки
    let brokedLinks = document.getElementById('brokedLinks');
    let validLinks = document.getElementById('validLinks');
    let linkAttr = [];

    Array.from(links).forEach(element => {
        linkAttr.push(element.getAttribute('l:href').replace(/#/g, ''));
    });

    let idArray = Array.from(xmlDoc.querySelectorAll('[id]'));
    let idValue = [];

    idArray.forEach(element => {
        idValue.push(element.getAttribute('id'));
    });

    let validLinksArr = [];
    let invalidLinks = [];

    // Сравниваем ссылки с доступными ID
    linkAttr.forEach(item => {
        if (idValue.includes(item)) {
            validLinksArr.push(item);
        } else {
            invalidLinks.push(item);
        };
    });

    validLinks.textContent = `Валидных ссылок найдено - ${validLinksArr.length}`;
    brokedLinks.textContent = `Ссылок на несуществующие ID найдено — ${invalidLinks.length}`;
}
