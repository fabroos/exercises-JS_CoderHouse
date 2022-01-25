/*jshint esversion: 11 */


// A pathname for redirect, when i deploy that dont be necessary
const pathname = "/FinalProject";



// load page and you are signed up

addEventListener("load", ()=>{

    const account = localStorage.getItem("account") ?? sessionStorage.getItem("account");
    const user = JSON.stringify(account);


    // if we are loged redirect to index
    if(account){
        if(window.location.pathname != pathname + "/index.html") window.location.href  =  pathname + "/index.html";
        console.log(window.location.pathname);
    // if we arent loged, and we are in index, redirect to the
    }else{
        if(window.location.pathname == pathname + "/index.html") window.location.href =  pathname + "/login.html";

    }

    const loged = sessionStorage.getItem("recentLoged") || false;
    if(loged){
        dispalyAlertMessage("Registered successfully", document.getElementById("alert"), "green");
        sessionStorage.removeItem("recentLoged");
}
});



// declaring variables and classes



class User {
    constructor(username, firstName, lastName, email, password){
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.saldo = "a";
        this.status = "Disponible";
    }
    // agrego esto para cumplir el objetivo 3 de la entrega (Crear funciones y/o métodos para realizar operaciones (suma, resta, concatenación, división, porcentaje, etc).)
    
    doTransition(amount){
        if(isNaN(parseInt(amount))) return alert("debes ingresar un valor numerico");
        if(amount < 0) return alert("debes ingresar un valor positivo");
        
        let res = this.saldo - amount;
        if(res < 0) return alert("error, no dismones de esa cantidad de saldo");


        this.saldo = res;
        return alert(`operacion realizada con exito, tu nuevo saldo es: ${this.saldo}`);
    }
    changeStatus(newStatus){
        this.status = newStatus;
    }
    displayResults(){
        return "welcome " + this.firstName.toUpperCase() + "\n" + Object.keys(this).map(p => "-" + p + " : " + this[p]).join("\n");
    }
}

const accounts = localStorage.getItem("accounts") ? JSON.parse(localStorage.getItem("accounts")) : [];


// ------------ create users to test ----------
accounts.push( new User("a", "a", "a", "a", "a", "a", "a", "a","a" ));
accounts.push( new User("b", "b", "b", "b", "b", "b", "a", "b","a" ));

// ---------------------------- Alerts ----------------------------

function dispalyAlertMessage(msg, el, color){
    const alertHTML = ` 
                        <div class="w-full text-white bg-${color}-500 ">
                            <div class="container flex items-center justify-between px-6 py-4 mx-auto">
                                <div class="">
                                    <p class="mx-3 max-w-prose text-xs">${msg}</p>
                                </div>
                            </div>
                        </div>
                        `;
    el.innerHTML = alertHTML;
}

// ------------------------------ Verifications -------------------------

function verifyRegister({username, firstName, lastName, email, password, passwordConfirmation}) {
    if(username.length < 6) return [true, "Username need to be at least 6 characters long"];
    if(username.length > 16) return [true, "The username must have a maximum of 16 characters"];
    if(verifyUsernameInDB(username)) return [true, "The username has already registered"];
    if(username === "") return [true, "You need to provide a username"];
    if(firstName === "") return [true, "You need to provide a first name"];
    if(lastName === "") return [true, "You need to provide a last name"];
    if(email === "") return [true, "You need to provide a email"];
    if(password.length < 8) return [true, "password need to be at least 8 characters long"];
    if(password.length > 14) return [true, "The password must have a maximum of 14 characters"];
    if(password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm) === null) return [true, "The password need at least one uppercase letter, one lowercase letter and one number"];
    if(password !== passwordConfirmation) return [true, "The passwords not match"];
    return [false, null];
}

// ----------------------------- options when are signed up  -----------------------------

// ---------------------------- Log Out ----------------------------

if(document.getElementById("logOut")){
    document.getElementById("logOut").addEventListener("click", e => {
        localStorage.removeItem("account");
        sessionStorage.removeItem("account");
        window.location.pathname = pathname + "/login.html";
    });
}



// ----------------------------- register  -----------------------------

// if we are in section register execute register()
if(document.getElementById("registerForm")){
    const registerForm = document.getElementById("registerForm");
    registerForm.addEventListener("submit", register);
}


function register(e){
    e.preventDefault();
    const form = new FormData(registerForm);
    const userToCreate = {};
    for(let entry of form){
        userToCreate[entry[0]] = entry[1];
    }
    const [error, msg] = verifyRegister(userToCreate);
    if(error) return dispalyAlertMessage(msg, document.getElementById("alert"), "red");
    accounts.push( new User(...Object.keys(userToCreate).map(e => userToCreate[e])));
    // set a message when has send to login
    sessionStorage.setItem("recentLoged", true);
    // Set account history in local storage
    localStorage.setItem("accounts", JSON.stringify(accounts));
    //  Redirect to login
    window.location.href = "./login.html";
}

//  ----------------------------- sign in -----------------------------

if(document.getElementById("loginForm")){
    const loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const form = new FormData(document.getElementById("loginForm"));
    const user_email = form.get("username/email");
    const password = form.get("password");
    const stayLogged = form.get("stayLogged") === null ? false : true;
    verifyLogin(user_email, password, stayLogged);
});
}

function verifyUsernameInDB(q){
    const account = accounts.find(ac => {
        if(ac.username === q || ac.email === q){    
            return ac;
        }
    });
    return account === undefined ? false : account;
}

function verifyLogin(username, password, stayLogged) {
    const account = verifyUsernameInDB(username);
    console.log(account);


    // 
    if(account === undefined){
        // La cuenta no existe
        dispalyAlertMessage("el usuario no se encuentra", document.getElementById("alert"), "red");
    }

    // datos correctos
    else if(password === account.password && account.username === account.username){
        // cambia el estado global de la app
        dispalyAlertMessage("Log in successfully", document.getElementById("alert"), "green");
        let staylogged = stayLogged ? localStorage.setItem("account", JSON.stringify(account)) : sessionStorage.setItem("account", JSON.stringify(account));
        // redirect to index
        window.location.href = "./index.html";
    }else{
        // el password esta mal
        dispalyAlertMessage("el password es incorrecto", document.getElementById("alert"), "red");
    }
}


// ---------------------------------------- Index ----------------------------------------------------------------

// When you was logged in

// Manage aside hover

if(document.getElementById("aside-container")){
    const aside = document.getElementById("aside-container");

aside.addEventListener("mouseenter", ()=>{
    document.querySelectorAll(".maximized").forEach(it => {
        it.classList.remove("hidden");
    });
});
aside.addEventListener("mouseleave", ()=>{
    document.querySelectorAll(".maximized").forEach(it => {
        it.classList.add("hidden");
    });
});
}

// Show profile
if(document.getElementById("profileBtn")){
    document.getElementById("profileBtn").addEventListener("click", async ()=>{
        const profile = JSON.parse(localStorage.getItem("account")) || JSON.parse(sessionStorage.getItem("account"));
        console.log(profile);
        // const avatar = await fetch(`https://avatars.abstractapi.com/v1/?api_key=54449c83799d414ca1bca0c4519257a1&name=${profile.firstName} ${profile.lastName}`).then(res => res.url);
        let av = await `https://avatars.abstractapi.com/v1/?api_key=54449c83799d414ca1bca0c4519257a1&name=${profile.firstName} ${profile.lastName}&image_size=440`;
        const profileCard = `
        <div class="bg-white font-semibold text-center rounded-3xl border shadow-lg p-10 max-w-xs m-auto">
                <img class="mb-3 w-32 h-32 rounded-full shadow-lg mx-auto" src="${av}" alt="product designer">
                <h2 class="text-lg text-gray-700"> ${profile.username} </h2>
                <h3 class="text-sm text-gray-400 "> ${profile.firstName} ${profile.lastName} </h3>
                <p class="text-xs text-gray-400 mt-4">status: ${profile.status}</p>
                <button class="bg-gray-800 px-8 py-2 mt-8 rounded-3xl text-gray-100 font-semibold uppercase tracking-wide">Edit Profile</button>
            </div>
        `;
        const profileDiv = document.createElement('div');
        profileDiv.innerHTML = profileCard;
        profileDiv.id = "content";
        if(document.getElementById("content")) document.getElementById("main").removeChild(document.getElementById("content"));
        document.getElementById("main").appendChild(profileDiv);
    
    });
}



