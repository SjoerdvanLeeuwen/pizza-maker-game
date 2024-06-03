function init() {
    console.log ("hallo ?")
    const selectedToppings = new Set();
    const toppingSound = document.getElementById('topping-sound');
    const bakingSound = document.getElementById('baking-sound');

//hoofdfunctie die wordt aangeroepen wanneer het DOM is geladen

    function handleToppingButtonClick(event) {
        const toppingButton = event.target.closest('.topping-knop');
        if (!toppingButton) return;
        const topping = toppingButton.getAttribute('data-topping');
        addTopping(topping);
        toppingSound.play();
    }

//topping toevoegen

    function handleBakKnopClick() {
        calculateScore();
        bakingSound.play();
        document.getElementById('reset-knop').style.display = 'block';
    }

//bakknop

    function handleResetKnopClick() {
        selectedToppings.clear();
        document.querySelectorAll('.topping').forEach(topping => topping.remove());
        document.getElementById('score').style.display = 'none';
        document.getElementById('reset-knop').style.display = 'none';
    }

//resetknop

    function handleKookboekClick() {
        const ingredientsList = document.getElementById('ingredients-list');
        ingredientsList.innerHTML = '';
        for (const pizza in pizzas) {
            const listItem = document.createElement('li');
            listItem.textContent = `${pizza}: ${pizzas[pizza].join(', ')}`;
            ingredientsList.appendChild(listItem);
        }
        document.getElementById('popup').style.display = 'flex';
    }

//kookboekknop

    function handleClosePopupClick() {
        document.getElementById('popup').style.display = 'none';
    }

//kookboeksluiten

    const pizzas = {
        "Pizza Margherita": ['tomatensaus', 'mozzarella', 'verse-basilicum', 'olijfolie'],
        "Pizza Pepperoni": ['tomatensaus', 'mozzarella', 'knoflook', 'pepperoni', 'olijfolie'],
        "Pizza Funghi": ['tomatensaus', 'mozzarella', 'champignons', 'paprika', 'olijfolie'],
        "Pizza Quattro Stagioni": ['tomatensaus', 'mozzarella', 'champignons', 'ham', 'olijven'],
        "Pizza Mediterrane Mix": ['tomatensaus', 'mozzarella', 'champignons', 'ham', 'knoflook', 'pepperoni', 'olijven', 'paprika']
    };

//pizzarecepten

    function addTopping(topping) {
        if (selectedToppings.has(topping)) {
            return;
        }
        selectedToppings.add(topping);

        const toppingImg = document.createElement('img');
        toppingImg.src = `afbeeldingen/${topping}.png`;
        toppingImg.alt = topping;
        toppingImg.className = 'topping';

        const pizzaBodem = document.getElementById('pizza-bodem');
        pizzaBodem.parentNode.appendChild(toppingImg);
    }

//topping toevoegen, wanneer topping als is geselecteerd gebeurt er niks en voegt afbeelding toe op de pizzabodem

    function calculateScore() {
        let stars = 0;
        const toppingsArray = Array.from(selectedToppings);
        let matchedPizza = "";

        for (const pizzaName in pizzas) {
            const pizzaIngredients = pizzas[pizzaName];
            if (compareArrays(pizzaIngredients, toppingsArray)) {
                matchedPizza = pizzaName;
                stars = pizzaName === "Pizza Margherita" ? 1 :
                        pizzaName === "Pizza Pepperoni" ? 1 :
                        pizzaName === "Pizza Funghi" ? 2 :
                        pizzaName === "Pizza Quattro Stagioni" ? 2 :
                        pizzaName === "Pizza Mediterrane Mix" ? 3 : 0;
                break;
            }
        }

        const scoreAfbeeldingen = document.querySelectorAll('.score-afbeelding');
        const scoreTekst = document.getElementById('score-tekst');
        const scoreSection = document.getElementById('score');

        scoreSection.style.display = 'block';

        scoreAfbeeldingen.forEach(img => {
            img.style.display = 'none';
        });

        switch (stars) {
            case 1:
                scoreAfbeeldingen[1].style.display = 'block';
                scoreTekst.textContent = matchedPizza === "Pizza Margherita" ? 'Netjes, je hebt de Pizza Margherita gemaakt!' : 'Netjes, je hebt de Pizza Pepperoni gemaakt!';
                break;
            case 2:
                scoreAfbeeldingen[2].style.display = 'block';
                scoreTekst.textContent = matchedPizza === "Pizza Funghi" ? 'Super, je hebt de Pizza Funghi gemaakt!' : 'Super, je hebt de Pizza Quattro Stagioni gemaakt!';
                break;
            case 3:
                scoreAfbeeldingen[3].style.display = 'block';
                scoreTekst.textContent = 'Extreem goed gedaan, je hebt de Pizza Mediterrane Mix gemaakt!';
                break;
            default:
                scoreAfbeeldingen[0].style.display = 'block';
                scoreTekst.textContent = 'Dit kan je geen pizza noemen!';
                break;
        }
    }
    //Berekent de score op basis van de geselecteerde toppings en vergelijkt ze met de ingrediënten van elk pizzarecept. Het bepaalt het aantal sterren en toont een bericht op basis van de overeenkomende pizza.
    //https://chatgpt.com/share/5071d117-1530-4333-879d-87846b698ab9
    //https://www.w3schools.com/java/java_switch.asp

    function compareArrays(arr1, arr2) {
        if (arr1.length !== arr2.length) {
            return false;
        }
        const sortedArr1 = arr1.slice().sort();
        const sortedArr2 = arr2.slice().sort();
        return sortedArr1.every((element, index) => {
            return element === sortedArr2[index];
        });
    }
    //Vergelijkt twee arrays op gelijkheid, voor herkenning van de pizzarecepten

    document.querySelectorAll('.topping-knop').forEach(button => {
        button.addEventListener('click', handleToppingButtonClick);
    });

    document.getElementById('bak-knop').addEventListener('click', handleBakKnopClick);
    document.getElementById('reset-knop').addEventListener('click', handleResetKnopClick);
    document.getElementById('kookboek').addEventListener('click', handleKookboekClick);
    document.getElementById('close-popup').addEventListener('click', handleClosePopupClick);
}
//Toegevoegd aan verschillende knoppen en elementen op de pagina
//https://www.w3schools.com/jsref/met_element_addeventlistener.asp

document.addEventListener("DOMContentLoaded", init);

