const base_url = 'https://twitterapi.azurewebsites.net';
const messageText = document.getElementById('messageText');
const commentArea = document.getElementById('commentArea');
const messageToEditId = localStorage.getItem('messageToEditId');
const commentForm = document.forms.commentForm;

//Functions
function removeComment(commentId){
    const headers = new Headers();
    const token = localStorage.getItem('token');
    headers.set('x-access-token', token);
    headers.set('content-type', 'application/json');

    const options = {
        method: 'DELETE',
        headers: headers
    };

    fetch(base_url + '/messages/' + messageToEditId + '/comment/' + commentId, options)
    .then(res => {
        if(res.ok){
            return res.json();
        }
        throw Error(res.statusText);
    }).then(data => console.log(data))
        .catch(error => console.error(error));
}

function sendComment(){
    const comment = { comment: commentForm.commentInput.value };
    commentForm.commentInput.value = '';

    const headers = new Headers();
    const token = localStorage.getItem('token');
    headers.set('x-access-token', token);
    headers.set('content-type', 'application/json');

    const options = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(comment)
    };

    fetch(base_url + '/messages/' + messageToEditId + '/comment', options)
    .then(res => {
        if(res.ok){
            return res.json();
        }
        throw Error(res.statusText);
    }).then(data => console.log(data))
        .catch(error => console.error(error));
}

function loadComment(data){
    
    const cardDiv = document.createElement('div');
	cardDiv.classList.add('card');
    const cardBodyDiv = document.createElement('div');
	cardBodyDiv.classList.add('card-body');
    const authorH6 = document.createElement('h6');
	authorH6.classList.add('card-subtitle', 'mb-3', 'text-muted');
    const messageP = document.createElement('p');
	messageP.classList.add('card-text');

    authorH6.innerText = data.user.first_name + ' ' + data.user.last_name;
    messageP.innerText = data.comment;

    cardBodyDiv.append(authorH6);
    cardBodyDiv.append(messageP);
    cardDiv.append(cardBodyDiv);
    commentArea.append(cardDiv);

    if(data.user._id == localStorage.getItem('userId')){
        const deleteBtn = document.createElement('a');
        deleteBtn.classList.add('btn', 'btn-danger');
        deleteBtn.innerText = 'Verwijder'
        cardBodyDiv.append(deleteBtn);
        deleteBtn.addEventListener('click', () => {
            removeComment(data._id)
        })
    }
}

function loadMessage(data){
    console.log(data);
    const cardDiv = document.createElement('div');
	cardDiv.classList.add('card', 'my-2', 'mb-3');
    const cardBodyDiv = document.createElement('div');
	cardBodyDiv.classList.add('card-body');
    const authorH6 = document.createElement('h6');
	authorH6.classList.add('card-subtitle', 'mb-3', 'text-muted');
    const messageP = document.createElement('p');
	messageP.classList.add('card-text');

    authorH6.innerText = data.user.first_name + ' ' + data.user.last_name;
    messageP.innerText = data.message;

    cardBodyDiv.append(authorH6);
    cardBodyDiv.append(messageP);
    cardDiv.append(cardBodyDiv);
    messageText.append(cardDiv);

    data.comments.forEach(element => {
        loadComment(element);
    });
}

//Functions end
//Event handlers
commentForm.addEventListener("submit", (e) => {
    e.preventDefault();
    sendComment();
});
//Event handlers end

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
}).then(data => loadMessage(data))
    .catch(error => console.error(error));