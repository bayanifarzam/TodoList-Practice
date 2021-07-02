'use strict'

let input = document.getElementById('input');
let list = document.getElementById('list');
let errorText = document.getElementById('errorText');
const addBtn = document.querySelector('#addTaskBtn');
let i = 1;

// Newly added
addBtn.addEventListener('click', addList)

// changed name from filterinpput
function checkInput(text) {
    if (text && text.length >= 3) return text
    else {
        errorText.innerHTML = 'Required at least three character';
        return false;
    }
}


//changed name from listtask
function insertTask(input) {
    const today = new Date();
    //changed old method to new string template method
    let date = `${today.getFullYear()}/${today.getMonth()}/${today.getDate()}`
    let time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`
    let dateTime = date + ' ' + time;

    let html = `<li class="list-item" id='list${i}'>
                                    <div id="list-item-wrapper">
                                        <div id="listText">
                                            <span id="listText${i}">${input}</span>
                                            <p id="dateText">${dateTime}</p>
                                        </div>
                                    
                                        <div id="actionBtn">
                                            <i class=" text-warning" onclick="editList(${i})">Edit</i>
                                            <i class=" text-danger" onclick="deleteList(${i})">Del</i> 
                                        </div>
                                    </div>
                                    
                                </li>
                `;

    // replaced built-in function innerHTML with insertAdjacentHTML
    list.insertAdjacentHTML('beforeend', html);

    i++;
}

function editList(listId) {
    let currentText = document.getElementById(`listText${listId}`);

    let editPrompt = prompt('Editing', currentText.innerHTML);

    if (editPrompt) {
        currentText.innerHTML = editPrompt;
    } else {
        errorText.innerHTML = 'Canceled Edit';
    }
}

function deleteList(listId) {

    let currentText = document.getElementById(`listText${listId}`).innerHTML;

    let deleteConfirm = confirm(`'${currentText}' is Deleting.. Sure?`);

    if (deleteConfirm) {
        let deleteList = document.getElementById('list' + listId);

        list.removeChild(deleteList);
        errorText.innerHTML = 'Deleted';
    } else {
        errorText.innerHTML = 'Canceled Delete';
    }
}



//Braught changes according to functions above
function addList() {
    let inputText = input.value;

    if (checkInput(inputText)) {

        insertTask(inputText);

        input.value = '';
        errorText.innerHTML = '';
    }
}