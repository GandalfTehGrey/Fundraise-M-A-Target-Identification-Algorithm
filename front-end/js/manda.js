document.addEventListener("DOMContentLoaded", () => {
  const mandaForm = document.getElementById("mandaForm");
  const resultsDiv = document.getElementById("results");
  const exportBtn = document.getElementById("exportExcel");
  let currentResults = [];

  if (mandaForm) {
    mandaForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const industry = document.getElementById("industryInput").value;
      const geography = document.getElementById("geographyInput").value;
      const clientDescription = document.getElementById("clientDescriptionInput").value;
      const mode = mandaForm.dataset.mode;

      // Show loading state
      const submitButton = mandaForm.querySelector('button');
      submitButton.disabled = true;
      submitButton.querySelector('.button-text').style.display = 'none';
      submitButton.querySelector('.button-loader').style.display = 'flex';

      try {
        const response = await axios.post(`/api/${mode}-targets`, { 
          industry, 
          geography,
          clientDescription 
        });

        currentResults = response.data.targets || [];

        // Render company cards
        resultsDiv.innerHTML = currentResults
          .map((target, index) => `
            <div class="company-card" style="animation-delay: ${index * 20}ms">
              <div class="company-header">
                ${target.website !== 'Not Available' ? 
                  `<a href="${target.website}" target="_blank" class="company-link">
                    <h3>${target.name}</h3>
                    <i class="fas fa-external-link-alt"></i>
                  </a>` : 
                  `<h3>${target.name}</h3>`
                }
              </div>
              <div class="company-tags">
                <div class="company-tag tier1-tag">
                  <i class="fas fa-filter"></i> Tier 1 Match
                </div>
                <div class="company-tag">${target.location}</div>
                ${target.synergy ? `
                  <div class="company-tag synergy-tag ${target.synergy.toLowerCase().replace(/ /g, '-')}">
                    ${target.synergy}
                  </div>
                ` : ''}
              </div>
              <div class="description-container">
                <button class="toggle-description">
                  <i class="fas fa-chevron-down"></i> Business Summary
                </button>
                <div class="company-description">${target.description}</div>
              </div>
              ${target.reason ? `
                <div class="synergy-container">
                  <button class="toggle-synergy">
                    <i class="fas fa-chevron-down"></i> Synergy Explanation
                  </button>
                  <div class="synergy-reason">${target.reason}</div>
                </div>
              ` : ''}
            </div>
          `).join("");

        // Add toggle functionality for descriptions
        document.querySelectorAll('.toggle-description').forEach(button => {
          button.addEventListener('click', (e) => {
            const description = e.currentTarget.nextElementSibling;
            description.classList.toggle('show');
            e.currentTarget.querySelector('i').classList.toggle('fa-chevron-up');
          });
        });

        // Add toggle functionality for synergy explanations
        document.querySelectorAll('.toggle-synergy').forEach(button => {
          button.addEventListener('click', (e) => {
            const reason = e.currentTarget.nextElementSibling;
            reason.classList.toggle('show');
            e.currentTarget.querySelector('i').classList.toggle('fa-chevron-up');
          });
        });

        // Show export button
        exportBtn.style.display = 'inline-flex';
        
        // Update counters
        document.querySelectorAll('.current-count').forEach(el => el.textContent = currentResults.length);
        document.querySelectorAll('.total-count').forEach(el => el.textContent = currentResults.length);

      } catch (error) {
        console.error("Error:", error);
        resultsDiv.innerHTML = '<div class="error-message">Error fetching results. Please try again later.</div>';
      } finally {
        // Reset button state
        submitButton.disabled = false;
        submitButton.querySelector('.button-text').style.display = 'block';
        submitButton.querySelector('.button-loader').style.display = 'none';
      }
    });
  }

  // Excel Export with Synergy Data
  exportBtn.addEventListener('click', () => {
    const worksheet = XLSX.utils.json_to_sheet(currentResults.map(item => ({
      'Company Name': item.name,
      'Business Description': item.description,
      'Synergy Category': item.synergy || 'N/A',
      'Synergy Reason': item.reason || 'N/A',
      'Website': item.website,
      'Location': item.location,
      'Match Tier': 'Tier 1'
    })));
    
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Acquisition Targets");
    XLSX.writeFile(workbook, `Acquisition_Targets_${new Date().toISOString().slice(0,10)}.xlsx`);
  });
});