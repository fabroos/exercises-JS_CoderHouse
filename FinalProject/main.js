const ordering = {
	category: "all",
	sorted: true
};

const user = JSON.parse(localStorage.getItem("user")) || JSON.parse(sessionStorage.getItem("user"));

const cart = JSON.parse(localStorage.getItem("cart")) || {
	products: [],
	total: 0
};


// Servicios

async function getProducts() {
	let res;
	try {
		await $.ajax({
			type: "GET",
			url: "https://fakestoreapi.com/prodsucts",
			data: "data",
			dataType: "JSON",
			success: function (response) {
				res = response;
			},

		});
	} catch (e) {
		res = false;
	}
	return res;
}


// este no lo use al final
async function getSingleProduct(id) {
	let product;
	await $.ajax({
		type: "GET",
		url: "https://fakestoreapi.com/products/" + id,
		data: "data",
		dataType: "JSON",
		success: function (response) {
			product = response;
		}
	});
	return product;
}



// funcion para mostrar un producto solo

function handleCartBtn(product) {
	if (localStorage.getItem("cart")) {

	} else {
		createCart();
	}
}

function displaySingleProduct(product, products) {
	console.log(product);
	const {
		title,
		image,
		price,
		id,
		description
	} = product;
	$("#galleryNav").empty();
	$("#galleryNav").append(`
		<div id="backBtn" class="absolute top-5 right-5 font-bold hover:underline cursor-pointer z-10">Go Back</div>
		<div class=" p-6 flex flex-col mx-auto h-full col-span-4 z-0">
				<div href="#" class="h-full relative pb-8">
					<img class=" w-96 h-96 object-contain object-center p-2 m-auto"
						src="${image}" id="${id}">
					<div class="pt-3 flex items-center justify-between">
						<div class="flex flex-col">
							<p class="">${title}</p>
							<p class="text-sm text-gray-600 max-w-prose">${description}</p>
						</div>
				
					</div>
					<div class="flex justify-between mt-2">
						<p class="pt-1  text-gray-900">$${price}</p>
					<div class="flex">
						<svg class="h-6 w-6 fill-current mx-2 text-gray-500 hover:text-black " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
							<path d="M12,4.595c-1.104-1.006-2.512-1.558-3.996-1.558c-1.578,0-3.072,0.623-4.213,1.758c-2.353,2.363-2.352,6.059,0.002,8.412 l7.332,7.332c0.17,0.299,0.498,0.492,0.875,0.492c0.322,0,0.609-0.163,0.792-0.409l7.415-7.415 c2.354-2.354,2.354-6.049-0.002-8.416c-1.137-1.131-2.631-1.754-4.209-1.754C14.513,3.037,13.104,3.589,12,4.595z M18.791,6.205 c1.563,1.571,1.564,4.025,0.002,5.588L12,18.586l-6.793-6.793C3.645,10.23,3.646,7.776,5.205,6.209 c0.76-0.756,1.754-1.172,2.799-1.172s2.035,0.416,2.789,1.17l0.5,0.5c0.391,0.391,1.023,0.391,1.414,0l0.5-0.5 C14.719,4.698,17.281,4.702,18.791,6.205z" />
						</svg>
						<svg id="addToCartBtn" title="Add to cart"  class=" h-6 w-6 cursor-pointer fill-current text-gray-500 mx-2 hover:text-black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
							<path fill="none" d="M0 0h24v24H0z"/>
							<path fill="currentColor" d="M4 16V4H2V2h3a1 1 0 0 1 1 1v12h12.438l2-8H8V5h13.72a1 1 0 0 1 .97 1.243l-2.5 10a1 1 0 0 1-.97.757H5a1 1 0 0 1-1-1zm2 7a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm12 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"/>
						</svg>
					</div>
					</div>
					
				</div>
			</div>`);
	// Route para volver atras 
	$("#backBtn").click(function (e) {
		e.preventDefault();
		displayProducts(products, "");
		$("#store").show();
	});
	$("#addToCartBtn").click((e) => handleCartBtn(product));
}

// funcion para devolver el producto con el id pasado como parametro
function findProductId(products, el) {
	const id = el.attr("id");
	return products.find(p => p.id == id);
}

function displayProducts(products, query, ascendent, order) {
	// si hay un parametro de busqueda filtra esos resultados
	products = query == "" ? products : products.filter(product => product.title.toLowerCase().includes(query));
	// ordena los parametros por el parametro indicado
	products = orderBy(products, order);
	console.log(products);

	// y lo ordena de mayor a menor segun el global state
	if (ascendent) products.sort();
	else products.reverse();

	// vacio el container y lo lleno si el array tiene por lo menos un objeto y genero un enroutador por id
	$("#galleryNav").empty();
	if (products.length > 0) {
		for (const product of products) {
			const {
				image,
				title,
				price,
				id,
				category
			} = product;
			$("#galleryNav").append(`
			<div class=" p-6 flex flex-col mx-auto h-full">
					<a href="#" class="h-full relative pb-8">
						<img class="hover:grow hover:shadow-lg w-96 h-96 object-contain object-center p-2"
							src="${image}" id="${id}">
							<p class="">${title}</p>
	
						<p class="pt-1 absolute bottom-0 text-gray-900">$${price}</p>
					</a>
				</div>`);
		}
		// activo el enroutador cuando se le declick
		$("#galleryNav img").click(async function (e) {
			const product = findProductId(products, $(this));
			displaySingleProduct(product, products);
			$("#store").hide();
		});
	} else {
		$("#galleryNav").append(`<h4 class="text-2xl font-bold col-span-4 p-3 text-center">No results found</h4>`);
	}
}


// Setting a funtion to get the prodcts and save him in sessionStorage to save resourses 

function errorPage() {
	$("#galleryNav").empty();
	$("#galleryNav").append(`
		<div class="col-span-4 font-bold text-center p-3 text-red-600"><h2>Error loading results reload the page or wait a minute</h2></div>
	`);
}

async function updateProducts(query = "") {
	$("#galleryNav").append(`<img class="col-span-4 mx-auto" src="https://c.tenor.com/tEBoZu1ISJ8AAAAC/spinning-loading.gif">`);
	const products = JSON.parse(sessionStorage.getItem("products")) || await getProducts();
	if (!products) return errorPage();
	if (!sessionStorage.getItem("products")) sessionStorage.setItem("products", JSON.stringify(products));

	$("#galleryNav").empty();
	displayProducts(products, query, ordering.sorted, $("#opt").val());
}


// Orders parameters

function ToggleSort() {
	ordering.sorted = !ordering.sorted;
	updateProducts();
	$("#toggleSort span").text(ordering.sorted ? "	↑" : "	↓");
}

function toggleSearch(e) {
	console.log("gol");
	e.preventDefault();
	$(".search").toggleClass('active');
	$(".input").focus();
}

function orderBy(list, by) {
	if (by == "trending") return list;
	return list.sort((a, b) => {
		if (a[by] < b[by]) {
			return -1;
		}
		if (a[by] > b[by]) {
			return 1;
		}
		return 0;
	});
}

// function user






// Functions to cart
// class productInCart {
// 	constructor({price})
// };



function addToList(item) {

}

function createCart(firstItem) {
	localStorage.setItem("cart", {
		products: [firstItem],
		totalCart: firstItem.price,
	});
}

function calculateTotal(list) {

}

// functions to favorite


// login functions


$(document).ready(async function () {
	// Header navbar responsive
	$("#navbarBtn").click(function (e) {
		e.preventDefault();
		$("#menu").toggleClass("hidden");

	});


	// Verify if user is logged
	if (localStorage.getItem("user") || sessionStorage.getItem("user")) {
		$("#loginBtn").replaceWith(`<li class="hover:text-black hover:scale-110 cursor-pointer mt-4 md:mt-0" id="profileBtn">${user.name}</li>`);
	}

	updateProducts();
	$("#toggleSort").click(ToggleSort);
	$("#toggleSearch svg").click(toggleSearch);
	$('#searchInput:input').on('propertychange input', function (e) {
		var valueChanged = false;

		if (e.type == 'propertychange') {
			valueChanged = e.originalEvent.propertyName == 'value';
		} else {
			valueChanged = true;
		}
		if (valueChanged) {
			console.log(this);
			updateProducts(this.value.toLowerCase());
		}
	});
	$("#opt").change(function (e) {
		e.preventDefault();
		updateProducts($("searchInput").val());
	});
});