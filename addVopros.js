const addDiv = document.getElementById('hide');
const addButton = document.getElementById('add_button');
// addDiv.style.visibility = 'hidden';
//         addButton.addEventListener("click", () => {
//              if (addDiv.style.visibility === 'hidden') {
//              addDiv.style.visibility = 'visible' }
//              else {
//              addDiv.style.visibility = 'hidden'; }
//             })
    addButton.addEventListener("click", () => {
             addDiv.classList.toggle('testHide');
    })