exports.handler = async function (event) {
  const API_KEY = process.env.API_FOOTBALL_KEY;
  const API_HOST = 'v3.football.api-sports.io';
  
  const endpoint = event.queryStringParameters.endpoint;
  delete event.queryStringParameters.endpoint;
  const query = new URLSearchParams(event.queryStringParameters).toString();

  const url = `https://${API_HOST}/${endpoint}?${query}`;

  try {
    const response = await fetch(url, {
      headers: {
        'x-rapidapi-host': API_HOST,
        'x-rapidapi-key': API_KEY,
      },
    });

    const data = await response.json();

    return {
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify(data),
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Failed to fetch data' }) };
  }
};
