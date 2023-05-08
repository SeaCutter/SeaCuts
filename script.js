const addToCartButtons = document.querySelectorAll('.add-to-cart');
const buyNowButton = document.querySelector('#buy-now');

addToCartButtons.forEach((button) => {
	button.addEventListener('click', () => {
		alert('Added to cart!');
	});
});

buyNowButton.addEventListener('click', (event) => {
	event.preventDefault();
	const name = document.querySelector('#name').value;
	const address = document.querySelector('#address').value;
	const phone = document.querySelector('#phone').value;
	const cartItems = document.querySelectorAll('.fish-menu li');
	let items = [];

	cartItems.forEach((item) => {
		const itemName = item.querySelector('h3').textContent;
		const itemPrice = item.querySelector('.price').textContent;
		items.push(`${itemName} - ${itemPrice}`);
	});

	const totalPrice = Array.from(cartItems)
		.reduce((acc, item) => acc + parseFloat(item.querySelector('.price').textContent), 0)
		.toFixed(2);

	const message = `Order received\nName: ${name}\nAddress: ${address}\nPhone: ${phone}\nItems: ${items.join(', ')}\nTotal price: ${totalPrice}`;

	window.open(`https://wa.me/919607040169?text=${encodeURIComponent(message)}`);

	alert('Order received!');
});
