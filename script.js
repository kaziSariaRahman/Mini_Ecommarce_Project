let cart = JSON.parse(localStorage.getItem('cart')) || [];
let totalPrice = parseFloat(localStorage.getItem('totalPrice')) || 0;

const addToCartButtons = document.querySelectorAll('.add-to-cart'); 
const cartitems = document.getElementById('cart-items');
const totalPriceEl = document.getElementById('totalprice');
const buynoww=document.getElementById('buynow')

addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {

        const productName = button.getAttribute('data-name');
        const productPrice = parseFloat(button.getAttribute('data-price'));

        const existingProduct = cart.find(item => item.name === productName);

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({
                name: productName,
                price: productPrice,
                quantity: 1
            });
        }

        totalPrice += productPrice;

        localStorage.setItem('cart', JSON.stringify(cart));
        localStorage.setItem('totalPrice', totalPrice.toFixed(2));

        updateCartDisplay();
    });
});

const updateCartDisplay = () => {
    cartitems.innerHTML = '';

    cart.forEach((item, index) => {
        const li = document.createElement('li');

        li.innerHTML = `
            ${item.name} - $${item.price} x ${item.quantity}
            <button onclick="removeItem(${index})">Remove</button>
        `;

        cartitems.appendChild(li); 
    });

    totalPriceEl.textContent = totalPrice.toFixed(2);
};

function removeItem(index) {
    totalPrice -= cart[index].price * cart[index].quantity;
    cart.splice(index, 1);

    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('totalPrice', totalPrice.toFixed(2));

    updateCartDisplay();
}


updateCartDisplay();
function buynow(){
    let button = document.getElementById('buy');
    button.innerText = "Purchased";
    alert("You have done your purchase");

    localStorage.removeItem('cart');
    localStorage.removeItem('totalPrice');

    document.getElementById("cartItems").innerHTML = "";
    document.getElementById("total").innerText = "0";

    document.getElementById('buy').innerText = "Buy Now";
}


