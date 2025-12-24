// Test file to verify module loads in Electron
console.log('Testing module load...');
const db = require('../lib/index');
console.log('Module loaded successfully');
const conn = db.createConnection();
console.log('Connection created:', typeof conn);
process.exit(0);
