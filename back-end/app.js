require('dotenv').config(); // Load environment variables
const express = require('express');
const cors = require('cors');
const path = require('path');
const { getInvestors, getCompetitors, getCompetitorInvestors } = require('./investors');
const { getAcquisitionTargets } = require('./manda'); // Your existing M&A logic
const { analyzeCompaniesWithAI } = require('./ai-analyzer'); 

const app = express();
const port = process.env.PORT || 3000;

// Serve static files
const frontendPath = path.join(__dirname, '../front-end');
const resourcesPath = path.join(__dirname, '../resources');
app.use(express.static(frontendPath));
app.use('/resources', express.static(resourcesPath));

// Middleware
app.use(cors());
app.use(express.json());

// Route to fetch investors (unchanged)
app.post('/api/investors', async (req, res) => {
  try {
    const searchCriteria = req.body;
    const investors = await getInvestors(searchCriteria);
    res.json({ investors });
  } catch (error) {
    console.error('Error fetching investors:', error.message);
    res.status(500).json({ error: 'Failed to fetch investors' });
  }
});

// Updated route to fetch M&A targets with AI analysis
app.post('/api/:mode-targets', async (req, res) => {
    const { mode } = req.params;
    const { industry, geography, clientDescription } = req.body;
  
    try {
      let targets;
      if (mode === 'acquisition') {
        // Step 1: Get raw companies from Crunchbase
        targets = await getAcquisitionTargets(industry, geography);
  
        // Step 2: Analyze ALL companies with AI
        if (clientDescription && targets.length > 0) {
          targets = await analyzeCompaniesWithAI(targets, clientDescription); 
        }
      } else if (mode === 'merger') {
        targets = await getMergerTargets(industry, geography);
      } else if (mode === 'exit') {
        targets = await getExitTargets(industry, geography);
      }
  
      res.json({ targets: targets || [] });
    } catch (error) {
      console.error(`[${mode.toUpperCase()}] Error:`, error);
      res.status(500).json({ error: `${mode} search failed: ${error.message}` });
    }
});
// Route to fetch competitor-related investors
app.post('/api/competitor-investors', async (req, res) => {
  try {
    const competitorDomains = req.body.competitorDomains;
    const competitorInvestors = await getCompetitorInvestors(competitorDomains);
    res.json({ competitorInvestors });
  } catch (error) {
    console.error('Error fetching competitor investors:', error.message);
    res.status(500).json({ error: 'Failed to fetch competitor investors' });
  }
});


// Serve frontend (unchanged)
app.get('/', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
