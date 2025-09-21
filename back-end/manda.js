const axios = require('axios');
const CRUNCHBASE_API_KEY = 'db6d2410400340ac17babeb8e37a30e0'; 

async function getCompaniesByIndustryAndGeography(industry, geography) {
  try {
    const response = await axios.post(
      'https://api.crunchbase.com/api/v4/searches/organizations',
      {
        field_ids: ['identifier', 'short_description', 'location_identifiers', 'website_url'],
        query: [
          {
            type: 'predicate',
            field_id: 'short_description',
            operator_id: 'contains',
            values: [industry],
          },
          {
            type: 'predicate',
            field_id: 'location_identifiers',
            operator_id: 'includes',
            values: [geography],
          }
        ],
        limit: 100
      },
      {
        headers: {
          'X-cb-user-key': CRUNCHBASE_API_KEY,
        },
      }
    );

    console.log('--- RAW CRUNCHBASE RESPONSE ---');
    console.log(JSON.stringify(response.data.entities[0], null, 2));
    console.log('-------------------------------')

    return response.data.entities.map(entity => {
      const description = entity.properties.short_description || 'N/A'; // Directly access the string
  console.log(`Company: ${entity.properties.identifier.value}, Description: ${description}`); // Debug log
  return {
    name: entity.properties.identifier.value,
    description: description,
    location: entity.properties.location_identifiers?.[0]?.value || 'N/A',
    website: entity.properties.website_url || 'Not Available'
  };
});
    
  } catch (error) {
    console.error('API Error:', error.response?.data || error.message);
    throw new Error('Failed to fetch companies');
  }
}

module.exports = {
  getAcquisitionTargets: getCompaniesByIndustryAndGeography,
  getMergerTargets: getCompaniesByIndustryAndGeography,
  getExitTargets: getCompaniesByIndustryAndGeography
};
async function getAcquisitionTargets(industry, geography) {
    try {
        console.log('Fetching acquisition targets...');
        const companies = await getCompaniesByIndustryAndGeography(industry, geography);
        console.log(entity.properties);

        return companies;
    } catch (error) {
        console.error('Error in getAcquisitionTargets:', error.message);
        throw error;
    }
}

async function getMergerTargets(industry, geography) {
    console.log('Running Merger Filters');
    const companies = await getCompaniesByIndustryAndGeography(industry, geography);
    // Add merger-specific filters here later
    return companies;
}

async function getExitTargets(industry, geography) {
    console.log('Running Exit Filters');
    const companies = await getCompaniesByIndustryAndGeography(industry, geography);
    // Add exit-specific filters here later
    return companies;
}

module.exports = {
  getAcquisitionTargets: getCompaniesByIndustryAndGeography,
  getMergerTargets: getCompaniesByIndustryAndGeography,
  getExitTargets: getCompaniesByIndustryAndGeography
};