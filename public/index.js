const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.status(200).json({ msg: "Welcome on public service" });
});

app.listen(port, () => {
  console.log(`Public service running on port ${port}`);
});
