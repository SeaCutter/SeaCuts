const addToCartButtons = document.querySelectorAll('.add-to-cart');
const buyNowButton = document.querySelector('#buy-now');
const plusButtons = document.querySelectorAll('.plus-button');
const minusButtons = document.querySelectorAll('.minus-button');
const countSpans = document.querySelectorAll('.count');

/* addToCartButtons.forEach((button) => {
	button.addEventListener('click', () => {
		alert('Added to cart!');
	});
});
*/
for (let i = 0; i < plusButtons.length; i++) {
    plusButtons[i].addEventListener('click', () => {
        const count = parseInt(countSpans[i].textContent);
        countSpans[i].textContent = count + 1;
        minusButtons[i].removeAttribute('disabled');
    });

    minusButtons[i].addEventListener('click', () => {
        const count = parseInt(countSpans[i].textContent);
        countSpans[i].textContent = count - 1;
        if (count - 1 === 0) {
            minusButtons[i].setAttribute('disabled', true);
        }
    });
}

function addItemToCart(name, price) {
    let itemExists = false;

    for (let i = 0; i < cart.length; i++) {
        if (cart[i].name === name) {
            cart[i].count++;
            itemExists = true;
            break;
        }
    }

    if (!itemExists) {
        cart.push({
            name: name,
            price: price,
            count: 1
        });
    }

    updateCart();
}


/* buyNowButton.addEventListener('click', (event) => {
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

	if (name === '' || address === '' || phone === '' || items.length === 0) {
		alert('Please fill all the required fields and add at least one item to the cart.');
	} else {
		const message = `Order received\nName: ${name}\nAddress: ${address}\nPhone: ${phone}\nItems: ${items.join(', ')}\nTotal price: ${totalPrice}`;

		window.open(`https://wa.me/919607040169?text=${encodeURIComponent(message)}`);

		alert('Order received!');
	}
});





