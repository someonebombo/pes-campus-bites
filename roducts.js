// 🍔 CENTRAL CANTEEN MENU DATABASE
const canteenItems = [
    // 🥪 Category: Street Food & Pav Favorites
    { id: 1, name: "Vada Pav", price: 30, emoji: "🍔" },
    { id: 2, name: "Mirchi Pav", price: 25, emoji: "🌶️" },
    { id: 3, name: "Pav Bhaji", price: 90, emoji: "🍛" },
    { id: 4, name: "Patal Bhaji Pav", price: 50, emoji: "🍲" },
    { id: 5, name: "Mix Kurma Pav", price: 60, emoji: "🥣" },
    { id: 6, name: "Ros Omelette Pav", price: 80, emoji: "🍳" },

    // 🍚 Category: Mains & Rice Dishes
    { id: 7, name: "Chicken Biryani", price: 160, emoji: "🍗" },
    { id: 8, name: "Veg Fried Rice", price: 110, emoji: "🍚" },

    // 🌯 Category: Canteen Rolls
    { id: 9, name: "Chicken Roll", price: 90, emoji: "🌯" },
    { id: 10, name: "Mushroom Roll", price: 80, emoji: "🍄" },
    { id: 11, name: "Paneer Roll", price: 85, emoji: "🧀" },

    // 🥤 Category: Soft Drinks & Beverages
    { id: 12, name: "Coca-Cola (Can)", price: 40, emoji: "🥤" },
    { id: 13, name: "Pepsi (Can)", price: 40, emoji: "🥤" },
    { id: 14, name: "Sprite (Can)", price: 40, emoji: "🥤" },
    { id: 15, name: "Normal Soda", price: 20, emoji: "🫧" },
    { id: 16, name: "Refreshing Mocktail", price: 70, emoji: "🍹" },
    { id: 17, name: "Maaza Mango Drink", price: 35, emoji: "🥭" },

    // 🍱 Category: Full Meals & Special Thalis
    { id: 18, name: "Standard Veg Thali", price: 100, emoji: "🍱" },
    { id: 19, name: "Mackeral (Bangda) Fish Thali", price: 150, emoji: "🐟" },
    { id: 20, name: "King Fish (Visvon) Special Thali", price: 220, emoji: "👑" }
];

// Share this across frontend and backend modules safely
if (typeof module !== 'undefined' && module.exports) {
    module.exports = canteenItems;
}
