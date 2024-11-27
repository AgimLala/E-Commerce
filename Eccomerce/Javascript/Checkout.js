document.addEventListener('DOMContentLoaded', () => {
    const orderItemsBody = document.getElementById('order-items-body');
    const cartData = JSON.parse(localStorage.getItem('cartData'));

    if (orderItemsBody && cartData) {
        cartData.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.productName} <b>x ${item.quantity}</b></td>
                <td colspan="2">$${item.total.toFixed(2)}</td>
            `;
            orderItemsBody.appendChild(row);
        });
    } else {
        console.error('No cart data found or order items body not found.');
    }

    const checkoutButton = document.querySelector('.checkout--button');

    checkoutButton.addEventListener('click', async () => {
        const orderItems = cartData.map(item => ({
            cartItemId: item.cartItemID,  // Adjust this property according to your cart item identifier
            productName: item.productName,
            quantity: item.quantity,
            total: item.total
        }));

        const orderData = {
            country: document.getElementById('country').value,
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            companyName: document.getElementById('companyName').value,
            address: document.getElementById('address').value,
            address2: document.getElementById('address2').value,
            stateCounty: document.getElementById('stateCounty').value,
            postcodeZip: document.getElementById('postcodeZip').value,
            emailAddress: document.getElementById('emailAddress').value,
            phone: document.getElementById('phone').value,
            orderNotes: document.getElementById('exampleFormControlTextarea1').value,
            orderItems: orderItems
        };

        try {
            const response = await fetch('https://localhost:7298/api/orders/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(orderData)
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error('Failed to checkout order: ' + errorText);
            }
            const responseData = await response.json();
            console.log('Order created:', responseData);
            // Optionally, clear localStorage or perform other actions upon successful order creation

            // Example: Clearing cart data from localStorage
            localStorage.removeItem('cartData');

            // Redirect or show success message to the user
            alert('Order placed successfully!');
            // Example: Redirect to a thank you page
            // window.location.href = '/thank-you';
        } catch (error) {
            console.error('Error:', error);
            alert('Error placing order: ' + error.message);
        }
    });
});
