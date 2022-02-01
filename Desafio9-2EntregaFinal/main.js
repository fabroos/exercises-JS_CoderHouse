class Chat {
  constructor(to) {
    this.to = to;
  }
}

const getUser = () => {
  if (!localStorage.getItem("user") && !sessionStorage.getItem("user")) return null;
  return JSON.parse(localStorage.getItem("user")) || JSON.parse(sessionStorage.getItem("user"));
};


// ? get users and user logged
const user = getUser();
const users = JSON.parse(localStorage.getItem("users")) || [];



addEventListener("load", () => {
  console.log(users);
  if (!user) window.location.href = "./login.html";


  fillUsersContacts();
  displayChats();
});



function displayChats() {
  console.log(user);
  const {
    chats
  } = user;
  if (chats.length < 1) {
    // TODO -> display message "no messages"
  } else {
    // TODO -> display messages
  }
}



function fillUsersContacts() {
  const container = document.getElementById("createChatUL");
  const fragment = document.createDocumentFragment();
  const newUsers = users.filter(us => us.email !== user.email)
  if (newUsers.length > 0) {
    newUsers.forEach(user => {
      const className = "border-b whitespace-nowrap hover:bg-zinc-200 px-4 ";
      const li = document.createElement("li");
      li.classList.value = className;
      li.textContent = user.name;
      li.setAttribute("email", user.email);
      fragment.appendChild(li);
    });
  } else {
    const div = document.createElement("div");
    div.textContent = "No hay contactos, tu eres el unico espera a que se una mas gente";
    const className = "whitespace-nowrap ";
    div.classList.value = className;
    fragment.appendChild(div);
  }

  container.appendChild(fragment);
}




document.getElementById("createChatBtn").addEventListener("click", (e) => {
  document.getElementById("createChatUL").classList.toggle("hidden");
  const email = e.target.getAttribute("email");

  // detect a click on a item with a attribute email
  if (email != null) {
    const selectedUser = users.find(user => user.email === email);
    const {
      name,
      emailAdress,
      status
    } = selectedUser;



    const className = "shadow-lg rounded-2xl w-64  border bg-white ";
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="">
        <div class="rounded-t-lg h-28 w-full mb-4 bg-gray-300"></div>
        <div class="flex flex-col items-center justify-center p-4 -mt-16">
            <a href="#" class="block relative">
                <div class=" object-cover rounded-full h-16 w-16 bg-blue-400 flex items-center justify-center p-6 border-4 border-white font-bold text-white">
                ${name.includes(" ") ? name.split(" ")[0][0] + name.split(" ")[1][0] : name[0]}
                </div>
            </a>
            <p class="text-gray-800  text-xl font-medium mt-2">
                ${name}
            </p>
            <p class="text-gray-400 text-xs">
                ${status}
            </p>
            <div class="flex items-center justify-between gap-4 w-full mt-8">
                <button type="button" class="py-2 px-4  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                    See profile
                </button>
            </div>
        </div>
    </div>
    `;
    div.classList.value = className;

    if (document.getElementById("content").firstChild) document.getElementById("content").removeChild(document.getElementById("content").firstChild);
    document.getElementById("content").appendChild(div);
  }
}, true);


document.getElementById("logOutButton").addEventListener("click", () => {
  const out = confirm("¿estas seguro de querer cerrar sesion?");
  if (!out) return;
  localStorage.removeItem("user");
  sessionStorage.removeItem("user");
  window.location.reload();
});