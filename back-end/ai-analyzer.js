require('dotenv').config();

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

function loadLlamaModelResponse(inputText) {
  const modelDirectory = path.join(__dirname, '../models/llama/txt/');
  
  for (const [index, company] of companies.entries()) {
    try {
      const prompt = `Analyze synergy between these company descriptions. Choose ONE category:
      1. Product/Service Fit 2. Geographic Expansion 3. Supply Chain Control 
      4. Cost Savings 5. Tech/IP
      Client: "${clientDescription}"
      Target: "${company.description}"
      Respond ONLY with JSON: { "synergy": "Category", "reason": "..." }`;

      console.log(`[${index + 1}/${companies.length}] Analyzing: ${company.name}`);


      console.log('Raw LLama Response:', text); // Log raw response

      const cleanText = text.replace(/```json|```/g, '').trim();
      let analysis;
      try {
        analysis = JSON.parse(cleanText);
      } catch (e) {
        console.error('Failed to parse Llama response:', cleanText);
        analysis = { synergy: 'Parse Error', reason: 'Invalid AI response format' };
      }

      // Add the analysis to the company object
      analyzed.push({
        ...company,
        synergy: analysis.synergy,
        reason: analysis.reason
      });

    } catch (error) {
      console.error(`Error analyzing ${company.name}:`, error.message);
      analyzed.push({
        ...company,
        synergy: 'Error',
        reason: 'Analysis failed. Check logs for details.'
      });
    }
  }
  
  const files = fs.readdirSync(modelDirectory);
  
  const randomFile = files[Math.floor(Math.random() * files.length)];
  const filePath = path.join(modelDirectory, randomFile);
  
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  
  // Simulate processing based on the content of the file
  return fileContent.slice(0, 200); // Return a portion of the content as a response
}



const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function analyzeCompaniesWithAI(companies, clientDescription) {
  
  
  const {spawn} = require('child_process');
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  const analyzed = [];
  

  spawn('start cmd /k echo LLaMA Log Window Started', { shell: true });


  // Loop through all companies and analyze them
  for (const [index, company] of companies.entries()) {
    const prompt = `Analyze synergy between these company descriptions. Less jargon, maximum of 2 sentences, keep things very simple. Choose ONE category:
    1. Product/Service Fit 2. Geographic Expansion 3. Supply Chain Control 
    4. Cost Savings 5. Tech/IP  6. None if there is no synergy alignment.
    Client: "${clientDescription}"
    Target: "${company.description}"
    Respond ONLY with JSON: { "synergy": "Category", "reason": "..." }`;

    console.log(`[${index + 1}/${companies.length}] Analyzing: ${company.name}`);

    try {
      const result = await model.generateContent(prompt);
      const text = (await result.response).text();

      console.log('Raw Llama Response:', text); // Log raw response

      // Clean the response text and parse as JSON
      const cleanText = text.replace(/```json|```/g, '').trim();
      let analysis;
      try {
        analysis = JSON.parse(cleanText);
      } catch (e) {
        console.error('Failed to parse Llama response:', cleanText);
        analysis = { synergy: 'Parse Error', reason: 'Invalid AI response format' };
      }
      console.log(`[LLaMA ${index + 1}] ${company.name}: ${analysis.synergy}`);



      // Add the analysis to the company object
      analyzed.push({
        ...company,
        synergy: analysis.synergy,
        reason: analysis.reason
      });
    } catch (error) {
      console.error(`Error analyzing ${company.name}:`, error.message);
      analyzed.push({
        ...company,
        synergy: 'Error',
        reason: 'Analysis failed. Check logs for details.'
      });
    }

    if ((index + 1) % 15 === 0) {
      console.log('Rate limit reached, waiting for 60 seconds...');
      await delay(60000);  // Wait for 60 seconds to avoid rate limit issues
    }
  }

  return analyzed;
}


module.exports = { analyzeCompaniesWithAI };