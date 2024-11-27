let upsellProductsContainer = document.querySelector("#upsell-products"); 

for (let i = 0; i < articlesArray.length; i++) {
    let card = articlesArray[i]; 
    if (card.upsellProducts === true) {
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

        
 upsellProductsContainer.appendChild(cardElement); 
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

