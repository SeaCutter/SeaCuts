/* const addToCartButtons = document.querySelectorAll('.add-to-cart');
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
*/

const addToCartButtons = document.querySelectorAll('.add-to-cart');
const buyNowButton = document.querySelector('#buy-now');
const cartItems = document.querySelector('.cart-items');

let cart = [];

addToCartButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const fishName = button.parentElement.querySelector('.fish-name').textContent;
        const fishPrice = button.parentElement.querySelector('.fish-price').textContent;

        addToCart(fishName, fishPrice);
    });
});

function addToCart(name, price) {
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].name === name) {
            cart[i].count++;
            updateCart();
            return;
        }
    }
    cart.push({ name, price, count: 1 });
    updateCart();
}

function updateCart() {
    cartItems.innerHTML = '';
    for (let i = 0; i < cart.length; i++) {
        const item = document.createElement('li');
        const itemInfo = document.createElement('div');
        const itemName = document.createElement('h3');
        const itemCount = document.createElement('span');
        const itemPrice = document.createElement('span');
        const itemRemove = document.createElement('button');

        item.classList.add('cart-item');
        itemName.textContent = cart[i].name;
        itemCount.textContent = ` x${cart[i].count}`;
        itemPrice.textContent = cart[i].price;
        itemRemove.textContent = 'Remove';
        itemRemove.addEventListener('click', () => {
            cart.splice(i, 1);
            updateCart();
        });

        itemInfo.appendChild(itemName);
        itemInfo.appendChild(itemCount);
        itemInfo.appendChild(itemPrice);
        item.appendChild(itemInfo);
        item.appendChild(itemRemove);
        cartItems.appendChild(item);
    }
}

buyNowButton.addEventListener('click', (event) => {
    event.preventDefault();
    const name = document.querySelector('#name').value;
    const address = document.querySelector('#address').value;
    const phone = document.querySelector('#phone').value;

    let items = [];

    for (let i = 0; i < cart.length; i++) {
        items.push(`${cart[i].name} - ${cart[i].price} x${cart[i].count}`);
    }

    const totalPrice = cart.reduce((total, item) => {
        return total + (parseFloat(item.price) * item.count);
    }, 0).toFixed(2);

    const message = `Order received\nName: ${name}\nAddress: ${address}\nPhone: ${phone}\nItems: ${items.join(', ')}\nTotal price: ${totalPrice}`;

    window.open(`https://wa.me/919607040169?text=${encodeURIComponent(message)}`);

    alert('Order received!');

    cart = [];
    updateCart();
});

