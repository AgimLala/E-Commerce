/*

let cardsContainer = document.querySelector("#related-products"); 

for (let i = 0; i < articlesArray.length; i++) {
    let card = articlesArray[i]; 
    if (card.relatedProducts === true) {
      let cardElement = document.createElement("div"); 
      cardElement.classList.add("card--type3"); 
 
 
    
 cardElement.innerHTML = `
 <a href="Single-product.html?productId=${card.id}"><img src="${card.imageUrl}" alt=""></a>
 <div class="price">
   <p class="price__red">$${card.price.toFixed(2)}</p>
   <p class="deleted__price"><del>$${card.discountedPrice.toFixed(2)}</del></p>
 </div>
 <p class="description">${card.description}</p>
 <div class="star-rating">
   ${'<span></span>'.repeat(card.starRating)}
 </div>
 <div class="btn btn--primary wishlist--btn">Add To Wishlist</div>
 `;

 let addToWishlistBtn = cardElement.querySelector('.wishlist--btn');
        addToWishlistBtn.addEventListener('click', function () {
            addToWishlist(card);
        });

        
 cardsContainer.appendChild(cardElement); 
}
}
function addToWishlist(card) {
  // Retrieve existing wishlist data from localStorage
  var wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

  // Check if the card is already in the wishlist
  if (!wishlist.some((existingCard) => existingCard.id === card.id)) {
      // Add the card to the wishlist
      wishlist.push(card);

      // Update localStorage with the new wishlist data
      localStorage.setItem('wishlist', JSON.stringify(wishlist));

      // You can also provide user feedback, e.g., display a message
      alert('Item added to the wishlist!');
  } else {
      // If the card is already in the wishlist, provide feedback
      alert('Item is already in the wishlist!');
  }
}

*/


const relatedProductsContainer = document.querySelector("#related-products");
const upsellProductsContainer = document.querySelector("#upsell-products");

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


/* Services API Calls */
const apiBaseUrl = "https://localhost:7298/api";

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

const categoryIdUpsell = 1;
getProductsByCategoryId(categoryIdUpsell).then(data => {
    displayProducts(upsellProductsContainer, data);
}).catch(error => {
    console.error(error);
});

// Fetch and display Home Accessories products (category ID 2)
const categoryIdRelated = 2;
getProductsByCategoryId(categoryIdRelated).then(data => {
    displayProducts(relatedProductsContainer, data);
}).catch(error => {
    console.error(error);
});