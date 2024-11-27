document.addEventListener("DOMContentLoaded", function () {
    // Load wishlist data from localStorage when the page is loaded
    var wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    // Loop through the wishlist and create table rows
    wishlist.forEach(function (product) {
        addToWishlistTable(product);
    });

    // Add event delegation for delete icons
    document.getElementById("wishlist-table").addEventListener("click", function (event) {
        if (event.target.classList.contains("table__icon")) {
            let row = event.target.closest("tr");
            removeRow(row);
        }
    });
});

function addToWishlistTable(product) {
    var wishlistTableBody = document.querySelector("#wishlist-table tbody");
    
    if (product) {
        var row = wishlistTableBody.insertRow();
    
        var cellRemove = row.insertCell(0);
        var cellImage = row.insertCell(1);
        var cellProduct = row.insertCell(2);
        var cellPrice = row.insertCell(3);
        var cellStockStatus = row.insertCell(4);
        var cellAddToCart = row.insertCell(5);

        cellRemove.innerHTML = '<img class="table__icon pointer" src="images/icons/delete.png" alt="">';
        cellImage.innerHTML = '<img src="' + product.imageUrl + '" alt="">';
        cellProduct.textContent = product.description;
        cellPrice.innerHTML = '<b>$' + product.price.toFixed(2) + '</b>';
        cellStockStatus.textContent = 'In Stock'; // Update this based on your product data
        cellAddToCart.innerHTML = '<div class="btn wishlist--btn">add to cart</div>';
    }
}


function removeRow(row) {
    var wishlistTableBody = document.querySelector("#wishlist-table tbody");
    
    // Remove the row from the table
    wishlistTableBody.removeChild(row);

    // Retrieve existing wishlist data from localStorage
    var wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    // Find the index of the product in the wishlist array
    var index = findRowIndex(row);

    // Remove the corresponding product from the wishlist array
    wishlist.splice(index, 1);

    // Update localStorage with the modified wishlist data
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

function findRowIndex(row) {
    var wishlistTableBody = document.querySelector("#wishlist-table tbody");
    
    // Find the index of the row in the NodeList
    var rows = wishlistTableBody.getElementsByTagName('tr');
    for (var i = 0; i < rows.length; i++) {
        if (rows[i] === row) {
            return i;
        }
    }
    return -1;
}