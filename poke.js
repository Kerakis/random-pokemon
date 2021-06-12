// Define variables to select parts of the DOM
const pokemonName = document.querySelector("#name");
const pokemonId = document.querySelector("#id");
const pokemonTypes = document.querySelector("#types");

async function fetchData() {
  // Select a random pokemon. Update this to take the string length of pokemon.species
  const id = Math.floor(Math.random() * 898);

  // Fetch the data from the chosen id
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const pokeData = await response.json();

  // Define the pokemon's name for the given id
  const pokeName = pokeData.name;

  // Define the pokemon's id
  const pokeId = pokeData.id;

  // Define the pokemon's type(s)
  const poke1Type = pokeData.types[0].type.name;

  // Only display the second type area if a second type exists
  if (pokeData.types[1]) {
    const poke2Types = pokeData.types[1].type.name;
    pokemonTypes.innerText = `${poke1Type} | ${poke2Types}`;
  } else {
    pokemonTypes.innerText = `${poke1Type}`;
  }

  // Display the pokemon's name
  pokemonName.innerText = pokeName;

  // Display the pokemon's id
  pokemonId.innerText = pokeId;

  // Display the pokemon's sprite
  const pokeImage = pokeData.sprites.front_default;
  const spriteCreate = document.getElementById("sprite");
  spriteCreate.setAttribute("src", `${pokeImage}`);
  spriteCreate.setAttribute("alt", `${pokeName}`);
}

// Show a random pokemon on the initial page load
fetchData();

// Show a random pokemon every time this button is pressed
const button = document.querySelector(`#randomizer`);
button.addEventListener(`click`, fetchData);
