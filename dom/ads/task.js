const rotatorElements = Array.from(document.querySelectorAll('.rotator__case'));
let intervalTime = 1000;

let rotatorTimer = setTimeout(function nextRotator() {
    const currentActiveIndex = rotatorElements.findIndex(
        (item) => item.classList.contains('rotator__case_active')
    );
    
    let newActiveIndex = currentActiveIndex + 1;
    if (currentActiveIndex === rotatorElements.length - 1) {
        newActiveIndex = 0;
    }
    
    rotatorElements[currentActiveIndex].classList.remove('rotator__case_active');
    rotatorElements[newActiveIndex].classList.add('rotator__case_active');
    rotatorElements[newActiveIndex].style.color = rotatorElements[newActiveIndex].dataset.color;
    intervalTime = rotatorElements[newActiveIndex].dataset.speed;

    rotatorTimer = setTimeout(nextRotator, intervalTime)
}, intervalTime)


/*
Из задания: «Подумайте, как из setInterval сделать бесконечный цикл»
Q: Разве setInterval не бесконечный сам по себе?
(Или имелся ввиду именно трюк с рекурсивным setTimeout?
без которого не получится менять длительность интервала из самого таймера)

Из задания: «Сделайте акцент на том, чтобы на странице можно было использовать несколько
ротаторов одновременно.»
Q: Что именно имеется ввиду?
(На мой взгляд не очень понятное ТЗ)

Q: Будет ли значимая оптимизация
если при первом проходе запомнить data-атрибуты в массив (или в объект Map),
а потом подставлять из него, чтобы не считывать каждй раз?
*/