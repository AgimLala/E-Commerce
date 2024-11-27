let adsContainer = document.querySelector("#furniture-decor"); 

for (let i = 0; i < articlesArray.length; i++) {
 let ad = articlesArray[i]; 
 if (ad.furnitureDecor === true) {

 let cardElement = document.createElement("div"); 
 cardElement.classList.add("card--type3"); 


 cardElement.innerHTML = `
 <a href="Single-product.html?productId=${ad.id}"><img src="${ad.imageUrl}" alt=""></a>
 <div class="price">
   <p class="price__red">$${ad.price.toFixed(2)}</p>
   <p class="deleted__price"><del>$${ad.discountedPrice.toFixed(2)}</del></p>
 </div>
 <p class="description">${ad.description}</p>
 <div class="star-rating">
   ${'<span></span>'.repeat(ad.starRating)}
 </div>
 

 `;
 let addToWishlistBtn = document.createElement("div");
 addToWishlistBtn.classList.add("btn", "btn--primary", "wishlist--btn");
 addToWishlistBtn.innerText = "Add To Wishlist";

 addToWishlistBtn.addEventListener("click", function () {
     addToWishlist(ad);
 });


 cardElement.appendChild(addToWishlistBtn);

 adsContainer.appendChild(cardElement); 
}
}

 



function addToWishlist(product) {
  // Retrieve existing wishlist data from localStorage
  var wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

  // Check if the product is already in the wishlist
  if (!wishlist.some((item) => item.id === product.id)) {
      // Add the product to the wishlist
      wishlist.push(product);

      // Update localStorage with the new wishlist data
      localStorage.setItem('wishlist', JSON.stringify(wishlist));

      // You can also provide user feedback, e.g., display a message
      alert('Item added to the wishlist!');
  } else {
      // If the product is already in the wishlist, provide feedback
      alert('Item is already in the wishlist!');
  }
}