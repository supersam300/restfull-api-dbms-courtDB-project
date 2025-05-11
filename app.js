import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import courtRoutes from './routs/courtroutes.js';
import judgeRoutes from './routs/judgeRoute.js';
import { router as lawyerRoutes } from './routs/lawerRoutes.js';
import plaintiffRoutes from './routs/plaintiffRoute.js';
import defendantRoutes from './routs/defandentroute.js';
import partyRoutes from './routs/party.js';
import masterRoutes from './routs/masterRoute.js'; 
import verdictRoutes from './routs/verdictRoute.js';
import caseRoutes from './routs/caseRoute.js'; // Import the case routes
import caselawerroutes from './routs/caselawerRoute.js'; // Import the case law routes                            
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000; //set the port you wanna use here

app.use(cors({
  origin: '*', 
}));

app.use(express.json());

// Serve static files (e.g., HTML files) from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/courts', courtRoutes);
app.use('/api/judges', judgeRoutes);
app.use('/api/lawyers', lawyerRoutes);
app.use('/api/plaintiffs', plaintiffRoutes);
app.use('/api/defendants', defendantRoutes);
app.use('/api/parties', partyRoutes);
app.use('/api/mastertable', masterRoutes); 
app.use('/api/verdicts', verdictRoutes); 
app.use('/api/cases', caseRoutes); // Add the case routes
app.use('/api/caselawyers', caselawerroutes); // Add the case law routes  
app.get('/', (req, res) => {
  res.send('Court System Backend Running on Port 3000');
});

app.listen(PORT, () => {
  console.log(` UwU Server running at http://localhost:${PORT} <3`);
});
