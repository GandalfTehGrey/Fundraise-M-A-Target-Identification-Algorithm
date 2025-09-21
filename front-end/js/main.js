// front-end/js/main.js
import axios from 'axios'; // Import axios from the local node_modules

document.addEventListener("DOMContentLoaded", () => {
  const mandaForm = document.getElementById("mandaForm");
  const resultsDiv = document.getElementById("results");

  if (mandaForm) {
    mandaForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const industry = document.getElementById("industryInput").value;
      const revenue = document.getElementById("revenueInput").value;
      const mode = mandaForm.dataset.mode; // Get mode (acquisition/merger/exit)

      try {
        const response = await axios.post(`/api/${mode}-targets`, {
          industry,
          revenue: parseFloat(revenue),
        });

        // Display results
        console.log("API Response:", response.data);
        resultsDiv.innerHTML = response.data.targets
          .map(target => `<div>${target.name} (Revenue: $${target.revenue}M)</div>`)
          .join("");
      } catch (error) {
        console.error("Error:", error);
        resultsDiv.textContent = "Failed to fetch targets.";
      }
    });
  }
});