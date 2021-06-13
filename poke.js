// Define variables to select parts of the DOM
const pokemonName = document.querySelector("#nameData");
const pokemonId = document.querySelector("#idData");
const pokemonTypes = document.querySelector("#typesData");
const pokemonHeight = document.querySelector("#heightData");
const pokemonWeight = document.querySelector("#weightData");
const pokemonGen = document.querySelector("#generationData");
// const pokemonEvolvesFrom = document.querySelector("#evolvesfromData");
const pokemonEvolvesTo = document.querySelector("#evolvesToData");
const pokemonEvolutionChain = document.querySelector("#evolution-chain");

async function fetchData() {
  // Fetch the total number of pokemon
  const response3 = await fetch(`https://pokeapi.co/api/v2/pokemon-species/`);
  const totalData = await response3.json();
  const pokeCount = totalData.count;

  // Select a random pokemon.
  const id = Math.floor(Math.random() * pokeCount);

  // Fetch the data from the chosen id
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const pokeData = await response.json();
  const response2 = await fetch(
    `https://pokeapi.co/api/v2/pokemon-species/${id}`
  );
  const speciesData = await response2.json();

  // Fetch evolution data for the given species
  const evolution = speciesData.evolution_chain.url;
  const response5 = await fetch(`${evolution}`);
  const evolutionData = await response5.json();

  // Define the pokemon's name for the given id
  const pokeName = pokeData.name;

  // Define the pokemon's id
  const pokeId = pokeData.id;

  // Define the pokemon's id
  const pokeHeight = pokeData.height;

  // Define the pokemon's id
  const pokeWeight = pokeData.weight;

  // Define the pokemon's generation
  const pokeGen = speciesData.generation.name;

  // Define the pokemon's type(s)
  const poke1Type = pokeData.types[0].type.name;

  // Only display the second type area if a second type exists
  if (pokeData.types[1]) {
    const poke2Types = pokeData.types[1].type.name;
    pokemonTypes.innerText = `${poke1Type} | ${poke2Types}`;
  } else {
    pokemonTypes.innerText = `${poke1Type}`;
  }

  // // Define the pokemon that this pokemon evolves from
  // const pokeEvolvesFrom = speciesData.evolves_from_species;
  //
  // // Only display the evolution data if it exists
  // if (pokeEvolvesFrom === null) {
  //   pokemonEvolvesFrom.innerText = ``;
  // } else {
  //   const pokeEvolutionFromName = speciesData.evolves_from_species.name;
  //   pokemonEvolvesFrom.innerText = `This pokemon evolves from ${pokeEvolutionFromName}`;
  // }

  // // Define the pokemon that this pokemon evolves to
  // const pokeEvolvesTo = evolutionData.chain;
  // console.log(pokeEvolvesTo);
  // // Check to see if the pokemon is the end of an evolution chain
  // const nameCheck =
  //   evolutionData.chain.evolves_to[0].evolves_to[0].species.name;
  // console.log(nameCheck);
  //
  // // Only display the evolution data if it exists
  // if (pokeEvolvesTo == null) {
  //   pokemonEvolvesTo.innerText = ``;
  // } else if (pokeEvolvesTo === nameCheck) {
  //   pokemonEvolvesTo.innerText = ``;
  // } else {
  //   const pokeEvolvesToName = evolutionData.chain.evolves_to[0].species.name;
  //   pokemonEvolvesTo.innerText = `This pokemon evolves to ${pokeEvolvesToName}`;
  //   console.log(pokeEvolvesToName);
  // }

  // Display the pokemon's name
  pokemonName.innerText = pokeName;

  // Display the pokemon's id
  pokemonId.innerText = pokeId;

  // Display the pokemon's height
  pokemonHeight.innerText = pokeHeight;

  // Display the pokemon's weight
  pokemonWeight.innerText = pokeWeight;

  // Display the pokemon's generation
  pokemonGen.innerText = pokeGen;

  // Display the pokemon's sprite
  const pokeImage = pokeData.sprites.front_default;
  const spriteCreate = document.getElementById("sprite");
  spriteCreate.setAttribute("src", `${pokeImage}`);
  spriteCreate.setAttribute("alt", `${pokeName}`);

  // Define the pokemon's possible evolution chains
  const evoChain = [];
  let evoData = evolutionData.chain;

  do {
    const numberOfEvolutions = evoData.evolves_to.length;

    evoChain.push(evoData.species.name);

    if (numberOfEvolutions > 1) {
      for (let i = 1; i < numberOfEvolutions; i += 1) {
        evoChain.push(evoData.evolves_to[i].species.name);
      }
    }

    evoData = evoData.evolves_to[0];
  } while (evoData !== undefined && evoData.hasOwnProperty("evolves_to"));

  // Define the pokemon that this pokemon evolves from
  const test = evolutionData.chain.evolves_to.length;
  if (test === 0) {
    pokemonEvolutionChain.innerText = `This Pokemon does not evolve.`;
    pokemonEvolvesTo.innerText = ``;
  } else {
    // Display the possible evolutions from this pokemon
    pokemonEvolutionChain.innerText = `Evolution chain:`;
    const stringifyEvolution = JSON.stringify(evoChain);
    const parsedEvolution = JSON.parse(stringifyEvolution);
    pokemonEvolvesTo.innerHTML = `${parsedEvolution.join(" --> ")}`;
  }
}

// Show a random pokemon on the initial page load
fetchData();

// Show a random pokemon every time this button is pressed
const button = document.querySelector(`#randomizer`);
button.addEventListener(`click`, fetchData);
