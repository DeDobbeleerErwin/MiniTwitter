const registerForm = document.forms.registerForm;

//Functions
function showRegisterSuccess(){
    const alert = document.createElement('div');
	alert.classList.add('alert', 'alert-success');
    alert.role = 'alert';
    alert.innerText = 'Registratie gelukt!';

    const loginLink = document.createElement('a');
    loginLink.href = 'login.html';
    loginLink.innerText = ' Login'

    alertArea.append(alert);
    alert.append(loginLink);
}

function register(){
    const registerData = { 
        firstName: registerForm.firstName.value, 
        lastName: registerForm.lastName.value, 
        userName: registerForm.userName.value, 
        email: registerForm.email.value, 
        password: registerForm.password.value 
    };

    const headers = new Headers();
    headers.set('content-type', 'application/json');

    const options = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(registerData)
    };

    fetch('https://twitterapi.azurewebsites.net/users/register', options)
    .then(res => {
        if(res.ok){
            showRegisterSuccess();
            return res.json();
        }
        throw Error(res.statusText);
    }).then(data => console.log(data))
        .catch(error => console.error(error));
}

// Event handlers
registerForm.addEventListener("submit", (event) => {
    event.preventDefault();
    register();
});