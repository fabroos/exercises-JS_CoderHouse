/* 
    Para el proyecto decidi hacer un clon de discord o algo asi.
    tengo ideas pensadas asi que ya veremos que se cuese
    ideas 💡: 
    - integrar api de giphy o alguna otra api que este interesante 
    - quiza integrar una base de datos (no se usar bases de datos xd)
*/



// declaring variables and classes

let user;
class User {
    constructor(username, firstName, lastName, email, password){
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }
    status = "Disponible";
    changeStatus(newStatus){
        this.status = newStatus;
    }
    displayResults(){
        return "welcome " + this.firstName.toUpperCase() + "\n" + Object.keys(this).map(p => "-" + p + " : " + this[p]).join("\n");
    }
}
const accounts = [{}];


// create an account to test xd 
accounts.push( new User("a", "a", "a", "a", "a", "a", "a", "a","a" ));
accounts.push( new User("b", "b", "b", "b", "b", "b", "a", "b","a" ));
// ------------------------------ Verifications -------------------------
function verifyPassword(){
    let password = "";
    let verified = [false, null]
    while(!verified[0]){
        password = prompt("Enter your password").trim();
        if(password.length < 8){
            verified = [false, "password too much short (min: 8 char)"]
        }else if(password.length > 16){
            verified = [false, "password too much large (max: 16 char)"]        
        }else if(!/\d/.test(password)){
            verified = [false, "password must be contain a number"]
        }else if(!/[a-zA-Z]/.test(password)){
            verified = [false, "password must be contain a letter"]
        }
        else{
            verified = [true, null]
        }
        if(verified[1]){
            alert(verified[1])
        }
    }
    return password
}

function verifyUser(){
    let username = prompt("Enter your username")
    let finded = !accounts.some(a => a.username === username);
    while(!finded){
        alert("username has already been taken");
        let username = prompt("Enter your username")
        finded = !accounts.some(a => a.username === username);
    }
    return username
}

// ----------------------------- options when are signed up  -----------------------------

function loged(){
    let op = 0;
    while(op != 3 || op != 1){
        console.log(user)
        console.log(user.displayResults())
        let op = parseInt(prompt(user.displayResults() + "\nelige la opcion:\n1-sign out\n2-definir/cambiar estado\n"));
        switch(op){
            case 1: return signOut(); 

            case 2: user.changeStatus(prompt("cual quiere que sea su estado"));
                    break;
        }
    }
}

function signOut(){
    user = {};
    Main();
}


// ----------------------------- options when register or sign in -----------------------------
function register(){
    const firstName = prompt("Enter your first name").trim();
    const lastName = prompt("Enter your last name").trim();
    const username = verifyUser();
    const email = prompt("Enter your email").trim();
    const password = verifyPassword();
    accounts.push(new User(username, firstName, lastName, email, password));
    alert("Your account has created");
    Main();
}

function logIn(){
    let username = prompt("username");
    let password = prompt("password");
    let account = accounts.find(ac => {
        if(ac.username === username){
            return ac;
        };
    });
    console.log(account);
    if(account === undefined){
        alert("el username o el password no coinciden");
        Main();
    }
    else if(password === account.password && account.username === account.username){
        user = account;
        alert("felicidades ingresaste");
        return loged();
    }else{
        alert("el username o el password no coinciden")
        Main();
    }
}

// ---------------------------- root function ----------------------------

function Main(){
    let op;
    while(op != 3){
        op = parseInt(prompt("1- register\n2- LogIn\n3- exit"));
        switch(op){
            case 1: return register();
                    break;
            case 2: return logIn();
                    break;
            case 3: null;
                    break;
            default:alert("opcion incorrecta")
                    break;
        }
    }
}

Main()