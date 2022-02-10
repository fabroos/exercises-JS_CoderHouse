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
console.log(user);

if (!user) {
  location.href = "./login.html";
}

function logOut() {
  const indexUser = users.findIndex(us => us.id == user.id);
  if (indexUser != -1) {
    users[indexUser] = user;
  }
  localStorage.removeItem("user");
  sessionStorage.removeItem("user");
  location.href = "./login.html";
}

function mainSection() {
  $("#content").empty();
  $("#content").append(users.length ?
    `<ul class="h-full w-full py-8 absolute">${users.map(us => "<li class='p-2 border-b hover:bg-zinc-200 cursor-pointer'>" + us.name + "</li>").join("")}</ul>` :
    `<div class="flex items-center gap-3">
                          <h3 class="inline text-xl text-zinc-500">Lo siento no hay mensajes</h3><span class="text-zinc-500 inline"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path fill="currentColor" d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-5-3a5 5 0 0 1 10 0h-2a3 3 0 0 0-6 0H7zm1-6a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm8 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/></svg></span>
                        </div>`);
}

$(document).ready(function () {
  mainSection();
  $("#logOutButton").click(function (e) {
    e.preventDefault();
    $("body").append(
      `<div class="absolute h-full w-full bg-black/40 grid place-content-center top-0 left-0" id="modalLogout">
        <div class="flex flex-col gap-3 p-10 bg-white rounded-2xl">
          <span>¿Estas seguro que quieres salir?</span>
          <div class="flex gap-3 justify-center">
            <button id="confirmLogout" class="px-4 py-1 bg-blue-500 hover:bg-blue-700 text-white font-bold">Salir</button>
            <button id="cancelLogout" class="px-4 py-1 bg-red-500 hover:bg-red-700 text-white font-bold">Cancelar</button>
          </div>
        </div>
      </div>`
    );
    $("#confirmLogout").click(function (e) {
      e.preventDefault();
      logOut();
    });
    $("#cancelLogout").click(function (e) {
      e.preventDefault();
      $("#modalLogout").remove();
    });
  });

  $("#accountBtn").click(function (e) {
    e.preventDefault();
    $("#content").empty();
    const {
      name,
      email,
      status
    } = user;
    $("#content").append(
      `      <div class="h-full w-full grid place-content-center">
              <div class="shadow-lg rounded-2xl w-64 bg-white relative" id="card">
                  <button id="closeCard" class="absolute right-4 top-4 cursor-pointer text-white hover:scale-110"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path fill="none" d="M0 0h24v24H0z"/><path fill="currentColor" d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" fill="rgba(255,255,255,1)"/></svg></button>
                  <div alt="profil" src="/images/landscape/1.jpg" class="rounded-t-lg h-28 w-full mb-4 bg-gray-500"></div>
                  <div id="expandFoto" class="flex flex-col items-center justify-center p-4 -mt-16">
                      <a href="#" class="block relative">
                          <div alt="profil" class="mx-auto object-cover rounded-full h-16 w-16 border-2 border-white bg-blue-500 text-white font-bold flex items-center justify-center">
                          ${name.includes(" ") ? (name.split(" ")[0][0] + name.split(" ")[1][0]) : name[0] }
                          </div>
                      </a>
                      <p class="text-gray-800 text-xl font-medium mt-2">
                          ${name}
                      </p>
                      <p class="text-gray-400 text-xs  text-center">
                          ${email}
                      </p>

                        <p class="text-gray-400 text-xs">
                            ${status}
                            
                        </p>
                    <button id="editProfileBtn" class="bg-blue-500 hover:bg-blue-700 cursor-pointer flex gap-2 items-center text-white font-bold py-1 rounded-md px-4 my-2"><p>Editar Perfil</p><span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path fill="none" d="M0 0h24v24H0z"/><path d="M6.414 16L16.556 5.858l-1.414-1.414L5 14.586V16h1.414zm.829 2H3v-4.243L14.435 2.322a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414L7.243 18zM3 20h18v2H3v-2z" fill="rgba(255,255,255,1)"/></svg></span></button>
                  </div>
              </div>
            </div>`
    );
    $("#closeCard").click(function (e) {
      e.preventDefault();
      mainSection();
    });
    $("#editProfileBtn").click(function (e) {
      e.preventDefault();
      $("#content").empty();
      $("#content").append(`
      
    <div class="p-16 hidden" id="editForm">
    
      <section class="w-full max-w-2xl px-6 py-4 mx-auto bg-white rounded-md shadow-md h-full relative">
      <button id="closeCard" class="absolute right-4 top-4 cursor-pointer hover:scale-110"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path fill="none" d="M0 0h24v24H0z"/><path fill="currentColor" d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" fill="rgba(255,255,255,1)"/></svg></button>
      <h2 class="text-3xl font-semibold text-center text-gray-800 ">Get in touch</h2>
      <p class="mt-3 text-center text-gray-600 400">Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
      
      <div class="grid grid-cols-1 gap-6 mt-6 sm:grid-cols-2 md:grid-cols-3">
          <a href="#" class="flex flex-col items-center px-4 py-3 text-gray-700 transition-colors duration-200 transform rounded-md  hover:bg-blue-200 lue-500">
              <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
              </svg>
      
              <span class="mt-2">121 Street, NY</span>
          </a>
      
          <a href="#" class="flex flex-col items-center px-4 py-3 text-gray-700 transition-colors duration-200 transform rounded-md  hover:bg-blue-200 lue-500">
              <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
      
              <span class="mt-2">+2499999666600</span>
          </a>
      
          <a href="#" class="flex flex-col items-center px-4 py-3 text-gray-700 transition-colors duration-200 transform rounded-md  hover:bg-blue-200 lue-500">
              <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
      
              <span class="mt-2">example@example.com</span>
          </a>
      </div>
      
      <div class="mt-6 ">
          <div class="items-center -mx-2 md:flex">
              <div class="w-full mx-2">
                  <label class="block mb-2 text-sm font-medium text-gray-600 ">Name</label>
      
                  <input class="block w-full px-4 py-2 text-gray-700 bg-white border rounded--800 300 y-600 focus:border-blue-400 focus:ring-blue-300 er-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" type="text">
              </div>
      
              <div class="w-full mx-2 mt-4 md:mt-0">
                  <label class="block mb-2 text-sm font-medium text-gray-600 ">E-mail</label>
      
                  <input class="block w-full px-4 py-2 text-gray-700 bg-white border rounded--800 300 y-600 focus:border-blue-400 focus:ring-blue-300 er-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" type="email">
              </div>
          </div>
      
          <div class="w-full mt-4">
              <label class="block mb-2 text-sm font-medium text-gray-600 ">Message</label>
      
              <textarea class="block w-full h-40 px-4 py-2 text-gray-700 bg-white border rounded--800 300 y-600 focus:border-blue-400 er-blue-300 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"></textarea>
          </div>
      
          <div class="flex justify-center mt-6">
              <button class="px-4 py-2 text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700">Send Message</button>
          </div>
      </div>
      </section>
    </div>
      
      `);
      $("#editForm").fadeIn();

      $("#closeCard").click(function (e) {
        e.preventDefault();
        mainSection();
      });
    });
  });
  $("#chatsBtn").click(function (e) {
    e.preventDefault();
    $("#editForm").fadeOut();
    mainSection();
  });
});