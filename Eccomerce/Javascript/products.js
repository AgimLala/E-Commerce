const articlesArray = [ 

             //DEAL OF THE WEEK
    {
    id: "1",
    imageUrl: "images/product/large-size/1.jpg",
    price: 100.00,
    discountedPrice: 150.00,
    description: "Aliquet auctor semali",
    starRating: 4,
    availableQuantity: 369,
    unitsSold: 56,
    fillPercentage: 60,
    countdownNumbers: "123 12 12 12",
    dealOfTheWeek: true
  },
  {
    id: "2",
    imageUrl: "images/product/large-size/2.jpg",
    price: 65.00,
    discountedPrice: 90.00,
    description: "Auctor gravida enimuctor",
    starRating: 4,
    availableQuantity: 379,
    unitsSold: 121,
    fillPercentage: 60,
    countdownNumbers: "123 12 12 12" ,
    dealOfTheWeek: true
  },
  {
    id: "3",
    imageUrl: "images/product/large-size/3.jpg",
    price: 80.00,
    discountedPrice: 100.00,
    description: "Bibenm lorem coectetur",
    starRating: 4,
    availableQuantity: 91,
    unitsSold: 8,
    fillPercentage: 60,
    countdownNumbers: "123 12 12 12",
    dealOfTheWeek: true
  },
  {
    id: "4",
    imageUrl: "images/product/large-size/4.jpg",
    price: 55.00,
    discountedPrice: 85.00,
    description: "Curabitur tristique neque",
    starRating: 4,
    availableQuantity: 369,
    unitsSold: 56,
    fillPercentage: 60,
    countdownNumbers: "123 12 12 12",
    dealOfTheWeek: true,
  },

  // Furniture Decor
  {
    id: '1',
    imageUrl: "images/product/medium-size/1-2.jpg",
    price: 100.00,
    discountedPrice: 150.00,
    description: "Lorem, ipsum dolor.",
    starRating: 5,
    furnitureDecor:true
  },
  {
    id:'2',
    imageUrl: "images/product/medium-size/2-2.jpg",
    price: 65.00,
    discountedPrice: 90.00,
    description: "Lorem, ipsum dolor.",
    starRating: 5,
    furnitureDecor:true
  },
  {
    id:'3',
    imageUrl: "images/product/medium-size/3-2.jpg",
    price: 80.00,
    discountedPrice: 100.00,
    description: "Lorem, ipsum dolor.",
    starRating: 3,
    furnitureDecor:true
  },
  {
    id:'4',
    imageUrl: "images/product/medium-size/4-2.jpg",
    price: 55.00,
    discountedPrice: 85.00,
    description: "Lorem, ipsum dolor.",
    starRating: 4,
    furnitureDecor:true
  },
  {
    id: '5',
    imageUrl: "images/product/medium-size/5-2.jpg",
    price: 45.00,
    discountedPrice: 70.00,
    description: "Lorem, ipsum dolor.",
    starRating: 4,
    furnitureDecor:true
  } ,


  //Home Accesories
  {
    id: '1',
    imageUrl: "images/product/medium-size/1-3.jpg",
    price: 100.00,
    discountedPrice: 150.00,
    description: "Lorem, ipsum dolor.",
    starRating: 5, 
    homeAccesories:true
  },
  {
    id:'2',
    imageUrl: "images/product/medium-size/2-3.jpg",
    price: 65.00,
    discountedPrice: 90.00,
    description: "Lorem, ipsum dolor.",
    starRating: 5,
    homeAccesories:true
  },
  {
    id:'3',
    imageUrl: "images/product/medium-size/3-3.jpg",
    price: 80.00,
    discountedPrice: 100.00,
    description: "Lorem, ipsum dolor.",
    starRating: 3,
    homeAccesories:true
  },
  {
    id:'4',
    imageUrl: "images/product/medium-size/4-3.jpg",
    price: 55.00,
    discountedPrice: 85.00,
    description: "Lorem, ipsum dolor.",
    starRating: 4,
    homeAccesories:true
  },
  {
    id: '5',
    imageUrl: "images/product/medium-size/5-3.jpg",
    price: 45.00,
    discountedPrice: 70.00,
    description: "Lorem, ipsum dolor.",
    starRating: 4,
    homeAccesories:true
  },


// Featured -- New Arrivals -- Best Seller
 
{
    id:'couch-big',
    imageUrl: "images/product/small-size/1.jpg",
    price: 100.00,
    discountedPrice: 150.00,
    description: "Lorem, ipsum dolor.",
    starRating: 5,
    lastSlide: true,
    targetContainer: "featured-container"
  },

  {
    id:'table-grey',
    imageUrl: "images/product/small-size/2.jpg",
    price: 65.00,
    discountedPrice: 90.00,
    description: "Lorem, ipsum dolor.",
    starRating: 5,
    lastSlide: true,
    targetContainer: "featured-container"
  },
  {
      id:'couch-small',
      imageUrl: "images/product/small-size/3.jpg",
      price: 80.00,
      discountedPrice: 100.00,
      description: "Lorem, ipsum dolor.",
      starRating: 5,
      lastSlide: true,
      targetContainer: "featured-container"
    },
    {
        id:'wooden-shelf',
      imageUrl: "images/product/small-size/4.jpg",
      price: 55.00,
      discountedPrice: 85.00,
      description: "Lorem, ipsum dolor.",
      starRating: 4,
      lastSlide: true,
      targetContainer: "new-arrivals-container"
    },
    {
        id:'glass-table',
        imageUrl: "images/product/small-size/5.jpg",
        price: 45.00,
        discountedPrice: 70.00,
        description: "Lorem, ipsum dolor.",
        starRating: 4,
        lastSlide: true,
        targetContainer: "new-arrivals-container"
      },
      {
        id:'wooden-shelf',
        imageUrl: "images/product/small-size/6.jpg",
        price: 55.00,
        discountedPrice: 85.00,
        description: "Lorem, ipsum dolor.",
        starRating: 4,
        lastSlide: true,
        targetContainer: "new-arrivals-container"
      },
      {
        id:'brown-chair',
      imageUrl: "images/product/small-size/7.jpg",
      price: 30.00,
      discountedPrice: 55.00,
      description: "Lorem, ipsum dolor.",
      starRating: 4,
      lastSlide: true,
      targetContainer: "best-seller-container"
    },
  
    {
        id:'white-chair',
        imageUrl: "images/product/small-size/8.jpg",
        price: 35.00,
        discountedPrice: 45.00,
        description: "Lorem, ipsum dolor.",
        starRating: 4,
        lastSlide: true,
        targetContainer: "best-seller-container"
    },
  
      {
        id:'wooden-shelf',
        imageUrl: "images/product/small-size/4.jpg",
        price: 55.00,
        discountedPrice: 85.00,
        description: "Lorem, ipsum dolor.",
        starRating: 4,
        lastSlide: true,
        targetContainer: "best-seller-container"
      },



      //adsArray
      {
        title: "Living Room Set",
        description1: "Huteville Plywood",
        description2: "New Chair",
        buttonClass: "btn btn--accent",
        backgroundClass: "background-image3",
        adsArray1:true
      },
      {
        title: "Home Decor",
        description1: "The Best Clock",
        description2: "Creative Furniture",
        buttonClass: "btn btn--primary",
        backgroundClass: "background-image4",
        adsArray1:true
      },

      {
        title: "Living Room Set",
        description1: "Huteville Plywood",
        description2: "New Chair",
        buttonClass: "btn btn--accent",
        backgroundClass: "background-image1",
        adsArray2:true
      },
      {
        title: "Home Decor",
        description1: "The Best Clock",
        description2: "Creative Furniture",
        buttonClass: "btn btn--accent",
        backgroundClass: "background-image2",
        adsArray2:true
      },


   // Related Products
{
  id: 'couch-big',
  imageUrl:"images/product/medium-size/1-3.jpg",
  price: 100.00,
  discountedPrice: 150.00,
  description: "Product 1 description",
  starRating: 4,
  relatedProducts: true
},
{
  id: 'table-grey',
  imageUrl:"images/product/medium-size/2-3.jpg",
  price: 65.00,
  discountedPrice: 90.00,
  description: "Product 1 description",
  starRating: 4,
  relatedProducts: true
},
{
  id: 'couch-small',
  imageUrl:"images/product/medium-size/3-3.jpg",
  price: 80.00,
  discountedPrice: 100.00,
  description: "Product 1 description",
  starRating: 4,
  relatedProducts: true
},
{
  id: 'brown-chair',
  imageUrl:"images/product/medium-size/7-3.jpg",
  price: 30.00,
  discountedPrice: 55.00,
  description: "Product 1 description",
  starRating: 4,
  relatedProducts: true
},
{
  id: 'glass-table',
  imageUrl:"images/product/medium-size/5-2.jpg",
  price: 45.00,
  discountedPrice: 70.00,
  description: "Product 1 description",
  starRating: 4,
  relatedProducts: true
},

//Upsell Products
{
  id: 'couch-big',
  imageUrl:"images/product/medium-size/1-3.jpg",
  price: 100.00,
  discountedPrice: 150.00,
  description: "Product 1 description",
  starRating: 4,
  upsellProducts:true
},
{
  id: 'table-grey',
  imageUrl:"images/product/medium-size/2-3.jpg",
  price: 65.00,
  discountedPrice: 90.00,
  description: "Product 1 description",
  starRating: 4,
  upsellProducts:true
},
{
  id: 'couch-small',
  imageUrl:"images/product/medium-size/3-3.jpg",
  price: 80.00,
  discountedPrice: 100.00,
  description: "Product 1 description",
  starRating: 4,
  upsellProducts:true
},
{
  id: 'white-chair',
  imageUrl:"images/product/medium-size/8-2.jpg",
  price: 35.00,
  discountedPrice: 45.00,
  description: "Product 1 description",
  starRating: 4,
  upsellProducts:true
},
{
  id: 'glass-table',
  imageUrl:"images/product/medium-size/5-2.jpg",
  price: 45.00,
  discountedPrice: 70.00,
  description: "Product 1 description",
  starRating: 4,
  upsellProducts:true
},
 ]; 
  
 