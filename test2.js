// Flagged by SAST tool as SQL Injection vulnerability
const userId = req.params.id;
//if (!userId.match(/^[0-9]+$/)) {
//  return res.status(400).send('Invalid user ID');
//}

const query = 'SELECT * FROM users WHERE id = ' + userId;
const user = await db.query(query);
