import quiz from "./quiz.json" with { type: 'json' };
let counter = 0
let counterRight = 0
let currentAnswer = ""
function createTicket(counter, arr) {
    let el = arr[counter]
    let div = document.createElement("div");
    div.classList.add("conteiner");
    let h1 = document.createElement("h1")
    let h2 = document.createElement("h2")
    div.appendChild(h2)
    div.appendChild(h1)
    h1.textContent = el["Вопрос"]
    h2.textContent = "Номер вопроса " + el["Номер вопроса"]
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
}

createTicket(counter, quiz)
