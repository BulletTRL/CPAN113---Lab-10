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

    //Returns total value of this product in stock from the inventory
    getTotalValue() {
        return this.price * this.quantity;
    }

    toString() {
        return `Name: ${this.name}, Price: $${this.price}, Quantity: ${this.quantity}`;
    }

    // static method to apply discount to products
    static applyDiscount(products, discount) {
        products.forEach(product => {
            product.price = Number((product.price * (1 - discount)).toFixed(2));
        });
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

//StoreProperties for inventory management
class StoreProperties {
    constructor() {
        this.inventory = [];
    }

    addProduct(product) {
        this.inventory.push(product);
    }

    getInventoryValue() {
        return this.inventory.reduce(
            (total, product) => total + product.getTotalValue(),
            0
        );
    }

    findProductByName(name) {
        return (
            this.inventory.find(
                (product) => product.name.toLowerCase() === name.toLowerCase()
            ) || null
        );
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

const apple = new ProductProperties("Apple", 0.99, 50);
const bread = new ProductProperties("Bread", 2.49, 30);
const cereal = new ProductProperties("Cereal", 4.99, 12);

// Create the store and add all products to this store
const store = new StoreProperties();
store.addProduct(perishable1);
store.addProduct(perishable2);
store.addProduct(apple);
store.addProduct(bread);
store.addProduct(cereal);

log("<strong>Store setup completed with 5 products (2 perishable).</strong>");

// Inventory value before discount displayed
const initialInventoryValue = store.getInventoryValue();
log(`<strong>Inventory value before discount:</strong> $${initialInventoryValue.toFixed(2)}`);

// Apply discount to all products in the store
ProductProperties.applyDiscount(store.inventory, 0.15);

// Inventory value after discount
const discountedInventoryValue = store.getInventoryValue();
log(`<strong>Inventory value after 15% discount:</strong> $${discountedInventoryValue.toFixed(2)}`);

console.log("Perishable Products");
console.log(perishable1.toString());
console.log(perishable2.toString());

log("<strong>Perishable Products Completed</strong>");
log(perishable1.toString());
log(perishable2.toString());

//Expiration Scan
simulateExpirationScan([perishable1, perishable2]);

//Error testing below
log ("<strong>Beginning Error Tests...</strong>");

    //Testing neg value
try {
    const badProduct1 = new PerishableProductProperties("Bad Milk", -5, 10, "2025-05-01");
    log(badProduct1.toString());
} catch (err) {
    log(`ERROR TEST 1: ${err.message}`);
}
    //Testing neg quantity
try {
    const badProduct2 = new PerishableProductProperties("Bad Juice", 4.99, -3, "2025-05-01");
    log(badProduct2.toString());
} catch (err) {
    log(`ERROR TEST 2: ${err.message}`);
}
    //Testing bad expiry
try {
    const badProduct3 = new PerishableProductProperties("Bad Cheese", 7.49, 4, "");
    log(badProduct3.toString());
} catch (err) {
    log(`ERROR TEST 3: ${err.message}`);
}

log ("Error Handling Tests Completed.");