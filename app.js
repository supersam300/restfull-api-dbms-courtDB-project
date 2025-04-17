import express from 'express';
import cors from 'cors';
import courtRoutes from './routs/courtroutes.js';

const app = express();
const PORT = 8080;
app.use(cors({
  origin: 'http://localhost:8080',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
  credentials: true
}));


app.use(express.json());

// ✅ Routes
app.use('/api/courts', courtRoutes);


app.get('/', (req, res) => {
  res.send('Court System Backend Running');
});


app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
