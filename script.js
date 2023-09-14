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
