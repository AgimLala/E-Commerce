document.addEventListener('DOMContentLoaded', () => {
    const subscribeButton = document.getElementById('subscribe-button');
    const emailInput = document.getElementById('subscribe-email');

    subscribeButton.addEventListener('click', async () => {
        const email = emailInput.value.trim();

        if (!validateEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        try {
            const response = await fetch('https://localhost:7298/api/subscriptions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: email })
            });

            if (response.ok) {
                alert('Subscribed successfully!');
                emailInput.value = '';  // Clear the input field
            } else {
                const errorData = await response.json();
                alert(errorData.message || 'Failed to subscribe.');
            }
        } catch (error) {
            console.error('Error subscribing:', error);
            alert('An error occurred. Please try again later.');
        }
    });

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }
});
