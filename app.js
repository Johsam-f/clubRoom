const express = require('express');
const app = express();

// Your middleware and route setup here...

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
