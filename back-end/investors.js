const axios = require('axios');

// Function to fetch investors based on client criteria
async function getInvestors(clientCriteria) {
    const tracxnApiKey = ''; // Updated API token (removed for security reasons)
    const filter = buildTracxnFilter(clientCriteria); // Build filter dynamically
    const size = 20; // Number of results per API call
    let from = 0; // Pagination offset
    let allInvestors = []; // Array to store all results

    try {
        while (true) {
            // Make API request to Tracxn
            const response = await axios.post(
                'ng a', // Updated endpoint
                { filter, from, size }, // Payload
                {
                    headers: {
                        accessToken: tracxnApiKey,
                        'Content-Type': 'application/json',
                    },
                }
            );

            const investors = response.data.result || [];
            allInvestors.push(...investors); // Append results

            if (investors.length < size) break; // Stop if fewer results than `size`

            from += size; // Increment pagination offset
        }

        console.log('Fetched Investors:', allInvestors); 
        return allInvestors;
    } catch (error) {
        console.error('Error fetching investors:', error.response?.data || error.message);
        throw error; 
    }
}

function buildTracxnFilter(clientCriteria) {
    const filter = {};

    // Filter by funding stage
    if (clientCriteria.stage) {
        filter.transactionFundingRoundCategory = [clientCriteria.stage];
    }

    if (clientCriteria.ticketSize) {
        const minTicket = clientCriteria.ticketSize - 500000;
        const maxTicket = clientCriteria.ticketSize + 500000;
        filter.transactionFundingRoundAmount = { min: minTicket, max: maxTicket };
    }

    // Filter by investor country
    if (clientCriteria.location) {
        filter.investorCountry = [clientCriteria.location];
    }

    // Optional: Filter by investment score
    if (clientCriteria.minInvestmentScore || clientCriteria.maxInvestmentScore) {
        filter.tracxnInvestmentScore = {
            min: clientCriteria.minInvestmentScore || 0,
            max: clientCriteria.maxInvestmentScore || 100,
        };
    }

    // Additional Filters
    if (clientCriteria.investorType) {
        filter.investorType = [clientCriteria.investorType];
    }
    if (clientCriteria.investorFeedName) {
        filter.investorFeedName = [clientCriteria.investorFeedName];
    }
    if (clientCriteria.investorCity) {
        filter.investorCity = [clientCriteria.investorCity];
    }
    if (clientCriteria.investorState) {
        filter.investorState = [clientCriteria.investorState];
    }

    console.log('Generated Filter:', filter); // Debugging
    return filter;
}

// Function to fetch competitors for a client domain
async function getCompetitors(clientDomain) {
    const tracxnApiKey = ''; // Updated API token (removed for security reasons)

    try {
        console.log('Fetching competitors for domain:', clientDomain);

        const filter = { competitorOf: [clientDomain] }; // Filter object
        const response = await axios.post(
            'https://platform.tracxn.com/api/2.2/companies', // Competitors endpoint
            { filter },
            {
                headers: {
                    accessToken: tracxnApiKey,
                    'Content-Type': 'application/json',
                },
            }
        );

        console.log('Competitors API Response:', response.data);
        return response.data.result || [];
    } catch (error) {
        console.error('Error fetching competitors:', error.response?.data || error.message);
        throw error;
    }
}

// Function to fetch competitor-related investors
async function getCompetitorInvestors(competitorDomains) {
    const tracxnApiKey = ''; // Updated API token (removed for security reasons)
    const size = 20; // Results per page
    let from = 0; // Pagination offset
    let allInvestors = []; // Array to store results

    try {
        while (true) {
            const response = await axios.post(
                'https://platform.tracxn.com/api/2.2/investors', // Investors endpoint
                {
                    filter: { domain: competitorDomains }, // Filter by competitor domains
                    from,
                    size,
                },
                {
                    headers: {
                        accessToken: tracxnApiKey,
                        'Content-Type': 'application/json',
                    },
                }
            );

            const investors = response.data.result || [];
            allInvestors.push(...investors); // Append results

            if (investors.length < size) break; 
            from += size; 
        }

        console.log('Fetched Competitor Investors:', allInvestors);
        return allInvestors;
    } catch (error) {
        console.error('Error fetching competitor investors:', error.response?.data || error.message);
        throw error;
    }
}

module.exports = { getInvestors, getCompetitors, getCompetitorInvestors };
