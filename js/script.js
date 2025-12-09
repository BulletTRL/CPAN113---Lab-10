// Basic Setup

console.log("Lab 10 scripts have been loaded");

const output = document.getElementById("output");
const log = (msg) => (output.innerHTML += `<p>${msg}</p>`);

log("<strong>HTML, CSS, and JavaScript linked successfully");


// Custom Error Classes

class ProductError extends Error {
    constructor(message) {
        super(message);
        this.name = "ProductError";
    }
}

// ProductProperties Class

class ProductProperties {
    constructor(name, price, quantity) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }

    toString() {
        return `Name: ${this.name}, Price: $${this.price}, Quantity: ${this.quantity}`;
    }
}

// Subclass Inharitance

class PerishableProductProperties extends ProductProperties {
    constructor(name, price, quantity, expirationDate) {
        super(name, price, quantity);  
        this.expirationDate = expirationDate;

        // ⭐ Phase 3 Validation Logic (Commit 11)
        if (price < 0) {
            throw new ProductError("PRICE CANNOT BE NEGATIVE");
        }
        if (quantity < 0) {
            throw new ProductError("QUANTITY CANNOT BE NEGATIVE");
        }
        if (!expirationDate) {
            throw new ProductError("EXPIRATION DATE IS REQUIRED");
        }
    }

    toString() {
        return `${super.toString()}, Expiration Date: ${this.expirationDate}`;
    }
}

//Expiration Checker

function checkExpiration(product) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const today = new Date();
            const expiry = new Date(product.expirationDate);

            if (expiry < today) {
                reject(`❌ EXPIRED: ${product.name} expired on ${product.expirationDate}`);
            } else {
                resolve(`✅ OK: ${product.name} is still valid until ${product.expirationDate}`);
            }
        }, 1000); // 1-second delay to simulate async scan
    });
}

async function simulateExpirationScan(products) {
    log("<strong>Running Expiration Scan...</strong>");

    for (const p of products) {
        try {
            const result = await checkExpiration(p);
            log(result);
        } catch (error) {
            log(error);
        }
    }

    log("<strong>Scan Finished</strong>");
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

console.log("Perishable Products");
console.log(perishable1.toString());
console.log(perishable2.toString());

log("<strong>Perishable Products Completed</strong>");
log(perishable1.toString());
log(perishable2.toString());

//Expiration Scan
simulateExpirationScan([perishable1, perishable2]);