const container = document.querySelector(".container");

function creation(variable) {
    // Use Math.min to ensure we do not exceed the number of available elements on smaller screens
    const total = Math.min(variable * variable, Math.floor(window.innerWidth / 50) * Math.floor(window.innerHeight / 50));

    // Clear the container before creating new elements
    container.innerHTML = '';

    for (let count = 0; count < total; count++) {
        let div = document.createElement("div");
        div.classList.add("element");
        container.appendChild(div);
        
        // Use CSS for size
        div.style.height = `100%`;
        div.style.width = `100%`;
        
        div.dataset.opacity = 0; // Initialize opacity
        div.style.backgroundColor = `rgba(0, 0, 0, ${div.dataset.opacity})`;

        // Set mouseenter event to change color based on chosen teinte
        div.addEventListener("mouseenter", () => coloration.call(div, teinte));

        div.addEventListener("touchmove", (e) => {
            e.preventDefault(); // Prevent scrolling when swiping
            coloration.call(div, teinte);
        });
    }
}

function coloration(teinte) {
    if (teinte === "color") {
        // Generate random color values
        const blue = Math.floor(Math.random() * 256);
        const red = Math.floor(Math.random() * 256);
        const green = Math.floor(Math.random() * 256);
        this.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`; // Set random color
        
        // Reset opacity when changing to a color
        this.dataset.opacity = 0;
    } else if (teinte === "black") {
        // Increase opacity for black color
        this.dataset.opacity = Math.min(1, parseFloat(this.dataset.opacity) + 0.1);
        this.style.backgroundColor = `rgba(0, 0, 0, ${this.dataset.opacity})`; // Black with current opacity
    }
}

// Set initial teinte value
let teinte = "black"; // Example: user can change this value
creation(16);

const input = document.querySelector("#slider");
const text1 = document.querySelector(".text1");
input.addEventListener("input", () => {
    text1.textContent = `${input.value}x${input.value}`;
    creation(input.value); // Call creation with the current value of the slider
});

const toggleButton = document.querySelector("#toggleButton");

toggleButton.addEventListener("click", () => {
    // Toggle the teinte value
    teinte = (teinte === "black") ? "color" : "black";
    toggleButton.textContent = (teinte === "black") ? "Switch to Random Color" : "Switch to Black Color";
});

const reset = document.querySelector("#reset");

reset.addEventListener("click", () => {
    const elements = document.querySelectorAll(".element");
    elements.forEach(el => { 
        el.style.backgroundColor = "rgba(0, 0, 0, 0)"; 
    });
});

// Touch event handlers
container.addEventListener("touchmove", (e) => {
    e.preventDefault(); // Prevent page scrolling while swiping

    // Get the position of the touch
    const touch = e.touches[0];
    const element = document.elementFromPoint(touch.clientX, touch.clientY);

    // Check if the touched element is one of our grid elements
    if (element && element.classList.contains("element")) {
        coloration.call(element, teinte); // Apply the color change
    }
});

container.addEventListener("touchstart", (e) => {
    // Prevent the default action for better touch control
    e.preventDefault();

    // Handle the first touch event
    const touch = e.touches[0];
    const element = document.elementFromPoint(touch.clientX, touch.clientY);

    if (element && element.classList.contains("element")) {
        coloration.call(element, teinte); // Apply the color change
    }
});

// Ensure the grid is responsive on window resize
window.addEventListener('resize', () => {
    creation(input.value); // Recreate the grid on window resize
});
