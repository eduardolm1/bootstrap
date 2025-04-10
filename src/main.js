// Guarda la información recogida de cada uno de los usuarios en localStorage.
// Implementa validación que obligue a rellenar todos los campos.
// Implementa una validación para el correo.
// Implementa una validación que comprueba que la contraseña 1 es la misma que la contraseña 2.
// Implementa una validación de contraseña.
// Por cada validación que no se cumpla muestra un mensaje durante 3 segundos y que después desaparezca.
// Al terminar de rellenar los datos del formulario correctamente muestra un mensaje durante 3 segundos que muestre “Usuario creado correctamente” y redirige a la vista Usuarios.
// Muestra los mensajes utilizando los alerts de Bootstrap.
// Crea la vista Usuarios la cual debe mostrar en cards de Bootstrap los usuarios guardados en localStorage con los siguientes campos:
//      Nombre,Correo 


const nameUser = document.getElementById('nameInput')
const emailUser = document.getElementById('emailInput')
const passwdUser = document.getElementById('passwordInput')
const repeatPasswdUser = document.getElementById('repeatPasswdInput')
const formUser = document.getElementById('formData')
const alertMsg = document.getElementById('alertContainer')
const emailRegex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/
const userContainer = document.getElementById('userBox')

function crearUser(e) {
    e.preventDefault()

    validaciones()
}
if (formUser) {
    formUser.addEventListener('submit', crearUser);
}


function validaciones() {
    if (nameUser.value === "" || emailUser.value === "" || passwdUser.value === "" || repeatPasswdUser.value === "") {
        return createAlert('error', 'Se deben rellenar todos los campos');
    }
    if (emailRegex.test(emailUser.value)) {
        if (passwdUser.value === repeatPasswdUser.value) {
            crearLocalStorage()
        } else {
            createAlert('error', 'Las contraseñas no coinciden')
        }
    } else {
        createAlert('error', 'Email no valido')
    }
}

function crearLocalStorage() {
    const users = JSON.parse(localStorage.getItem('users')) || []
    const user = {
        name: nameUser.value,
        email: emailUser.value,
        password: passwdUser.value
    }
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users))
    createAlert('success', 'Usuario creado correctamente. Redirigiendo...');
    
    setTimeout(() => {
        window.location.href = 'users.html';
    }, 3000);
}

function createAlert(text, msg) {
    if (text == 'success') {
        alertMsg.innerHTML = (`<div class="alert alert-success" role="alert">${msg}</div>`)
    }
    if (text == 'error') {
        alertMsg.innerHTML = (`<div class="alert alert-danger" role="alert">${msg}</div>`)
    }

    setTimeout(() => {
        alertMsg.innerHTML = ''
    }, 3000);
}

function createUserDOM() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    userContainer.innerHTML = '';
    
    if (users.length === 0) {
        userContainer.innerHTML = '<p class="text-muted">No hay usuarios registrados</p>';
        return;
    }
    
    users.forEach(user => {
        const card = document.createElement('div');
        card.className = 'card mb-3';
        card.style.width = '18rem';
        
        card.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${user.name}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${user.email}</h6>
            </div>
        `;
        
        userContainer.appendChild(card);
    });

}
createUserDOM()
