document.addEventListener("DOMContentLoaded", () => {
  const searchForm = document.getElementById("searchForm");
  const resultsDiv = document.getElementById("results");
  const competitorResultsDiv = document.getElementById("competitorResults");

  // Handle form submission to fetch investors
  searchForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    try {
      // Extract input values from the form
      const stage = document.getElementById("stageInput").value;
      const ticketSize = parseInt(document.getElementById("ticketSizeInput").value, 10);
      const location = document.getElementById("locationInput").value;
      const investorType = document.getElementById("investorTypeInput").value; // New field
      const investorFeedName = document.getElementById("investorFeedNameInput").value; // New field
      const clientDomain = document.getElementById("clientDomainInput").value;

      // Build the client criteria object
      const clientCriteria = { stage, ticketSize, location, investorType, investorFeedName };

      // Fetch investors based on client criteria
      const response = await axios.post("http://localhost:5001/api/investors", clientCriteria);
      const investors = response.data.investors || []; // Handle empty results gracefully

      console.log("Fetched Investors:", investors); // Debugging

      // Clear previous results
      resultsDiv.innerHTML = "";

      // If no investors are found, display a message
      if (investors.length === 0) {
        resultsDiv.textContent = "No investors found matching your criteria.";
      } else {
        // Dynamically create a table to display investor results
        const table = document.createElement("table");
        table.innerHTML = `
          <thead>
            <tr>
              <th>Investor Name</th>
              <th>Stage</th>
              <th>Ticket Size Range</th>
              <th>Country</th>
            </tr>
          </thead>
          <tbody></tbody>
        `;

        const tbody = table.querySelector("tbody");

        investors.forEach((investor) => {
          const row = tbody.insertRow();
          row.insertCell().textContent = investor.name || "N/A"; // Adjust key as per API response
          row.insertCell().textContent = investor.stage || "N/A"; // Adjust key as per API response
          row.insertCell().textContent = investor.ticketSize || "N/A"; // Adjust key as per API response
          row.insertCell().textContent = investor.country || "N/A"; // Adjust key as per API response
        });

        resultsDiv.appendChild(table);
      }

      // Fetch competitors and their investors if clientDomain is provided
      if (clientDomain) {
        await fetchCompetitors(clientDomain);
      }
    } catch (error) {
      console.error("Error fetching investors:", error.message);
      resultsDiv.textContent = "An error occurred while searching for investors.";
    }
  });

  // Fetch competitors based on client domain
  async function fetchCompetitors(clientDomain) {
    try {
      const response = await axios.post("http://localhost:5001/api/competitors", { clientDomain });
      const competitors = response.data.competitors || []; // Handle empty results gracefully
      console.log("Fetched Competitors:", competitors);

      // Extract competitor domains
      const competitorDomains = competitors.map((competitor) => competitor.domain);

      // If competitor domains are found, fetch their investors
      if (competitorDomains.length > 0) {
        await fetchCompetitorInvestors(competitorDomains);
      } else {
        competitorResultsDiv.textContent = "No competitors found for the provided domain.";
      }
    } catch (error) {
      console.error("Error fetching competitors:", error.message);
      competitorResultsDiv.textContent = "An error occurred while fetching competitors.";
    }
  }

  // Fetch competitor-related investors
  async function fetchCompetitorInvestors(competitorDomains) {
    try {
      const response = await axios.post(
        "http://localhost:5001/api/competitor-investors",
        { competitorDomains }
      );
      const competitorInvestors = response.data.competitorInvestors || [];
      console.log("Fetched Competitor Investors:", competitorInvestors);

      displayCompetitorInvestors(competitorInvestors);
    } catch (error) {
      console.error("Error fetching competitor investors:", error.message);
      competitorResultsDiv.textContent = "An error occurred while fetching competitor investors.";
    }
  }

  // Display competitor investors in a table
  function displayCompetitorInvestors(competitorInvestors) {
    competitorResultsDiv.innerHTML = ""; 
    if (competitorInvestors.length === 0) {
      competitorResultsDiv.textContent = "No competitor investors found.";
    } else {
      const table = document.createElement("table");
      table.innerHTML = `
        <thead>
          <tr>
            <th>Investor Name</th>
            <th>Company</th>
          </tr>
        </thead>
        <tbody></tbody>
      `;

      const tbody = table.querySelector("tbody");

      competitorInvestors.forEach((investor) => {
        const row = tbody.insertRow();
        row.insertCell().textContent = investor.name || "N/A"; 
        row.insertCell().textContent = investor.company || "N/A"; 
      });

      competitorResultsDiv.appendChild(table);
    }
  }
});
