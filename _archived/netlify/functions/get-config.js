// Netlify Function : obtenir les infos de configuration sécurisées
// Utile pour les futures features qui auraient besoin de clés côté client

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    };
  }

  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  try {
    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({
        vapidPublicKey: process.env.VAPID_PUBLIC_KEY || null,
        // JAMAIS retourner la clé privée ou API keys sensibles !
        features: {
          pushNotifications: !!process.env.VAPID_PUBLIC_KEY,
          coachAI: !!process.env.PERPLEXITY_API_KEY
        }
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
