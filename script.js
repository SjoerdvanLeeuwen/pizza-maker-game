// De init functie 
function init() {
    //Constanten en console log
    console.log ("hallo ?")
    const selectedToppings = new Set();
    const toppingSound = document.getElementById('topping-sound');
    const bakingSound = document.getElementById('baking-sound');
    const resetKnop = document.getElementById('reset-knop');
    const scoreSection = document.getElementById('score');
    const scoreAfbeeldingen = document.querySelectorAll('.score-afbeelding');
    const scoreTekst = document.getElementById('score-tekst');
    const pizzaBodem = document.getElementById('pizza-bodem');
    const pizzas = {
        "Pizza Margherita": ['tomatensaus', 'mozzarella', 'verse-basilicum', 'olijfolie'],
        "Pizza Pepperoni": ['tomatensaus', 'mozzarella', 'knoflook', 'pepperoni', 'olijfolie'],
        "Pizza Funghi": ['tomatensaus', 'mozzarella', 'champignons', 'paprika', 'olijfolie'],
        "Pizza Quattro Stagioni": ['tomatensaus', 'mozzarella', 'champignons', 'ham', 'olijven'],
        "Pizza Mediterrane Mix": ['tomatensaus', 'mozzarella', 'champignons', 'ham', 'knoflook', 'pepperoni', 'olijven', 'paprika']
    };

    //Topping toevoegen
    const addTopping = (topping) => {
        if (selectedToppings.has(topping)) return;
        selectedToppings.add(topping);
    
        const toppingImg = document.createElement('img');
        toppingImg.src = `afbeeldingen/${topping}.png`;
        toppingImg.alt = topping;
        toppingImg.className = 'topping';
        pizzaBodem.parentNode.appendChild(toppingImg);
        toppingSound.play();
    };

    //Score berekening en sterren toewijzen
    const calculateScore = () => {
        let stars = 0;
        const toppingsArray = Array.from(selectedToppings);
        let matchedPizza = "";

        for (const pizzaName in pizzas) {
            const pizzaIngredients = pizzas[pizzaName];
            if (pizzaIngredients.length === toppingsArray.length && pizzaIngredients.every((topping, index) => topping === toppingsArray[index])) {
                matchedPizza = pizzaName;
                if (pizzaName === "Pizza Margherita" || pizzaName === "Pizza Pepperoni") stars = 1;
                else if (pizzaName === "Pizza Funghi" || pizzaName === "Pizza Quattro Stagioni") stars = 2;
                else if (pizzaName === "Pizza Mediterrane Mix") stars = 3;
                break;
            }
        }

        scoreSection.style.display = 'block';
        scoreAfbeeldingen.forEach(img => img.style.display = 'none');
        if (stars) {
            scoreAfbeeldingen[stars].style.display = 'block';
            scoreTekst.textContent = `Je hebt de ${matchedPizza} gemaakt!`;
        } else {
            scoreAfbeeldingen[0].style.display = 'block';
            scoreTekst.textContent = 'Dit kan je geen pizza noemen!';
        }
    };

    // Event handlers
    const handleToppingButtonClick = (event) => {
        const toppingButton = event.target.closest('.topping-knop');
        if (toppingButton) addTopping(toppingButton.getAttribute('data-topping'));
    };

    const handleBakKnopClick = () => {
        calculateScore();
        bakingSound.play();
        resetKnop.style.display = 'block';
    };

    const handleResetKnopClick = () => {
        selectedToppings.clear();
        document.querySelectorAll('.topping').forEach(topping => topping.remove());
        scoreSection.style.display = 'none';
        resetKnop.style.display = 'none';
    };

    const handleKookboekClick = () => {
        const ingredientsList = document.getElementById('ingredients-list');
        ingredientsList.innerHTML = '';
        for (const pizza in pizzas) {
            const listItem = document.createElement('li');
            listItem.textContent = `${pizza}: ${pizzas[pizza].join(', ')}`;
            ingredientsList.appendChild(listItem);
        }
        document.getElementById('popup').style.display = 'flex';
    };

    const handleClosePopupClick = () => document.getElementById('popup').style.display = 'none';

    // Event listeners
    document.querySelectorAll('.topping-knop').forEach(button => button.addEventListener('click', handleToppingButtonClick));
    document.getElementById('bak-knop').addEventListener('click', handleBakKnopClick);
    resetKnop.addEventListener('click', handleResetKnopClick);
    document.getElementById('kookboek').addEventListener('click', handleKookboekClick);
    document.getElementById('close-popup').addEventListener('click', handleClosePopupClick);
}

document.addEventListener("DOMContentLoaded", init);
