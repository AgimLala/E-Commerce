function generateCards(articlesArray, adsContainer) {
  for (var i = 0; i < articlesArray.length; i++) {
    var ad = articlesArray[i];

    if ((ad.adsArray1 === true && adsContainer.id === "ads-container1") ||
        (ad.adsArray2 === true && adsContainer.id === "ads-container2")) {

      var cardElement = document.createElement("span");
      cardElement.classList.add("card", "card-type2", ad.backgroundClass);

      var cardTextElement = document.createElement("span");
      cardTextElement.classList.add("card__text", "card-text2");

      cardTextElement.innerHTML = `
        <p class="title">${ad.title}</p>
        <p class="description">${ad.description1}</p>
        <p class="description">${ad.description2}</p>
        <button class="${ad.buttonClass}">Shop Now</button>
      `;

      cardElement.appendChild(cardTextElement);
      adsContainer.appendChild(cardElement);
    }
  }
}

let adsContainer1 = document.getElementById("ads-container1");
generateCards(articlesArray, adsContainer1);

// Second set of cards
let adsContainer2 = document.getElementById("ads-container2");
generateCards(articlesArray, adsContainer2);




