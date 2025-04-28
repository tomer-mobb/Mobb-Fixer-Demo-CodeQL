const crypto = require('crypto');
const checksum = crypto.createHash('md5').update(data).digest('hex');
console.log(checksum);
