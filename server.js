const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.set('port', port);

app.use(express.static(__dirname + '/docs'));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
}).on('error', (err) => {
  console.error('Server error:', err);
});
