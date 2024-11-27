
debugger;


let cardsContainer = document.querySelector("#dealOfTheWeek"); 

for (let i = 0; i < articlesArray.length; i++) {
 let card = articlesArray[i]; 
 if (card.dealOfTheWeek === true) {
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
 <div class="measurement-unit">
   <div class="description__title">
     <div class="start-description">Available:<b>${card.availableQuantity}</b></div>
     <div class="end-description">Unit Sold:<b>${card.unitsSold}</b></div>
   </div>
   <div class="bar-container">
     <div class="bar">
       <div class="fill" style="width: ${card.fillPercentage}%;"></div>
     </div>
   </div>
 </div>
 <div class="countdown">
   <div class="btn btn--secondary">
     <p class="countdown__numbers">${card.countdownNumbers}</p>
     <p class="countdown__description"> days hours mins secs</p>
   </div>
 </div>
 <div class ="btn btn--primary wishlist--btn">Add To Wishlist</div>
            </div>
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
 // If the card ID is already in the wishlist, provide feedback
 alert('Item is already in the wishlist!');
}
}




