const loginForm = document.forms.loginForm;
const alertArea = document.getElementById('alertArea');

//Functions
function showLoginFail(){
    const alert = document.createElement('div');
	alert.classList.add('alert', 'alert-danger');
    alert.role = 'alert';
    alert.innerText = 'Logingegevens fout, probeer opnieuw!';

    alertArea.append(alert);
}

function showLoginSuccess(){
    const alert = document.createElement('div');
	alert.classList.add('alert', 'alert-success');
    alert.role = 'alert';
    alert.innerText = 'Login gelukt!';

    const homeLink = document.createElement('a');
    homeLink.href = 'index.html';
    homeLink.innerText = ' Home'

    alertArea.append(alert);
    alert.append(homeLink);
}

function saveToLocalStorage(data){
    console.log(data);
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.setItem('token', data.token);
    localStorage.setItem('userId', data._id);
}

function login(){
    const loginData = { email: loginForm.email.value, password: loginForm.password.value };
    loginForm.email.value = '';
    loginForm.password.value = '';

    const headers = new Headers();
    headers.set('content-type', 'application/json');

    const options = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(loginData)
    };

    fetch('https://twitterapi.azurewebsites.net/users/login', options)
    .then(res => {
        if(res.ok){
            showLoginSuccess();
            return res.json();
        }
        else{
            showLoginFail();
        }
        throw Error(res.statusText);
    }).then(data => saveToLocalStorage(data))
        .catch(error => console.error(error));
}

// Event handlers
loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    login();
});