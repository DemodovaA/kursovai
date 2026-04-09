import html2canvas from './node_modules/html2canvas/dist/html2canvas.esm.js';

export async function screen_making() {
    const myButton = document.querySelector('.text_counter'); 
    myButton.style.boxShadow = 'none';

    const rect = mainElement.getBoundingClientRect();
    const h = rect.height / 2;
    mainElement.style.boxShadow = 'none';

    // Делаем два скриншота (консоль будет выводить лог html2canvas)
    const canvasTop = await html2canvas(mainElement, { y: 0, height: h });
    const canvasBottom = await html2canvas(mainElement, { y: h, height: h });

     return {
        topData: canvasTop.toDataURL(),
        bottomData: canvasBottom.toDataURL(),
        height: h,
        rect: rect
    };
}

const mainElement = document.querySelector('main');
//Анимация
// let cutBtn = document.createElement("button");
//     cutBtn.classList.add("cut_button");
//     cutBtn.textContent = "обрезать";
//     mainElement.appendChild(cutBtn);
    export async function animateBlockCut() {
const screen = document.getElementById('split-screen');
const imgTop = document.getElementById('part-top');
const imgBottom = document.getElementById('part-bottom');
     const slices = await screen_making();
    imgTop.src = slices.topData;
    imgBottom.src = slices.bottomData;

    // Позиционируем по вертикали
     imgTop.style.top = slices.rect.top + 'px';
    imgBottom.style.top = (slices.rect.top + slices.height) + 'px';

    // Включаем слой и скрываем оригинал
    screen.style.display = 'block';
    mainElement.style.visibility = 'hidden';
    
    // Запускаем движение
    requestAnimationFrame(() => {
        screen.classList.add('cut-active');
    });

    setTimeout(() => {
    // Сбрасываем анимацию
    screen.classList.remove('cut-active');
    screen.style.display = 'none';
    mainElement.style.visibility = 'visible';
    }, 1500);

    return true; 
};