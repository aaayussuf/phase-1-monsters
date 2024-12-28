document.addEventListener("DOMContentLoaded", () => {
    const monsterContainer = document.querySelector("#monster-container");
    const formContainer = document.querySelector("#create-monster");
    const paginationContainer = document.querySelector("#pagination");
  
    let currentPage = 1;
    const limit = 50;
  
    // Fetch monsters and render them
    function fetchMonsters(page = 1) {
      fetch(`http://localhost:3000/monsters/?_limit=${limit}&_page=${page}`)
        .then((response) => response.json())
        .then((monsters) => {
          monsterContainer.innerHTML = ""; // Clear the container
          monsters.forEach(renderMonster);
        });
    }
  
    // Render a single monster to the DOM
    function renderMonster(monster) {
      const monsterDiv = document.createElement("div");
      monsterDiv.classList.add("monster");
  
      monsterDiv.innerHTML = `
        <h2>${monster.name}</h2>
        <h4>Age: ${monster.age.toFixed(2)}</h4>
        <p>${monster.description}</p>
      `;
  
      monsterContainer.appendChild(monsterDiv);
    }
  
    // Add the form to create a new monster
    function createMonsterForm() {
      const form = document.createElement("form");
      form.id = "monster-form";
  
      form.innerHTML = `
        <input type="text" name="name" placeholder="Name" required />
        <input type="number" name="age" placeholder="Age" required />
        <input type="text" name="description" placeholder="Description" required />
        <button type="submit">Create Monster</button>
      `;
  
      form.addEventListener("submit", (event) => {
        event.preventDefault();
  
        const name = event.target.name.value;
        const age = parseFloat(event.target.age.value);
        const description = event.target.description.value;
  
        createMonster({ name, age, description });
  
        form.reset();
      });
  
      formContainer.appendChild(form);
    }
  
    // Create a new monster in the API
    function createMonster(monsterData) {
      fetch("http://localhost:3000/monsters", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(monsterData),
      })
        .then((response) => response.json())
        .then((monster) => {
          alert("Monster created successfully!");
          renderMonster(monster);
        });
    }
  
    // Add pagination buttons
    function createPagination() {
      const nextButton = document.createElement("button");
      nextButton.innerText = "Next 50 Monsters";
      nextButton.addEventListener("click", () => {
        currentPage++;
        fetchMonsters(currentPage);
      });
  
      const prevButton = document.createElement("button");
      prevButton.innerText = "Previous 50 Monsters";
      prevButton.disabled = true; // Disable the button initially
  
      prevButton.addEventListener("click", () => {
        if (currentPage > 1) {
          currentPage--;
          fetchMonsters(currentPage);
          if (currentPage === 1) {
            prevButton.disabled = true;
          }
        }
      });
  
      paginationContainer.appendChild(prevButton);
      paginationContainer.appendChild(nextButton);
    }
  
    // Initialize the app
    function init() {
      createMonsterForm();
      fetchMonsters(currentPage);
      createPagination();
    }
  
    init();
  });
  