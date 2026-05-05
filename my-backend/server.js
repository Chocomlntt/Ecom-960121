const app = require("./app");   // ✅ มาก่อน

const cors = require('cors');

app.use(cors({
  origin: ['http://127.0.0.1:5500', 'http://localhost:5500'],
  methods: ['GET', 'POST'],
  credentials: true
}));

const PORT = 5500;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});