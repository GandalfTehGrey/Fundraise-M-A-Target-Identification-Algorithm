// synergyLogic.js

// Define a function to analyze the synergy based on keywords matching
function analyzeSynergy(description, synergyDictionary) {
    const analyzedSynergy = {};
  
    // Loop through each synergy category and check for keyword matches
    for (const [synergy, keywords] of Object.entries(synergyDictionary)) {
      const matches = keywords.filter(keyword => description.toLowerCase().includes(keyword.toLowerCase()));
  
      if (matches.length > 0) {
        analyzedSynergy[synergy] = matches;
      }
    }
  
    return analyzedSynergy;
  }
  
  // Function to handle the synergy analysis of multiple companies
  function analyzeMultipleCompanies(companies, synergyDictionary) {
    return companies.map((company) => {
      const synergyAnalysis = analyzeSynergy(company.description, synergyDictionary);
      return {
        companyName: company.name,
        synergyAnalysis: synergyAnalysis,
        totalSynergies: Object.keys(synergyAnalysis).length,
      };
    });
  }
  
  // Function to display synergy analysis result
  function displaySynergyAnalysis(result) {
    const resultsContainer = document.getElementById("synergyResults");
    resultsContainer.innerHTML = ""; // Clear existing results
  
    result.forEach((companyResult) => {
      const companyDiv = document.createElement("div");
      companyDiv.classList.add("company-result");
  
      const companyName = document.createElement("h3");
      companyName.textContent = companyResult.companyName;
      companyDiv.appendChild(companyName);
  
      const synergyList = document.createElement("ul");
  
      Object.entries(companyResult.synergyAnalysis).forEach(([synergyCategory, keywords]) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${synergyCategory}: ${keywords.join(", ")}`;
        synergyList.appendChild(listItem);
      });
  
      companyDiv.appendChild(synergyList);
  
      const totalSynergies = document.createElement("p");
      totalSynergies.textContent = `Total Synergies Identified: ${companyResult.totalSynergies}`;
      companyDiv.appendChild(totalSynergies);
  
      resultsContainer.appendChild(companyDiv);
    });
  }
  
  // Function to handle form submission and synergy analysis
  function handleAnalyzeFormSubmit(event, synergyDictionary) {
    event.preventDefault();
  
    const companyDescriptions = [
      { name: "Company A", description: "Leading technology company with a wide product portfolio" },
      { name: "Company B", description: "A firm specializing in geographic expansion and international trade" },
      { name: "Company C", description: "A logistics provider with strong supply chain control and inventory management" },
      // Add more mock company descriptions here as needed
    ];
  
    const analysisResults = analyzeMultipleCompanies(companyDescriptions, synergyDictionary);
    displaySynergyAnalysis(analysisResults);
  }
  
  // Function to initialize and add event listener for form submission
  function initializeSynergyForm(synergyDictionary) {
    const form = document.getElementById("synergyForm");
  
    if (form) {
      form.addEventListener("submit", (event) => handleAnalyzeFormSubmit(event, synergyDictionary));
    } else {
      console.error("Form element not found");
    }
  }
  
  // Function to dynamically generate and display synergy categories and keywords
  function generateSynergyCategories(synergyDictionary) {
    const categoriesContainer = document.getElementById("synergyCategories");
    categoriesContainer.innerHTML = ""; // Clear existing categories
  
    Object.entries(synergyDictionary).forEach(([synergy, keywords]) => {
      const categoryDiv = document.createElement("div");
      categoryDiv.classList.add("category");
  
      const categoryTitle = document.createElement("h4");
      categoryTitle.textContent = synergy;
      categoryDiv.appendChild(categoryTitle);
  
      const keywordList = document.createElement("ul");
      keywords.forEach((keyword) => {
        const listItem = document.createElement("li");
        listItem.textContent = keyword;
        keywordList.appendChild(listItem);
      });
  
      categoryDiv.appendChild(keywordList);
      categoriesContainer.appendChild(categoryDiv);
    });
  }
  
  // Function to initialize the synergy logic and render categories
  function initializeSynergyLogic(synergyDictionary) {
    // Initialize the synergy categories view
    generateSynergyCategories(synergyDictionary);
  
    // Set up the form for analysis
    initializeSynergyForm(synergyDictionary);
  }
  
  // Export functions if required (e.g., for module use in Node.js, etc.)
  export { initializeSynergyLogic, analyzeSynergy, analyzeMultipleCompanies, displaySynergyAnalysis };
