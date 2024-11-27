function generateCards(containerId, articlesArray,targetContainer) {
  let container = document.getElementById(containerId);
 
  for (let i = 0; i < articlesArray.length; i++) {
     let item = articlesArray[i];
     if (item.lastSlide === true && item.targetContainer === targetContainer) {
       var cardElement = document.createElement("div");
       cardElement.classList.add("card--type4");
 
       cardElement.innerHTML = `
         <a href="Single-product.html?productId=${item.id}"><img src="${item.imageUrl}" alt="" /></a>
         <div class="card--type4_content">
           <div class="price">
             <p class="price__red">$${item.price.toFixed(2)}</p>
             <p class="deleted__price"><del>$${item.discountedPrice.toFixed(2)}</del></p>
           </div>
           <p class="description">${item.description}</p>
           <div class="star-rating">
             ${'<span></span>'.repeat(item.starRating)}
           </div>
           <div class ="btn btn--primary wishlist--btn">Add To Wishlist</div>
            </div>
         </div>
       `;
       var addToWishlistBtn = cardElement.querySelector('.wishlist--btn');
            addToWishlistBtn.addEventListener('click', function () {
                addToWishlist(item);
            });

       
 
       container.appendChild(cardElement);
     }
  }
 }
 function addToWishlist(product) {
  // Retrieve existing wishlist data from localStorage
  var wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

  // Check if the product ID is already in the wishlist
  if (!wishlist.includes(product.id)) {
      // Add the product ID to the wishlist
      wishlist.push(product.id);

      // Update localStorage with the new wishlist data
      localStorage.setItem('wishlist', JSON.stringify(wishlist));

      // You can also provide user feedback, e.g., display a message
      alert('Item added to the wishlist!');
  } else {
      // If the product ID is already in the wishlist, provide feedback
      alert('Item is already in the wishlist!');
  }
}

 
 // Call the function with a valid array as a parameter
 generateCards("featured-container", articlesArray, "featured-container");
 generateCards("new-arrivals-container", articlesArray ,"new-arrivals-container");
 generateCards("best-seller-container", articlesArray, "best-seller-container");