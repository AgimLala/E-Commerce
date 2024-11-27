// Select the containers
const dealOfTheWeekContainer = document.querySelector("#dealOfTheWeek");
const furnitureDecorContainer = document.querySelector("#furniture-decor");
const homeAccesoriesContainer = document.querySelector("#home-accesories");
const featuredContainer = document.querySelector("#featured-container");
const newArrivalsContainer = document.querySelector("#new-arrivals-container");
const bestSellersContainer = document.querySelector("#best-seller-container");



const startCountdown = (endTime, countdownElement) => {
    const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = new Date(endTime).getTime() - now;

        if (distance < 0) {
            countdownElement.innerHTML = "EXPIRED";
            clearInterval(intervalId);
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    };

    const intervalId = setInterval(updateCountdown, 1000);
    updateCountdown();
};

const displayDealOfTheWeek = (container, product) => {
    if (product) {
        const cardElement = document.createElement("div");
        cardElement.classList.add("card--type3");
        cardElement.innerHTML = `
            <a href="Single-product.html?productId=${product.productId}"><img src="${product.imageUrl}" alt=""></a>
            <div class="price">
                <p class="price__red">$${product.price.toFixed(2)}</p>
                ${product.discountedPrice ? `<p class="deleted__price"><del>$${product.discountedPrice.toFixed(2)}</del></p>` : ''}
            </div>
            <p class="description">${product.description || product.name}</p>
            <div class="star-rating">
                ${'<span></span>'.repeat(product.starRating)}
            </div>
            <div class="measurement-unit">
                <div class="description__title">
                    <div class="start-description">Available:<b>${product.stock}</b></div>
                    <div class="end-description">Unit Sold:<b>${product.unitsSold}</b></div>
                </div>
                <div class="bar-container">
                    <div class="bar">
                        <div class="fill" style="width: ${product.fillPercentage}%;"></div>
                    </div>
                </div>
            </div>
            <div class="countdown">
                <div class="btn btn--secondary">
                    <p class="countdown__numbers"></p>
                    <p class="countdown__description">days hours mins secs</p>
                </div>
            </div>
            <div class="btn btn--primary wishlist--btn">Add To Wishlist</div>
        `;

        const countdownElement = cardElement.querySelector('.countdown__numbers');
        if (countdownElement) {
            startCountdown(product.countdownEnd, countdownElement);
        }

        const addToWishlistBtn = cardElement.querySelector('.wishlist--btn');
        addToWishlistBtn.addEventListener('click', () => addToWishlistBtn(product));

        container.appendChild(cardElement);
    }
};


// Function to display products in a given container
const displayProducts = (container, products) => {
    for (let i = 0; i < products.length; i++) {
        const product = products[i];

        const cardElement = document.createElement("div");
        cardElement.classList.add("card--type3");
        cardElement.innerHTML = `
        <a href="Single-product.html?productId=${product.productId}"><img src="${product.imageUrl}" alt=""></a>
        <div class="price">
          <p class="price__red">$${product.price.toFixed(2)}</p>
          ${product.discountedPrice ? `<p class="deleted__price"><del>$${product.discountedPrice.toFixed(2)}</del></p>` : ''}
        </div>
        <p class="description">${product.description || product.name}</p>
        <div class="star-rating">
          ${'<span></span>'.repeat(product.starRating)}
        </div>`;

        const addToWishlistBtn = document.createElement("div");
        addToWishlistBtn.classList.add("btn", "btn--primary", "wishlist--btn");
        addToWishlistBtn.innerText = "Add To Wishlist";

        cardElement.appendChild(addToWishlistBtn);

        container.appendChild(cardElement);
    }
}


// Function to generate HTML for a product card
const displayCardType4 = (container, product) => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card--type4");
    cardElement.innerHTML = `
        <a href="Single-product.html?productId=${product.productId}"><img src="${product.smallImageUrl}" alt=""></a>
      <div>
        <div class="price">
            <p class="price__red">$${product.price.toFixed(2)}</p>
            ${product.discountedPrice ? `<p class="deleted__price"><del>$${product.discountedPrice.toFixed(2)}</del></p>` : ''}
        </div>
        <p class="description">${ product.name}</p>
        <div class="star-rating">
            ${'<span></span>'.repeat(product.rating)}
        </div>
        <div class="btn btn--primary wishlist--btn">Add To Wishlist</div>
        <div/>
    `;
    container.appendChild(cardElement);
};










/* Services API Calls */
const apiBaseUrl = "https://localhost:7298/api";


const getDealOfTheWeek = () => {
    return fetch(`${apiBaseUrl}/Products/ProductsWithCountdown`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
};



const getProductsByCategoryId = (categoryId) => {
    return new Promise((resolve, reject) => {
        fetch(`${apiBaseUrl}/products/byCategory/${categoryId}`)
            .then(response => {
                if (!response.ok) {
                    reject('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => resolve(data))
            .catch(error => reject('There has been a problem with your fetch operation:', error));
    });
};

const getProducts = () => {
    return new Promise((resolve, reject) => {
        fetch(apiBaseUrl + "/products")
        .then(response => {
          // Check if the request was successful
          if (!response.ok) {
            reject('Network response was not ok ' + response.statusText);
          }
          // Parse the response as JSON
          return response.json();
        })
        .then(data => {
          // Handle the JSON data
          resolve(data)
        })
        .catch(error => {
          // Handle any errors
          reject('There has been a problem with your fetch operation:', error);
        });
    })

}
// Fetch and display Featured products
const getFeaturedProducts = () => {
    return fetch(`${apiBaseUrl}/products/featured`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .catch(error => {
            console.error('Error fetching Featured products:', error);
        });
};

// Fetch and display New Arrivals products
const getNewArrivals = () => {
    return fetch(`${apiBaseUrl}/products/new-arrivals`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .catch(error => {
            console.error('Error fetching New Arrivals:', error);
        });
};

// Fetch and display Best Sellers products
const getBestSellers = () => {
    return fetch(`${apiBaseUrl}/products/best-sellers`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .catch(error => {
            console.error('Error fetching Best Sellers:', error);
        });
};

//================================================//

// Fetch and display Deal of the Week product
getDealOfTheWeek().then(products => {
    if (products && products.length > 0) {
        products.forEach(product => displayDealOfTheWeek(dealOfTheWeekContainer, product));
    }
}).catch(error => {
    console.error(error);
});


// Fetch and display Furniture Decor products (category ID 1)
const categoryIdFurniture = 1;
getProductsByCategoryId(categoryIdFurniture).then(data => {
    displayProducts(furnitureDecorContainer, data);
}).catch(error => {
    console.error(error);
});

// Fetch and display Home Accessories products (category ID 2)
const categoryIdHomeAccessories = 2;
getProductsByCategoryId(categoryIdHomeAccessories).then(data => {
    displayProducts(homeAccesoriesContainer, data);
}).catch(error => {
    console.error(error);
});



// Display Featured products
getFeaturedProducts().then(products => {
    const featuredContainer = document.getElementById('featured-container');
    if (products && products.length > 0) {
        products.forEach(product => displayCardType4(featuredContainer, product));
    }
});

// Display New Arrivals products
getNewArrivals().then(products => {
    const newArrivalsContainer = document.getElementById('new-arrivals-container');
    if (products && products.length > 0) {
        products.forEach(product => displayCardType4(newArrivalsContainer, product));
    }
});

// Display Best Sellers products
getBestSellers().then(products => {
    const bestSellersContainer = document.getElementById('best-seller-container');
    if (products && products.length > 0) {
        products.forEach(product => displayCardType4(bestSellersContainer, product));
    }
});


/* Initializations */
/*
getProducts().then(data => {
    displayProducts(furnitureDecorContainer, data);
});*/  
 
