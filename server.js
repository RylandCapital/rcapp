const express = require('express');
const cors = require('cors');
const path = require('path')

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "build")))


app.listen(PORT, () => {
  console.log(`app running on port ${port}`)
});