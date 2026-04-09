import html2canvas from './node_modules/html2canvas/dist/html2canvas.esm.js';

import quiz from "./quiz.json" with { type: 'json' };
// console.log(quiz.length);
let counter = 0
let counterRight = 0
let currentAnswer = ""
function createTicket(counter, arr) {
    let el = arr[counter]
    let div = document.createElement("div");
    div.classList.add("conteiner");
    let h1 = document.createElement("h1");
    let text_counter = document.createElement("p");
    text_counter.classList.add("text_counter");
    div.appendChild(text_counter)
    div.appendChild(h1)
    h1.textContent = el["Вопрос"]
    text_counter.textContent = "Вопрос " + el["Номер вопроса"] + "/" + quiz.length
    for(let i = 0; i < 4; ++i){
        let input = document.createElement("input")
        input.addEventListener("click", () => {
            currentAnswer = el[`Вариант ${i + 1}`]
            ///Проверка считываемости ответа
            console.log(currentAnswer);
        })
        ////Создание полей ответов
        let br = document.createElement("br")
        let span = document.createElement("span")
        span.classList.add("span_text");
        input.setAttribute("type", "radio")
        input.setAttribute("class", "answer_input")
        input.setAttribute("name", el["Номер вопроса"])
        let list = document.createElement("ul")
        let list_item = document.createElement("li")
        span.textContent = el[`Вариант ${i + 1}`]
        list_item.appendChild(input)
        list_item.appendChild(span)
        list_item.appendChild(br)
        list.appendChild(list_item)
        div.appendChild(list)
    }
    const mainElement = document.querySelector('main');
    mainElement.appendChild(div);


    let btn = document.createElement("button")
    btn.classList.add("answer_button");
    btn.textContent = "Ответить"
    btn.addEventListener("click", () => {
        if(currentAnswer === el["Верный Вариант"]){
            counterRight++
        }
        mainElement.textContent = ""
        counter++
        if(counter < arr.length){
            createTicket(counter, quiz)
        } else {
            alert(`Правильных овтетов ${counterRight}`)
        }
    })
    mainElement.appendChild(btn);

    //Анимация
let cutBtn = document.createElement("button");
    cutBtn.classList.add("cut_button");
    cutBtn.textContent = "обрезать";
    mainElement.appendChild(cutBtn);
const screen = document.getElementById('split-screen');
const imgTop = document.getElementById('part-top');
const imgBottom = document.getElementById('part-bottom');

cutBtn.onclick = async () => {
    // Сбрасываем старую анимацию, если она была запущена ранее
    screen.classList.remove('cut-active');
    screen.style.display = 'none';
    mainElement.style.visibility = 'visible';

    const rect = mainElement.getBoundingClientRect();
    const h = rect.height / 2;

    // Делаем два скриншота (консоль будет выводить лог html2canvas)
    const canvas1 = await html2canvas(mainElement, { y: 0, height: h });
    const canvas2 = await html2canvas(mainElement, { y: h, height: h });

    imgTop.src = canvas1.toDataURL();
    imgBottom.src = canvas2.toDataURL();

    // Позиционируем по вертикали
    imgTop.style.top = rect.top + 'px';
    imgBottom.style.top = (rect.top + h) + 'px';

    // Включаем слой и скрываем оригинал
    screen.style.display = 'block';
    mainElement.style.visibility = 'hidden';
    
    // Запускаем движение
    requestAnimationFrame(() => {
        screen.classList.add('cut-active');
    });
};
}

createTicket(counter, quiz)


