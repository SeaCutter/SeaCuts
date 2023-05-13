const addToCartButtons = document.querySelectorAll('.add-to-cart');
const buyNowButton = document.querySelector('#buy-now');
//const plusButtons = document.querySelectorAll('.plus-button');
//const minusButtons = document.querySelectorAll('.minus-button');
//const countSpans = document.querySelectorAll('.count');
const cartItems = document.querySelector('#cart-items');
const fishList = document.querySelector('#fish-list');
const cart = [];

fetch('fish.csv')
  .then(response => response.text())
  .then(text => {
    const lines = text.trim().split('\n').slice(1);
    for (const line of lines) {
      const [name, price] = line.split(',');
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        <img src="${name.toLowerCase()}.jpg" alt="${name}">
        <h3>${name}</h3>
        <p class="price">$${price}</p>
        <div class="add-to-cart">
            <button class="minus-button" disabled>-</button>
            <span class="count">0</span>
            <button class="plus-button">+</button>
        </div>
      `;
      fishList.appendChild(listItem);

      // add event listeners for plus and minus buttons
      const plusButton = listItem.querySelector('.plus-button');
      const minusButton = listItem.querySelector('.minus-button');
      const countSpan = listItem.querySelector('.count');

      plusButton.addEventListener('click', () => {
        const count = parseInt(countSpan.textContent);
        countSpan.textContent = count + 1;
        minusButton.removeAttribute('disabled');

        // add item to cart
        const itemElement = plusButton.closest('li');
        addItemToCart(itemElement);
      });

      minusButton.addEventListener('click', () => {
        const count = parseInt(countSpan.textContent);
        countSpan.textContent = count - 1;
        if (count - 1 === 0) {
          minusButton.setAttribute('disabled', true);
        }

        // remove item from cart
	      
          //  const itemElement = minusButton.closest('li');
           // removeItemFromCart(itemElement);
	      
	      const itemElement = removeButtons[i].closest('li');
	      itemElement.remove();

      });
    }
  });



/*
fetch('fish.csv')
  .then(response => response.text())
  .then(text => {
    const lines = text.trim().split('\n').slice(1);
    for (const line of lines) {
      const [name, price] = line.split(',');
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        <img src="${name.toLowerCase()}.jpg" alt="${name}">
        <h3>${name}</h3>
        <p class="price">$${price}</p>
        <div class="add-to-cart">
            <button class="minus-button" disabled>-</button>
            <span class="count">0</span>
            <button class="plus-button">+</button>
        </div>
      `;
      fishList.appendChild(listItem);
    }
  });

for (let i = 0; i < plusButtons.length; i++) {
    plusButtons[i].addEventListener('click', () => {
        const count = parseInt(countSpans[i].textContent);
        countSpans[i].textContent = count + 1;
        minusButtons[i].removeAttribute('disabled');
	    
	    // add item to cart
	const itemElement = plusButtons[i].closest('li');
        addItemToCart(itemElement);
    });

    minusButtons[i].addEventListener('click', () => {
        const count = parseInt(countSpans[i].textContent);
        countSpans[i].textContent = count - 1;
        if (count - 1 === 0) {
            minusButtons[i].setAttribute('disabled', true);
        }
	    // remove item from cart
        const itemElement = minusButtons[i].closest('li');
        removeItemFromCart(itemElement);
    });
}
*/
/* function addItemToCart(name, price) {
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

*/
function addItemToCart(itemElement) {
    const name = itemElement.querySelector('h3').textContent;
    const price = itemElement.querySelector('.price').textContent;
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

function removeItemFromCart(itemElement) {
    const name = itemElement.querySelector('h3').textContent;

    for (let i = 0; i < cart.length; i++) {
        if (cart[i].name === name) {
            cart[i].count--;
            if (cart[i].count === 0) {
                cart.splice(i, 1);
            }
            break;
        }
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
            const itemElement = document.querySelector(`li:has(h3:contains(${cart[i].name}))`);
            removeItemFromCart(itemElement);
        });

        itemInfo.appendChild(itemName);
        itemInfo.appendChild(itemCount);
        itemInfo.appendChild(itemPrice);
        item.appendChild(itemInfo);
        item.appendChild(itemRemove);
        cartItems.appendChild(item);
    }
}

const addButtons = document.querySelectorAll('.add-to-cart-button');
addButtons.forEach((button) => {
    const name = button.getAttribute('data-name');
    button.addEventListener('click', () => {
        const itemElement = button.parentElement.parentElement;
        addItemToCart(itemElement);
    });
});

buyNowButton.addEventListener('click', (event) => {
	event.preventDefault();
	const name = document.querySelector('#name').value;
	const address = document.querySelector('#address').value;
	const phone = document.querySelector('#phone').value;
	let items = [];

	cart.forEach((item) => {
		items.push(`${item.name} - ${item.price} x ${item.count}`);
	});

	const totalPrice = cart.reduce((acc, item) => acc + parseFloat(item.price) * item.count, 0).toFixed(2);

	if (name === '' || address === '' || phone === '' || items.length === 0) {
		alert('Please fill all the required fields and add at least one item to the cart.');
	} else {
		const message = `Order received\nName: ${name}\nAddress: ${address}\nPhone: ${phone}\nItems: ${items.join(', ')}\nTotal price: ${totalPrice}`;

		window.open(`https://wa.me/919607040169?text=${encodeURIComponent(message)}`);

		alert('Order received!');
	}
});





