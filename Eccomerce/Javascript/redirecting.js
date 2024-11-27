   /*
   
   document.addEventListener('DOMContentLoaded', function () {
    // Extract product ID from the URL query parameter
    const urlParams = new URLSearchParams(window.location.search);

    const productId = urlParams.get('productId');
    
    const selectedProduct = productsArray.find(product => product.id === productId);
    
    const productDetailsContainer = document.getElementById('product-details-container');


    const productHtml = `
    <container class="grid--2x1">
        <!-- Product images -->
        <div>
            <div class="image--container">
                <img src="${selectedProduct.images[0]}" >
            </div>
            <div class="image--container-bar">
                ${selectedProduct.images.slice(1).map(image => `
                    <div class="image--container">
                        <img src="${image}" alt="">
                    </div>
                `).join('')}
            </div>
        </div>

        <!-- Product details -->
        <div>
            <div class="single--product-header">
                <h1 class="price--header">$${selectedProduct.price.toFixed(2)}</h1>
                <div class="left-right-btns">
                    <div class="btn square--btn"><</div>
                    <div class="btn square--btn">></div>
                </div>
            </div>
            <h3 class="single--product-subheader">${selectedProduct.name}</h3>
            <div class="product--rating">
                <div class="star-rating">
                    ${'<span></span>'.repeat(selectedProduct.rating)}
                </div>
                <p> (${selectedProduct.reviewCount} customer review)</p>
            </div>
            <p class="single--product_short_description">${selectedProduct.shortDescription}</p>
            <label for="size"> Size</label>
            <select class="size" name="size" id="size">
                ${selectedProduct.sizeOptions.map((option, index) => `
                    <option value="${index + 1}" ${index === 0 ? 'selected' : ''}>${option}</option>
                `).join('')}
            </select>
            <div class="media media--no-padding">
                <div class="tick-container"></div>
                <p>${selectedProduct.inStock} In Stock</p>
            </div>
            <div class="add-to-cart">
                <label for="number"> Quantity </label>
                <input class="quantity__box" type="number" id="number" min="1" placeholder="1">
                <div class="btn cart--btn">
                    add to cart
                </div>
            </div>
            <div class="single--product-media">
                <div class="media single--product_media">
                    <a href="#"><img class="icon" src="images/icons/shuffle.png" alt=""></a>
                    <p>Add To Compare</p>
                </div>
                <div class="media single--product_media">
                    <a href="#"><img class="icon" src="images/icons/heart-yellow-circle.png" alt=""></a>
                    <p>Add To Wishlist</p>
                </div>
            </div>
            <div class="categories--border-lines ">
                <div class="single--product_category">
                    <div class="single--product_category_title">Category:</div>
                    <div class="single--product_category_description">
                        ${selectedProduct.categories.join(', ')}
                    </div>
                </div>
                <div class="single--product_category">
                    <div class="single--product_category_title">Tags:</div>
                    <div class="single--product_category_description">
                        ${selectedProduct.tags.join(', ')}
                    </div>
                </div>
            </div>
            <div class="single--product-share">
            <p>Share This Product:</p>
            ${selectedProduct.shareIcons.map(icon => `
                <div class="single--product-share_icon">
                    <a href="#"><img class="end--icon" src="${icon.iconSrc}" alt=""></a>
                    
                </div>
            `).join('')}
        </div>
        </div>
    </container>

    <!-- Product headers -->
    <div class="single--product-headers">
        <div class="underlined__header">
            <h1 >Description</h1>
        </div>
        <h1 class="body__color_header">Specification</h1>
        <h1 class="body__color_header">Reviews (${selectedProduct.reviewCount})</h1>
    </div>

    <!-- Product descriptions -->
    <div class="long--description">
        <p>${selectedProduct.description}</p>
        <p>${selectedProduct.specification}</p>
        <!-- Display reviews -->
        ${selectedProduct.reviews.map(review => `
            <p>${review.username} rated it ${review.rating}. ${review.comment}</p>
        `).join('')}
    </div>
`;

// Set the HTML content of the container
productDetailsContainer.innerHTML = productHtml;
});





document.addEventListener('DOMContentLoaded', async function () {
    // Define the base URL for the API
    const apiBaseUrl = "https://localhost:7298/api";

    // Extract product ID from the URL query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('productId');

    // Construct the URL for the API endpoint
    const apiUrl = `${apiBaseUrl}/products/${productId}`;

    // Fetch product data from your API endpoint
    const response = await fetch(apiUrl);
    const productData = await response.json();
    // Combine data from the database with additional data from productsArray
    const selectedProduct = {
        ...productData,
        images: productsArray.find(product => product.id === productId)?.images || [],
        shareIcons: productsArray.find(product => product.id === productId)?.shareIcons || [],
        reviewCount: productsArray.find(product => product.id === productId)?.reviewCount || [],
        specification: productsArray.find(product => product.id === productId)?.specification || [],
    };
    
    const sizeOptions = productData.size;

// Function to handle adding to cart
const addToCart = async () => {
    const quantity = parseInt(document.getElementById('number').value);
    const size = document.getElementById('size').value;

    if (!quantity || quantity < 1) {
        alert("Please enter a valid quantity.");
        return;
    }

    const cartItem = {
        productId: selectedProduct.productId,
        quantity: quantity,
        size: size,
        total: selectedProduct.price * quantity
    };

    const cartResponse = await fetch(`${apiBaseUrl}/cart`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cartItem)
    });

    if (cartResponse.ok) {
        alert("Product added to cart!");
    } else {
        alert("Failed to add product to cart.");
    }
};



    // Now you can use selectedProduct to populate your HTML content
    const productDetailsContainer = document.getElementById('product-details-container');

    const productHtml = `
    <container class="grid--2x1">
        <!-- Product images -->
        <div>
            <div class="image--container">
                <img src="${selectedProduct.images[0]}" >
            </div>
            <div class="image--container-bar">
                ${selectedProduct.images.slice(1).map(image => `
                    <div class="image--container">
                        <img src="${image}" alt="">
                    </div>
                `).join('')}
            </div>
        </div>

        <!-- Product details -->
        <div>
            <div class="single--product-header">
                <h1 class="price--header">$${selectedProduct.price.toFixed(2)}</h1>
                <div class="left-right-btns">
                    <div class="btn square--btn"><</div>
                    <div class="btn square--btn">></div>
                </div>
            </div>
            <h3 class="single--product-subheader">${selectedProduct.name}</h3>
            <div class="product--rating">
                <div class="star-rating">
                    ${'<span></span>'.repeat(selectedProduct.rating)}
                </div>
                <p> (${selectedProduct.reviewCount} customer review)</p>
            </div>
            <p class="single--product_short_description">${selectedProduct.description}</p>
            <label for="size"> Size</label>
            <select class="size" name="size" id="size">
                ${sizeOptions.map((option, index) => `
                    <option value="${option}" ${index === 0 ? 'selected' : ''}>${option}</option>
                `).join('')}
            </select>

            <div class="media media--no-padding">
                <div class="tick-container"></div>
                <p>${selectedProduct.stock} In Stock</p>
            </div>
            <div class="add-to-cart">
                <label for="number"> Quantity </label>
                <input class="quantity__box" type="number" id="number" min="1" placeholder="1">
                <div class="btn cart--btn">
                    add to cart
                </div>
            </div>
            <div class="single--product-media">
                <div class="media single--product_media">
                    <a href="#"><img class="icon" src="images/icons/shuffle.png" alt=""></a>
                    <p>Add To Compare</p>
                </div>
                <div class="media single--product_media">
                    <a href="#"><img class="icon" src="images/icons/heart-yellow-circle.png" alt=""></a>
                    <p>Add To Wishlist</p>
                </div>
            </div>
            <div class="categories--border-lines ">
                <div class="single--product_category">
                    <div class="single--product_category_title">Category:</div>
                    <div class="single--product_category_description">
                        ${selectedProduct.departments}
                    </div>
                </div>
                <div class="single--product_category">
                    <div class="single--product_category_title">Tags:</div>
                    <div class="single--product_category_description">
                        ${selectedProduct.tags.join(', ')}
                    </div>
                </div>
            </div>
            <div class="single--product-share">
            <p>Share This Product:</p>
            ${selectedProduct.shareIcons.map(icon => `
                <div class="single--product-share_icon">
                    <a href="#"><img class="end--icon" src="${icon.iconSrc}" alt=""></a>
                    
                </div>
            `).join('')}
        </div>
        </div>
    </container>

    <!-- Product headers -->
    <div class="single--product-headers">
        <div class="underlined__header">
            <h1 >Description</h1>
        </div>
        <h1 class="body__color_header">Specification</h1>
        <h1 class="body__color_header">Reviews (${selectedProduct.reviewCount})</h1>
    </div>

    <!-- Product descriptions -->
    <div class="long--description">
        <p>${selectedProduct.description}</p>
        <p>${selectedProduct.specification}</p>
        <!-- Display reviews -->

    </div>
`;

    // Set the HTML content of the container
    productDetailsContainer.innerHTML = productHtml;

    document.getElementById('add-to-cart-btn').addEventListener('click', addToCart);
});


*/
document.addEventListener('DOMContentLoaded', async function () {
    const apiBaseUrl = "https://localhost:7298/api";

    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('productId');
    const apiUrl = `${apiBaseUrl}/products/${productId}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const productData = await response.json();

        const selectedProduct = {
            ...productData,
            images: productsArray.find(product => product.id === productId)?.images || [],
            shareIcons: productsArray.find(product => product.id === productId)?.shareIcons || [],
            reviewCount: productsArray.find(product => product.id === productId)?.reviewCount || 0,
            specification: productsArray.find(product => product.id === productId)?.specification || '',
        };

        const sizeOptions = productData.size;

        const addToCart = async () => {
            const quantity = parseInt(document.getElementById('number').value);
            const size = document.getElementById('size').value;

            if (!quantity || quantity < 1) {
                alert("Please enter a valid quantity.");
                return;
            }

            const cartItem = {
                productId: selectedProduct.productId,
                quantity: quantity,
                size: size
            };

            try {
                const cartResponse = await fetch(`${apiBaseUrl}/Carts`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(cartItem)
                });

                if (cartResponse.ok) {
                    alert("Product added to cart!");
                } else {
                    const errorData = await cartResponse.json(); // Fetch error message as text
                    console.error('Error adding product to cart:', errorData);
                    alert(errorData.message); // Display the error message directly
                }
            } catch (error) {
                console.error('Error adding product to cart:', error);
                alert("Failed to add product to cart. Please try again.");
            }
        };

        const productDetailsContainer = document.getElementById('product-details-container');

        const productHtml = `
            <container class="grid--2x1">
                <div>
                    <div class="image--container">
                        <img src="${selectedProduct.imageUrl}" >
                    </div>
                    <div class="image--container-bar">
                        ${selectedProduct.images.slice(1).map(image => `
                            <div class="image--container">
                                <img src="${image}" alt="">
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div>
                    <div class="single--product-header">
                        <h1 class="price--header">$${selectedProduct.price.toFixed(2)}</h1>
                        <div class="left-right-btns">
                            <div class="btn square--btn"><</div>
                            <div class="btn square--btn">></div>
                        </div>
                    </div>
                    <h3 class="single--product-subheader">${selectedProduct.name}</h3>
                    <div class="product--rating">
                        <div class="star-rating">
                            ${'<span></span>'.repeat(selectedProduct.rating)}
                        </div>
                        <p> (${selectedProduct.reviewCount} customer review)</p>
                    </div>
                    <p class="single--product_short_description">${selectedProduct.description}</p>
                    <label for="size"> Size</label>
                    <select class="size" name="size" id="size">
                        ${sizeOptions.map((option, index) => `
                            <option value="${option}" ${index === 0 ? 'selected' : ''}>${option}</option>
                        `).join('')}
                    </select>

                    <div class="media media--no-padding">
                        <div class="tick-container"></div>
                        <p>${selectedProduct.stock} In Stock</p>
                    </div>
                    <div class="add-to-cart">
                        <label for="number"> Quantity </label>
                        <input class="quantity__box" type="number" id="number" min="1" placeholder="1">
                        <div class="btn cart--btn" id="add-to-cart-btn">
                            add to cart
                        </div>
                    </div>
                    <div class="single--product-media">
                        <div class="media single--product_media">
                            <a href="#"><img class="icon" src="images/icons/shuffle.png" alt=""></a>
                            <p>Add To Compare</p>
                        </div>
                        <div class="media single--product_media">
                            <a href="#"><img class="icon" src="images/icons/heart-yellow-circle.png" alt=""></a>
                            <p>Add To Wishlist</p>
                        </div>
                    </div>
                    <div class="categories--border-lines ">
                        <div class="single--product_category">
                            <div class="single--product_category_title">Category:</div>
                            <div class="single--product_category_description">
                                ${selectedProduct.departments.join(', ')}
                            </div>
                        </div>
                        <div class="single--product_category">
                            <div class="single--product_category_title">Tags:</div>
                            <div class="single--product_category_description">
                                ${selectedProduct.tags.join(', ')}
                            </div>
                        </div>
                    </div>
                    <div class="single--product-share">
                    <p>Share This Product:</p>
                    ${selectedProduct.shareIcons.map(icon => `
                        <div class="single--product-share_icon">
                            <a href="#"><img class="end--icon" src="${icon.iconSrc}" alt=""></a>
                        </div>
                    `).join('')}
                </div>
                </div>
            </container>

            <div class="single--product-headers">
                <div class="underlined__header">
                    <h1>Description</h1>
                </div>
                <h1 class="body__color_header">Specification</h1>
                <h1 class="body__color_header">Reviews (${selectedProduct.reviewCount})</h1>
            </div>

            <div class="long--description">
                <p>${selectedProduct.description}</p>
                <p>${selectedProduct.specification}</p>
            </div>
        `;

        productDetailsContainer.innerHTML = productHtml;

        const addToCartBtn = document.getElementById('add-to-cart-btn');
        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', addToCart);
        } else {
            console.error("Add to Cart button not found!");
        }
    } catch (error) {
        console.error('Error fetching product data:', error);
    }
});
