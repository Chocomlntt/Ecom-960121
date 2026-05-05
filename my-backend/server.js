const app = require("./app");   // ✅ มาก่อน

const cors = require('cors');

app.use(cors({
  origin: ['http://127.0.0.1:3000', 'http://localhost:3000'],
  methods: ['GET', 'POST'],
  credentials: true
}));

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});