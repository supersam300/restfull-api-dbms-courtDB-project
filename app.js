import express from 'express';
import cors from 'cors';
import courtRoutes from './routs/courtroutes.js';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use('/api/courts', courtRoutes);

app.get('/', (req, res) => {
  res.send('Court System Backend Running');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
