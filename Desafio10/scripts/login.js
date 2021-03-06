const getUser = () => {
    if (!localStorage.getItem("user") && !sessionStorage.getItem("user")) return null;
    return JSON.parse(localStorage.getItem("user")) || JSON.parse(sessionStorage.getItem("user"));

};


// revisando si hay un usuario logeado y preguntando si el quiere ingresar o irse

const user = getUser();
console.log(user);

if (user !== null) {
    console.log(window.location.pathname);
    if (window.location.pathname == "/login.html") {
        const out = confirm("Ya hay un usuario logeado, quieres salir?");
        if (!out) {
            window.location.href = "./index.html";
        } else {
            sessionStorage.removeItem("user");
            localStorage.removeItem("user");
            window.location.reload();
        }
    }
}

// obteniendo lista de usuarios para realizar las proximas comprobaciones
const users = JSON.parse(localStorage.getItem("users")) || [];
console.log(users);


class User {
    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.logged = false;
        this.status = "disponible";
        this.statusHistory = [];
        this.chats = [];
        this.id = users.length == 0 ? 1 : users[users.length - 1].id + 1;
    }
    // Future uses of methods
    changeStatus(newStatus) {
        this.statusHistory.push(this.status);
        this.status = newStatus;
    }
    changeName(newName) {
        this.name = newName;
    }
    changePassword(newPassword) {
        this.password = newPassword;
    }
    createChat(name) {
        this.chats.push(name);
    }
}
// obteniendo las referencias de los dos forms
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

console.log(!!$(".xd").length)

function displayMsg(err, msg, el) {
    if ($("#alertMsg").length) $("#alertMsg").remove();

    const className = err ? "flex w-full max-w-sm mx-auto overflow-hidden bg-red-500 rounded-lg shadow-md col-span-2" : "flex w-full max-w-sm mx-auto overflow-hidden bg-green-500 rounded-lg shadow-md col-span-2";
    const color = !err ? "green" : "red";
    $(el).append(`<div class="${className}" id="alertMsg">
                    <div class="flex items-center justify-center w-12 bg-${color}-500"></div>
                    <div class="px-2 py-1 -mx-3">
                        <div class="mx-3 flex gap-2">
                            <span class="font-semibold text-sm text-white">${err ? 'Error' : 'Congratulations!'}</span>
                            <p class="text-sm text-white">
                            ${msg}
                            </p>
                        </div>
                    </div>
                </div>`);

}

loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const form = new FormData(loginForm);
    const emailAddress = form.get("emailAddress");

    const password = form.get("password");
    const stayLogged = form.get("stayLogged");
    const userMatch = users.find(
        (user) => user.email == emailAddress && user.password == password
    );
    console.log(userMatch);
    if (userMatch === undefined)
        return displayMsg(
            true,
            "el password o el email son incorrectos",
            loginForm
        );
    if (stayLogged) localStorage.setItem("user", JSON.stringify(userMatch));
    else sessionStorage.setItem("user", JSON.stringify(userMatch));
    window.location.href = "./index.html";

});

function verifyRegister(name, emailAddress, password) {
    if (name.length < 6) return [true, "El nombre debe tener al menos 6 letras"];
    if (!(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(emailAddress))) return [true, "El mail es incorrecto"];
    if (users.some(user => user.email == emailAddress)) return [true, "el email ya esta registrado"];
    if (!(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/.test(password[0]))) return [true, "El password debe tener al menos 1 minuscula, 1 numero, 1 mayuscula, 1 caracter especial"];
    if (password[0].length < 8) return [true, "El password debe tener al menos 8 caracteres"];
    if (password[0] !== password[1]) return [true, "Los passwords no coinciden"];
    return [false, null];
}

$(registerForm).submit(function (e) {
    e.preventDefault();
    const form = new FormData(registerForm);
    const name = form.get("name");
    const emailAddress = form.get("emailAddress");
    const password = form.getAll("password");
    const [err, msg] = verifyRegister(name, emailAddress, password);
    if (err) {
        displayMsg(err, msg, registerForm);
    } else {
        displayMsg(err, "se ha registrado correctamente", registerForm);
        users.push(new User(name, emailAddress, password[0]));
        localStorage.setItem("users", JSON.stringify(users));
        window.location.reload();
    }
});