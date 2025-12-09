// Basic Setup

console.log("Lab 10 scripts have been loaded");

const output = document.getElementById("output");
const log = (msg) => (output.innerHTML += `<p>${msg}</p>`);

log("<strong>Phase 1 Setup has been Completed:</strong> HTML, CSS, and JavaScript linked successfully");

// Subclass Inharitance

class PerishableProductProperties extends ProductProperties {
    constructor(name, price, quantity, expirationDate) {
        super(name, price, quantity);  // call parent constructor
        this.expirationDate = expirationDate;
    }

    // Override parent method
    toString() {
        return `${super.toString()}, Expiration Date: ${this.expirationDate}`;
    }
}

const perishable1 = new PerishableProductProperties(
    "Milk",
    3.50,
    20,
    "2025-01-10"
);

const perishable2 = new PerishableProductProperties(
    "Yogurt",
    1.99,
    15,
    "2024-12-15"
);