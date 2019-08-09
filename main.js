'use strict';
// const URL = 'https://urozaev.github.io/testingXML/filecopy.xml'; - второй тестовый url
const URL = 'https://urozaev.github.io/testingXML/file.xml';
const XHR = new XMLHttpRequest();

XHR.addEventListener('load', onLoad);
XHR.open('GET', URL, false);
XHR.send();

function onLoad() {
    //1. Считаем общее количество ссылок в XML
    let xmlDoc = XHR.responseXML;
    let book = xmlDoc.querySelectorAll('FictionBook *');
    let links = [];

    Array.from(book).forEach(element => {
        if(element.getAttributeNS('http://www.w3.org/1999/xlink', 'href')) {
            links.push(element);
        };
    });

    let linksNumber = document.getElementById('links');

    linksNumber.innerHTML = `В XML-документе находится: ${links.length} ссылок`;
    
    //2. Считаем общее количество букв в XML без пробелов и символов
    let words = xmlDoc.getElementsByTagName('FictionBook')[0].textContent;
    let wordsSeparating = words.split(' ').join('');
    let wordsArr = wordsSeparating.replace(/[,0-9-{}()«»:;.–…?№__//"@!.*\s]/g, '');
    
    symbols.textContent = `В документе, внутри тегов: ${wordsArr.normalize().length} букв.`;
 
    //3. Считаем общее количество букв в XML с пробелами
    let wrdsSpace = document.getElementById('wordsAndSpace');
    let wrdsSpaceArr = wordsSeparating.replace(/[,0-9-{}()«»:;.–…?№__//"!.*]/g, '');
    
    wrdsSpace.textContent = `В документе, внутри тегов: ${wrdsSpaceArr.normalize().length} букв, включая пробельные символы.`;

    // 4. Проверяем битые ссылки(ссылки, которые ссылаются на несуществующие ID)
    let brokedLinks = document.getElementById('brokedLinks');
    let linkAttr = [];

    Array.from(links).forEach(element => {
        linkAttr.push(element.getAttribute('l:href').replace(/#/g, ''));
    });

    let idArray = Array.from(xmlDoc.querySelectorAll('[id]'));
    let idValue = [];

    idArray.forEach(element => {
        idValue.push(element.getAttribute('id'));
    });

    let invalidLinks = [];

    // Сравниваем ссылки с доступными ID
    linkAttr.forEach(item => {
        if (idValue.includes(item)) {
        } else {
            invalidLinks.push(item);
        };
    });

    brokedLinks.textContent = `Количество ссылок, которые ссылаются на несуществующие ID — ${invalidLinks.length}`;
}
