const base_url = 'https://twitterapi.azurewebsites.net';
const editForm = document.forms.editForm;
const messageToEditId = localStorage.getItem('messageToEditId');
const deleteBtn = document.getElementById('deleteBtn')

//Functions
function loadMessage(){
    const headers = new Headers();
    const token = localStorage.getItem('token');
    headers.set('x-access-token', token);

    const options = {
        method: 'GET',
        headers: headers
    };

fetch(base_url + '/messages/' + messageToEditId, options)
    .then(res => {
        if(res.ok){
            return res.json();
        }
        throw Error(res.statusText);
    }).then(data => editForm.editInput.value = data.message)
        .catch(error => console.error(error));
}

function sendEditedMessage(){
    const message = { message: editForm.editInput.value };
    editForm.editInput.value = '';

    const headers = new Headers();
    const token = localStorage.getItem('token');
    headers.set('x-access-token', token);
    headers.set('content-type', 'application/json');

    const options = {
        method: 'PATCH',
        headers: headers,
        body: JSON.stringify(message)
    };

    fetch(base_url + '/messages/' + messageToEditId, options)
    .then(res => {
        if(res.ok){
            return res.json();
        }
        throw Error(res.statusText);
    }).then(data => console.log(data))
        .catch(error => console.error(error));
}

function deleteMessage(){
    editForm.editInput.value = '';

    const headers = new Headers();
    const token = localStorage.getItem('token');
    headers.set('x-access-token', token);
    headers.set('content-type', 'application/json');

    const options = {
        method: 'DELETE',
        headers: headers
    };

    fetch(base_url + '/messages/' + messageToEditId, options)
    .then(res => {
        if(res.ok){
            return res.json();
        }
        throw Error(res.statusText);
    }).then(data => console.log(data))
        .catch(error => console.error(error));
}
//Funtions end

loadMessage();

//Event handlers
editForm.addEventListener("submit", (e) => {
    e.preventDefault();
    sendEditedMessage();
});

deleteBtn.addEventListener("click", (e) => {
    e.preventDefault();
    deleteMessage();
});
//Event handlers end