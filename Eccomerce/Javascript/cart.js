
document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartSubtotalElement = document.getElementById('cart-subtotal');
    const cartTotalElement = document.getElementById('cart-total');
    const proceedButton = document.getElementById('proceed-to-checkout');
    const apiUrl = "https://localhost:7298/api/carts";

    async function fetchCartItems() {
        const response = await fetch(apiUrl);
        if (response.ok) {
            const cartItems = await response.json();
            renderCartItems(cartItems);
            updateCartTotals(cartItems);
        } else {
            console.error('Failed to fetch cart items.');
        }
    }

    function renderCartItems(cartItems) {
        cartItemsContainer.innerHTML = '';
        cartItems.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><a href="#" class="remove-item" data-id="${item.cartItemId}"> <img class="table__icon" src="images/icons/delete.png" alt=""></a></td>
                <td><img src="${item.productImage}" alt="" /></td>
                <td>${item.name}</td>
                <td><b>$${item.price.toFixed(2)}</b></td>
                <td>
                    <label for="quantity-${item.cartItemId}">Quantity</label>
                    <input
                        class="number__box update-quantity"
                        type="number"
                        id="quantity-${item.cartItemId}"
                        value="${item.quantity}"
                        min="1"
                        data-id="${item.cartItemId}"
                    />
                </td>
                <td><b>$${(item.price * item.quantity).toFixed(2)}</b></td>
            `;
            cartItemsContainer.appendChild(row);
        });

        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', handleRemoveItem);
        });

        document.querySelectorAll('.update-quantity').forEach(input => {
            input.addEventListener('change', handleUpdateQuantity);
        });
    }

    function updateCartTotals(cartItems) {
        let subtotal = 0;
        cartItems.forEach(item => {
            subtotal += item.price * item.quantity;
        });

        cartSubtotalElement.textContent = `$${subtotal.toFixed(2)}`;
        cartTotalElement.textContent = `$${subtotal.toFixed(2)}`; // Assuming subtotal and total are the same
    }

    async function handleRemoveItem(event) {
        event.preventDefault();
        const itemId = event.target.closest('a').dataset.id;
        const response = await fetch(`${apiUrl}/${itemId}`, { method: 'DELETE' });

        if (response.ok) {
            fetchCartItems();
        } else {
            alert('Failed to remove item from cart.');
        }
    }

    async function handleUpdateQuantity(event) {
        const itemId = event.target.dataset.id;
        const newQuantity = parseInt(event.target.value, 10);

        const response = await fetch(`${apiUrl}/${itemId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ cartItemID: itemId, quantity: newQuantity })
        });

        if (response.ok) {
            const updatedCartItem = await response.json();
            updateCartItemUI(updatedCartItem);
            fetchCartItems();
        } else {
            const errorData = await response.json(); 
            alert(errorData.message || 'Failed to update item quantity.');
        }
    }

    function updateCartItemUI(updatedCartItem) {
        const row = document.querySelector(`input[data-id="${updatedCartItem.cartItemId}"]`).closest('tr');
        row.querySelector('img').src = updatedCartItem.productImage;
        row.querySelector('td:nth-child(3)').textContent = updatedCartItem.name;
        row.querySelector('td:nth-child(4) b').textContent = `$${updatedCartItem.price.toFixed(2)}`;
        row.querySelector('input.update-quantity').value = updatedCartItem.quantity;
        row.querySelector('td:nth-child(6) b').textContent = `$${updatedCartItem.total.toFixed(2)}`;
    }

    async function addToCart(productId, quantity) {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ productId, quantity })
        });

        if (response.ok) {
            fetchCartItems();
        } else {
            alert('Failed to add item to cart.');
        }
    }

    document.querySelector('.update-cart').addEventListener('click', () => {
        document.querySelectorAll('.update-quantity').forEach(input => {
            const event = new Event('change');
            input.dispatchEvent(event);
        });
    });

    proceedButton.addEventListener('click', async () => {
        const cartData = Array.from(document.querySelectorAll('#cart-items tr')).map(row => {
            return {
                cartItemID: row.querySelector('.remove-item').dataset.id,
                productName: row.querySelector('td:nth-child(3)').textContent,
                quantity: parseInt(row.querySelector('.update-quantity').value, 10),
                total: parseFloat(row.querySelector('td:nth-child(6) b').textContent.replace('$', ''))
            };
        });

        localStorage.setItem('cartData', JSON.stringify(cartData));

        window.location.href = 'checkout.html';
    });

    fetchCartItems();
});


 /*


    document.addEventListener('DOMContentLoaded', () => {
        const cartItemsContainer = document.getElementById('cart-items');
        const cartSubtotalElement = document.getElementById('cart-subtotal');
        const cartTotalElement = document.getElementById('cart-total');
        const proceedButton = document.getElementById('proceed-to-checkout');
        const apiUrl = "https://localhost:7298/api/carts";
    
        async function fetchCartItems() {
            const response = await fetch(apiUrl);
            if (response.ok) {
                const cartItems = await response.json();
                renderCartItems(cartItems);
                updateCartTotals(cartItems);
            } else {
                console.error('Failed to fetch cart items.');
            }
        }
    
        function renderCartItems(cartItems) {
            cartItemsContainer.innerHTML = '';
            cartItems.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td><a href="#" class="remove-item" data-id="${item.cartItemID}"> <img class="table__icon" src="images/icons/delete.png" alt=""></a></td>
                    <td><img src="${item.productImage}" alt="" /></td>
                    <td>${item.name}</td>
                    <td><b>$${item.price.toFixed(2)}</b></td>
                    <td>
                        <label for="quantity-${item.cartItemID}">Quantity</label>
                        <input
                            class="number__box update-quantity"
                            type="number"
                            id="quantity-${item.cartItemID}"
                            value="${item.quantity}"
                            min="1"
                            data-id="${item.cartItemID}"
                        />
                    </td>
                    <td><b>$${(item.price * item.quantity).toFixed(2)}</b></td>
                `;
                cartItemsContainer.appendChild(row);
            });
    
            document.querySelectorAll('.remove-item').forEach(button => {
                button.addEventListener('click', handleRemoveItem);
            });
    
            document.querySelectorAll('.update-quantity').forEach(input => {
                input.addEventListener('change', handleUpdateQuantity);
            });
        }
        function updateCartTotals(cartItems) {
            let subtotal = 0;
            cartItems.forEach(item => {
                subtotal += item.price * item.quantity;
            });
    
            cartSubtotalElement.textContent = `$${subtotal.toFixed(2)}`;
            cartTotalElement.textContent = `$${subtotal.toFixed(2)}`; // Assuming subtotal and total are the same
        }
    
        async function handleRemoveItem(event) {
            event.preventDefault();
            const itemId = event.target.closest('a').dataset.id;
            const response = await fetch(`${apiUrl}/${itemId}`, { method: 'DELETE' });
    
            if (response.ok) {
                fetchCartItems();
            } else {
                alert('Failed to remove item from cart.');
            }
        }
    
        async function handleUpdateQuantity(event) {
            const itemId = event.target.dataset.id;
            const newQuantity = event.target.value;
    
            const response = await fetch(`${apiUrl}/${itemId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ cartItemID: itemId, quantity: newQuantity })
            });
    
            if (response.ok) {
                const updatedCartItem = await response.json();
                updateCartItemUI(updatedCartItem);
                fetchCartItems();
                
            } else {
                const errorData = await response.json(); 
                alert(errorData.message ||'Failed to update item quantity.');
                
            }
        }
    
        function updateCartItemUI(updatedCartItem) {
            const row = document.querySelector(`input[data-id="${updatedCartItem.cartItemID}"]`).closest('tr');
            row.querySelector('img').src = updatedCartItem.productImage;
            row.querySelector('td:nth-child(3)').textContent = updatedCartItem.name;
            row.querySelector('td:nth-child(4) b').textContent = `$${updatedCartItem.price.toFixed(2)}`;
            row.querySelector('input.update-quantity').value = updatedCartItem.quantity;
            row.querySelector('td:nth-child(6) b').textContent = `$${updatedCartItem.total.toFixed(2)}`;
        }
    
        async function addToCart(productId, quantity) {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ productId, quantity })
            });
    
            if (response.ok) {
                fetchCartItems();
            } else {
                alert('Failed to add item to cart.');
            }
        }
    
        document.querySelector('.update-cart').addEventListener('click', () => {
            document.querySelectorAll('.update-quantity').forEach(input => {
                const event = new Event('change');
                input.dispatchEvent(event);
            });
        });
        proceedButton.addEventListener('click', async () => {
            const cartData = Array.from(document.querySelectorAll('#cart-items tr')).map(row => {
                return {
                    cartItemID: row.querySelector('.remove-item').dataset.id,
                    productName: row.querySelector('td:nth-child(3)').textContent,
                    quantity: parseInt(row.querySelector('.update-quantity').value, 10),
                    total: parseFloat(row.querySelector('td:nth-child(6) b').textContent.replace('$', ''))
                };
            });
        
            try {
                const response = await fetch('https://localhost:7298/api/orders', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(cartData)
                });
        
                if (response.ok) {
                    window.location.href = 'checkout.html';
                } else {
                    alert('Failed to proceed to checkout.');
                }
            } catch (error) {
                alert('Error: ' + error.message);
            }
        });
    
        fetchCartItems();
    });

    */