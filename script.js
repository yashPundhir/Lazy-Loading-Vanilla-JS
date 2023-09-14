// JavaScript function to create and append the card when the button is clicked
function createCard(data) {
	// Create the card element
	const card = document.createElement("div");
	card.className = "card w-[300px] bg-base-100 shadow-xl border-4 h-auto ";

	// Create the figure element
	const figure = document.createElement("figure");
	figure.className = "px-10 pt-10";

	// Create the image element
	const image = document.createElement("img");
	image.src = data.image;
	image.alt = "Shoes";
	image.className = "rounded-xl h-[250px] w-auto";

	// Append the image to the figure
	figure.appendChild(image);

	// Create the card body element
	const cardBody = document.createElement("div");
	cardBody.className = "card-body items-center text-center";

	// Create the card title element
	const cardTitle = document.createElement("h2");
	cardTitle.className = "card-title";
	cardTitle.textContent = `${data.title.slice(0, 50)}...`;

	// Create the paragraph element
	const paragraph = document.createElement("p");
	// paragraph.textContent = data.description;
	paragraph.className = "mb-4 mt-2";
	paragraph.textContent = `${data.description.slice(0, 120)}...`;

	// Create the card actions element
	const cardActions = document.createElement("div");
	cardActions.className = "card-actions";

	// Create the "Buy Now" button
	const buyNowButton = document.createElement("button");
	buyNowButton.className = "btn btn-primary";
	buyNowButton.textContent = "Buy Now";

	// Append the card title, paragraph, and button to the card body
	cardBody.appendChild(cardTitle);
	cardBody.appendChild(paragraph);
	cardBody.appendChild(cardActions);
	cardActions.appendChild(buyNowButton);

	// Append the figure and card body to the card
	card.appendChild(figure);
	card.appendChild(cardBody);

	// Append the card to the document body
	container.appendChild(card);
}

// Select the container div
let container = document.getElementById("container");

const loader = document.getElementById("loader");

const end = document.getElementById("end");

function showLoadingIndicator() {
	loader.style.display = "flex";
}
function showEndingIndicator() {
	end.style.display = "flex";
}

function hideLoadingIndicator() {
	loader.style.display = "none";
}

const productsPerPage = 12; // Number of products to load per batch
let isLoading = false; // Flag to prevent multiple simultaneous requests
let totalProductsLoaded = 0; // Track the total number of products loaded

function loadMoreProducts() {
	if (isLoading || totalProductsLoaded >= 120) return;

	isLoading = true;

	showLoadingIndicator(); // Show the loading indicator

	// Fetch the next batch of products

	fetch(`https://fakestoreapi.com/products?limit=${productsPerPage}`)
		.then((response) => {
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			return response.json();
		})
		.then((newProducts) => {
			isLoading = false;
			hideLoadingIndicator(); // Hide the loading indicator
			if (newProducts.length === 0) {
				// No more products to load
				// You can hide a "Load More" button or provide some feedback
			} else {
				// Append the new products to your existing list
				newProducts.forEach((item) => {
					createCard(item);
					totalProductsLoaded++;
					if (totalProductsLoaded >= 120) {
						// Stop loading new products when the limit is reached
						showEndingIndicator();
						return;
					}
				});
			}
		})
		.catch((error) => {
			console.error("Error loading products:", error);
			isLoading = false;
		});
}

// Event listener for scroll
window.addEventListener("scroll", () => {
	const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

	// Check if the user has scrolled near the bottom
	if (scrollTop + clientHeight >= scrollHeight - 200) {
		loadMoreProducts();
	}
});

// Initial load
loadMoreProducts();

// async function fetchData() {
// 	try {
// 		const response = await fetch("https://fakestoreapi.com/products?limit=12");

// 		if (!response.ok) {
// 			throw new Error("Network response was not ok");
// 		}

// 		const data = await response.json();

// 		return data;
// 	} catch (error) {
// 		console.error("Fetch error:", error);
// 	}
// }

// async function main() {
// 	try {
// 		let products = await fetchData();
// 		let data = [];
// 		data.push(...products);
// 		data.push(...products);
// 		data.push(...products);
// 		data.push(...products);
// 		data.push(...products);
// 		// console.log(data[0]);
// 		data.forEach((item) => {
// 			setTimeout(() => {
// 				createCard(item);
// 			}, 500);
// 		});
// 	} catch (error) {
// 		console.error("Main error:", error);
// 	}
// }

// main();
