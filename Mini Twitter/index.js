const base_url = 'https://twitterapi.azurewebsites.net';
const messageArea = document.getElementById('allMessages');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let prevURL = null;
let nextUrl = null;
const messageForm = document.forms.messageForm;

// Functions
function likeMessage(id){
    const headers = new Headers();
    const token = localStorage.getItem('token');
    headers.set('x-access-token', token);

    const options = {
        method: 'POST',
        headers: headers
    };

    fetch(base_url + '/messages/' + id + '/like', options)
    .then(res => {
        if(res.ok){
            return res.json();
        }
        throw Error(res.statusText);
    }).then(data => console.log(data))
        .catch(error => console.error(error));
}

function unlikeMessage(id){
    const headers = new Headers();
    const token = localStorage.getItem('token');
    headers.set('x-access-token', token);

    const options = {
        method: 'POST',
        headers: headers
    };

    fetch(base_url + '/messages/' + id + '/unlike', options)
    .then(res => {
        if(res.ok){
            return res.json();
        }
        throw Error(res.statusText);
    }).then(data => console.log(data))
        .catch(error => console.error(error));
}

// Load messages
function printMessage(messageData){
    const cardDiv = document.createElement('div');
	cardDiv.classList.add('card', 'my-2');
    const cardBodyDiv = document.createElement('div');
	cardBodyDiv.classList.add('card-body');
    const authorH6 = document.createElement('h6');
	authorH6.classList.add('card-subtitle', 'mb-3', 'text-muted');
    const messageP = document.createElement('p');
	messageP.classList.add('card-text');

    //Comments start
    const commentBtn = document.createElement('a');
    commentBtn.classList.add('btn', 'btn-primary', 'me-2');
    commentBtn.href = 'comment.html';
    commentBtn.innerText = 'Comments'
    commentBtn.addEventListener('click', () => {
        localStorage.removeItem('messageToEditId');
        localStorage.setItem('messageToEditId', messageData._id);
    })
    //Comments end
    //Likes start
    const likeBtn = document.createElement('a');
    likeBtn.innerHTML = '&#9825; Like';

    likeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if(messageData.likes.includes(localStorage.getItem('userId'))){
            unlikeMessage(messageData._id);
            likeBtn.classList.add('btn', 'me-2', 'btn-primary');
        }
        else{
            likeMessage(messageData._id);
            likeBtn.classList.add('btn', 'me-2', 'btn-light');
        }
    })

    if(messageData.likes.includes(localStorage.getItem('userId'))){
        likeBtn.classList.add('btn', 'me-2', 'btn-primary');
    }
    else{
        likeBtn.classList.add('btn', 'me-2', 'btn-light');
    }
    //Likes end

    authorH6.innerText = messageData.user.first_name + ' ' + messageData.user.last_name;
    messageP.innerText = messageData.message;

    cardBodyDiv.append(authorH6);
    cardBodyDiv.append(messageP);
    cardBodyDiv.append(likeBtn);
    cardBodyDiv.append(commentBtn);

    //Edit start
    if(messageData.user._id == localStorage.getItem('userId')){
        const editBtn = document.createElement('a');
        editBtn.classList.add('btn', 'btn-primary');
        editBtn.href = 'edit.html';
        editBtn.innerText = 'Edit'
        cardBodyDiv.append(editBtn);
        editBtn.addEventListener('click', () => {
            localStorage.removeItem('messageToEditId');
            localStorage.setItem('messageToEditId', messageData._id);
        })
    }
    //Edit end

    cardDiv.append(cardBodyDiv);
    messageArea.append(cardDiv);
}

function printAllMessages(data){
    console.log(data);
    prevURL = data.prevLink;
    nextUrl = data.nextLink;
    messageArea.innerHTML = ''; //Deletes previously loaded messages when pressing 'Volgende' or 'Vorige' buttons
    data.results.forEach(element => {
        printMessage(element);
    });
}

const headers = new Headers();
    const token = localStorage.getItem('token');
    headers.set('x-access-token', token);

    const options = {
        method: 'GET',
        headers: headers
    };

async function getMessages(url){
    fetch(url, options)
    .then(res => {
        if(res.ok){
            return res.json();
        }
        throw Error(res.statusText);
    }).then(data => printAllMessages(data))
        .catch(error => console.error(error));
}

getMessages(base_url + '/messages')

prevBtn.addEventListener('click', (e)=> {
	e.preventDefault();
	if(prevURL!=null){
		getMessages(prevURL);
	}
});

nextBtn.addEventListener('click', (e)=> {
	e.preventDefault();
	if(nextUrl!=null){
		getMessages(nextUrl);
	}
});
//Load messages end

//Create message
function sendMessage(){
    const message = { message: messageForm.messageInput.value };
    messageForm.messageInput.value = '';

    const headers = new Headers();
    const token = localStorage.getItem('token');
    headers.set('x-access-token', token);
    headers.set('content-type', 'application/json');

    const options = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(message)
    };

    fetch(base_url + '/messages/create', options)
    .then(res => {
        if(res.ok){
            return res.json();
        }
        throw Error(res.statusText);
    }).then(getMessages(base_url + '/messages'))
        .catch(error => console.error(error));
}

messageForm.addEventListener("submit", (e) => {
    e.preventDefault();
    sendMessage();
});