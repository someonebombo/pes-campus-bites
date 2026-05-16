const http = require('http');

let ordersDatabase = [];
let tokenCounter = 101; 

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    if (req.method === 'POST' && req.url === '/api/order') {
        let bodyBuffer = '';
        req.on('data', chunk => { bodyBuffer += chunk.toString(); });
        req.on('end', () => {
            try {
                const clientData = JSON.parse(bodyBuffer);
                
                const newOrderObj = {
                    id: tokenCounter++,
                    studentName: clientData.studentName,
                    studentUsn: clientData.studentUsn,
                    basket: clientData.basket,      // Stores multi-item shopping cart array
                    totalCost: clientData.totalCost, // Stores the final summed bill amount
                    timestamp: new Date()
                };

                ordersDatabase.push(newOrderObj);
                
                console.log(`\n[🛒 NEW ORDER RECEIVED - Ticket #${newOrderObj.id}]`);
                console.log(`Student: ${newOrderObj.studentName} (${newOrderObj.studentUsn})`);
                console.log(`Items Total Cost: ₹${newOrderObj.totalCost}`);
                console.log(`-----------------------------------------------`);

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: `Success! Token ID #${newOrderObj.id} created for ₹${newOrderObj.totalCost}.` }));
            } catch (err) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: "Payload schema mismatch error." }));
            }
        });
    } 
    
    else if (req.method === 'GET' && req.url === '/api/orders') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(ordersDatabase));
    } 
    
    else if (req.method === 'POST' && req.url === '/api/order/complete') {
        let bodyBuffer = '';
        req.on('data', chunk => { bodyBuffer += chunk.toString(); });
        req.on('end', () => {
            const target = JSON.parse(bodyBuffer);
            ordersDatabase = ordersDatabase.filter(item => item.id !== target.id);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: "Order wiped from live array active state." }));
        });
    }
    
    else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: "Endpoint invalid." }));
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`=======================================================`);
    console.log(`🚀 MULTI-ITEM KITCHEN SYSTEM LIVE AT: http://localhost:${PORT}`);
    console.log(`=======================================================`);
});
