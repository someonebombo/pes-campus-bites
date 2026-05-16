// ==========================================================================
// 🍔 1. COMPLETE MOUTH-WATERING CANTEEN DATABASE ARRAY
// ==========================================================================
const canteenItems = [
    // 🥪 Category: Street Food & Pav Favorites
    { id: 1, name: "Vada Pav", price: 20, emoji: "🍔" },
    { id: 2, name: "Mirchi Pav", price: 15, emoji: "🌶️" },
    { id: 4, name: "Patal Bhaji Pav", price: 30, emoji: "🍲" },
    { id: 5, name: "Mix Kurma Pav", price: 40, emoji: "🥣" },
    { id: 6, name: "Ros Omelette Pav", price: 60, emoji: "🍳" },
     { id: 3, name: "kurma Pav Bhaji", price: 40, emoji: "🍛" },

    // 🍚 Category: Mains & Rice Dishes
    { id: 7, name: "Chicken Biryani", price: 150, emoji: "🍗" },
    { id: 8, name: "Veg Fried Rice", price: 100, emoji: "🍚" },

    // 🌯 Category: Canteen Rolls
    { id: 9, name: "Chicken Roll", price: 50, emoji: "🌯" },
    { id: 10, name: "Mushroom Roll", price: 30, emoji: "🍄" },
    { id: 11, name: "Paneer Roll", price: 40, emoji: "🧀" },

    // 🥤 Category: Soft Drinks & Beverages
    { id: 12, name: "Coca-Cola (Can)", price: 20, emoji: "🥤" },
    { id: 13, name: "Pepsi (Can)", price: 20, emoji: "🥤" },
    { id: 14, name: "Sprite (Can)", price: 20, emoji: "🥤" },
    { id: 15, name: "Normal Soda", price: 10, emoji: "🫧" },
    { id: 16, name: "Refreshing Mocktail", price: 50, emoji: "🍹" },
    { id: 17, name: "Maaza Mango Drink", price: 40, emoji: "🥭" },

    // 🍱 Category: Full Meals & Special Thalis
    { id: 18, name: "Standard Veg Thali", price: 100, emoji: "🍱" },
    { id: 19, name: "Mackeral (Bangda) Fish Thali", price: 150, emoji: "🐟" },
    { id: 20, name: "King Fish (Visvon) Special Thali", price: 220, emoji: "👑" }
];

// ==========================================================================
// 🛒 2. LAYOUT ENGINE & FORM CALCULATION LOGIC
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
    const selectorGrid = document.getElementById("menuSelectorGrid");
    if (!selectorGrid) return;

    selectorGrid.innerHTML = '';

    // Automatically build interactive list rows on your webpage
    canteenItems.forEach(item => {
        const row = document.createElement("div");
        row.style.display = "flex";
        row.style.alignItems = "center";
        row.style.justifyContent = "space-between";
        row.style.padding = "0.75rem 0";
        row.style.borderBottom = "1px solid #e2e8f0";

        row.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                <input type="checkbox" class="food-checkbox" value="${item.name}" data-price="${item.price}" style="width: auto; margin: 0;">
                <span>${item.emoji} <strong>${item.name}</strong> (₹${item.price})</span>
            </div>
            <select class="food-qty" style="max-width: 70px; padding: 0.3rem;" disabled>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
        `;
        selectorGrid.appendChild(row);
    });

    // Watch for when quantities or checkboxes change states
    selectorGrid.addEventListener("change", (e) => {
        if (e.target.classList.contains("food-checkbox")) {
            const qtySelect = e.target.closest("div").nextElementSibling;
            qtySelect.disabled = !e.target.checked;
            if (!e.target.checked) qtySelect.value = "1";
        }
        calculateLiveTotal();
    });
});

// Live price calculator engine
function calculateLiveTotal() {
    let total = 0;
    const checkboxes = document.querySelectorAll(".food-checkbox");
    
    checkboxes.forEach(box => {
        if (box.checked) {
            const price = parseInt(box.getAttribute("data-price"));
            const qty = parseInt(box.closest("div").nextElementSibling.value);
            total += price * qty;
        }
    });
    
    document.getElementById("liveTotalDisplay").textContent = `Total Bill: ₹${total}`;
}

// Order dispatcher network bundle
document.getElementById('orderForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const studentName = document.getElementById('studentName').value.trim();
    const studentUsn = document.getElementById('studentUsn').value.trim();
    const statusMessage = document.getElementById('statusMessage');
    const submitBtn = document.getElementById('submitBtn');

    let selectedMeals = [];
    let orderTotalCost = 0;
    const checkboxes = document.querySelectorAll(".food-checkbox");

    checkboxes.forEach(box => {
        if (box.checked) {
            const itemName = box.value;
            const itemPrice = parseInt(box.getAttribute("data-price"));
            const itemQty = parseInt(box.closest("div").nextElementSibling.value);
            
            selectedMeals.push({ name: itemName, qty: itemQty, subtotal: itemPrice * itemQty });
            orderTotalCost += itemPrice * itemQty;
        }
    });

    if (selectedMeals.length === 0) {
        statusMessage.style.backgroundColor = '#fde8e8';
        statusMessage.style.color = '#9b1c1c';
        statusMessage.textContent = 'Please select at least 1 item before ordering.';
        statusMessage.style.display = 'block';
        return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Processing Order...';

    try {
        const response = await fetch('https://onrender.com', {

            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ studentName, studentUsn, basket: selectedMeals, totalCost: orderTotalCost })
        });

        const result = await response.json();
        
        statusMessage.style.backgroundColor = '#def7ec';
        statusMessage.style.color = '#03543f';
        statusMessage.textContent = result.message;
        statusMessage.style.display = 'block';
        
        document.getElementById('orderForm').reset();
        document.querySelectorAll(".food-qty").forEach(sel => sel.disabled = true);
        calculateLiveTotal();
    } catch (error) {
        statusMessage.style.backgroundColor = '#fde8e8';
        statusMessage.style.color = '#9b1c1c';
        statusMessage.textContent = 'Error contacting backend kitchen server.';
        statusMessage.style.display = 'block';
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Order to Kitchen';
    }
});
