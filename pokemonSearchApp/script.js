// script.js
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

async function searchPokemon() {
    const search = searchInput.value.toLowerCase().trim();
    if (!search) return;

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${search}`);
        if (!response.ok) {
            throw new Error('Pokemon not found');
        }
        const data = await response.json();
        
        // Update UI with animations
        document.getElementById('pokemon-name').textContent = data.name.toUpperCase();
        document.getElementById('pokemon-id').textContent = `#${data.id}`;
        document.getElementById('weight').textContent = `Weight: ${data.weight}`;
        document.getElementById('height').textContent = `Height: ${data.height}`;

        // Clear and update types with color coding
        const typesContainer = document.getElementById('types');
        typesContainer.innerHTML = '';
        data.types.forEach(type => {
            const typeSpan = document.createElement('span');
            typeSpan.textContent = type.type.name.toUpperCase();
            typeSpan.className = `type-${type.type.name}`;
            typesContainer.appendChild(typeSpan);
        });

        // Update sprite with animation
        const spriteContainer = document.querySelector('.sprite-container');
        spriteContainer.innerHTML = `<img id="sprite" src="${data.sprites.front_default}" alt="${data.name}">`;

        // Update stats with animation
        document.getElementById('hp').textContent = data.stats[0].base_stat;
        document.getElementById('attack').textContent = data.stats[1].base_stat;
        document.getElementById('defense').textContent = data.stats[2].base_stat;
        document.getElementById('special-attack').textContent = data.stats[3].base_stat;
        document.getElementById('special-defense').textContent = data.stats[4].base_stat;
        document.getElementById('speed').textContent = data.stats[5].base_stat;

    } catch (error) {
        alert('Pokémon not found');
    }
}

searchButton.addEventListener('click', searchPokemon);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') searchPokemon();
});