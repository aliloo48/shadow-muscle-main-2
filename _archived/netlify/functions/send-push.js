// Netlify Function : envoyer une notification push
// Installation: npm install web-push

const webpush = require('web-push');

// Configurer les clés VAPID (à générer avec web-push)
// Commande: npx web-push generate-vapid-keys
webpush.setVapidDetails(
  process.env.VAPID_SUBJECT || 'mailto:example@example.com',
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

exports.handler = async (event) => {
  // Autoriser les requêtes OPTIONS (CORS)
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    };
  }

  // Vérifier la méthode
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const body = JSON.parse(event.body);
    const { subscriptions, title, body: notifBody } = body;

    if (!subscriptions || !Array.isArray(subscriptions)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'subscriptions array required' })
      };
    }

    if (!title || !notifBody) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'title and body required' })
      };
    }

    // Envoyer la notification à chaque abonnement
    const results = [];
    for (const subString of subscriptions) {
      try {
        const subscription = JSON.parse(subString);
        await webpush.sendNotification(
          subscription,
          JSON.stringify({ title, body: notifBody })
        );
        results.push({ success: true });
      } catch (error) {
        console.error('Push send error:', error.message);
        results.push({ success: false, error: error.message });
      }
    }

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: 'Notifications sent',
        results
      })
    };
  } catch (error) {
    console.error('Handler error:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ error: error.message })
    };
  }
};
