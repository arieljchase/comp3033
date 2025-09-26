// Linking our connect and url modules
const connect = require('connect');
const url = require('url');

const app = connect();

// Write a GET /lab2 handler function
function lab2Handler(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    const parsedUrl = url.parse(req.url, true);
    const query = parsedUrl.query;

    // Parse URL for 3 parameters: method, x and y
    const method = query.method;
    const x = parseFloat(query.x);
    const y = parseFloat(query.y);

    let result;

    // Only possible values are add, subtract, multiply or divide - give an error for anything else
    if (method == 'add') {
        result = x + y;
    } else if (method == 'subtract') {
        result = x - y;
    } else if (method == 'multiply') {
        result = x * y;
    } else if (method == 'divide') {
        result = x / y;
    } else {
        res.end(JSON.stringify({ error: 'Invalid method! Please use either add, subtract, multiply, or divide.' }));
        return;
    }

    // Return the operation as a JSON object
    const response = {
        x: query.x,
        y: query.y,
        operation: method,
        result: result.toString()
    };

    res.end(JSON.stringify(response));
}

// GET lab2
app.use('/lab2', lab2Handler);

// Start the server on a port
app.listen(3000);
console.log('Server is running on http://localhost:3000');