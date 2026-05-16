async function fetchLiveOrders() {
    const ordersList = document.getElementById('ordersList');
    if (!ordersList) return;
    
    try {
       const response = await fetch('http://localhost:5000/api/orders');
        
        ordersList.innerHTML = '';

        if (orders.length === 0) {
            ordersList.innerHTML = '<p style="text-align: center; color: #4b5563; padding: 2rem;">No active kitchen orders right now.</p>';
            return;
        }

        // Loop over orders and generate a beautiful receipt box for each customer
        orders.forEach((order) => {
            const orderCard = document.createElement('div');
            orderCard.className = 'admin-order-card';
            
            // Build the multi-item list rows
            let basketHTML = '<ul style="margin: 0.5rem 0; padding-left: 1.25rem; color: #334155;">';
            order.basket.forEach(item => {
                basketHTML += `<li style="margin-bottom: 0.25rem;">✨ <strong>${item.name}</strong> x ${item.qty}</li>`;
            });
            basketHTML += '</ul>';

            orderCard.innerHTML = `
                <div class="order-details" style="text-align: left; width: 100%;">
                    <span class="order-id" style="font-weight: 800; color: #64748b;">Token ID: #${order.id}</span>
                    <div style="margin: 0.5rem 0; font-size: 1.05rem;">
                        <strong>Student:</strong> ${order.studentName} <br>
                        <strong>USN:</strong> ${order.studentUsn}
                    </div>
                    <hr style="border: 0; border-top: 1px dashed #cbd5e1; margin: 0.5rem 0;">
                    <strong>Items Ordered:</strong>
                    ${basketHTML}
                    <hr style="border: 0; border-top: 1px dashed #cbd5e1; margin: 0.5rem 0;">
                    <div style="font-size: 1.15rem; color: #003A70; margin-top: 0.5rem;">
                        <strong>Total Amount: ₹${order.totalCost}</strong>
                    </div>
                    <small style="color: #94a3b8; display: block; margin-top: 0.5rem;">Ordered at: ${new Date(order.timestamp).toLocaleTimeString()}</small>
                </div>
                <button class="complete-btn" onclick="completeOrder(${order.id})" style="margin-left: 1.5rem; white-space: nowrap;">✅ Complete</button>
            `;
            ordersList.appendChild(orderCard);
        });
    } catch (error) {
        ordersList.innerHTML = '<p style="text-align: center; color: #9b1c1c; padding: 2rem;">Error: Failed to fetch live orders from the database server.</p>';
    }
}

// Clears the order when food is collected
async function completeOrder(id) {
    try {
        const response = await fetch('http://localhost:5000/api/order/complete', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: id })
        });
        if (response.ok) {
            fetchLiveOrders(); // Refresh screen instantly
        }
    } catch (error) {
        alert('Could not update order status.');
    }
}

document.getElementById('refreshBtn').addEventListener('click', fetchLiveOrders);
window.onload = fetchLiveOrders;

async function completeOrder(id) {
    try {
        const response = await fetch('http://localhost:3000/api/order/complete', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: id })
        });
        if (response.ok) {
            fetchLiveOrders();
        }
    } catch (error) {
        alert('Could not process order completion.');
    }
}

document.getElementById('refreshBtn').addEventListener('click', fetchLiveOrders);
window.onload = fetchLiveOrders;
