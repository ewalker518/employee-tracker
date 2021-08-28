const inquirer = require('inquirer');
const db = require('./db/connection');
const PORT = process.env.PORT || 3002;
const app = express();
require('dotenv').config()

// Start server after DB connection
app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});