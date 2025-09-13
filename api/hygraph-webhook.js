// Hygraph Webhook Handler for Vercel
// This function handles webhooks from Hygraph to trigger site rebuilds

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Verify webhook signature if needed
    const webhookSecret = process.env.HYGRAPH_WEBHOOK_SECRET;
    if (webhookSecret && req.headers['x-hygraph-signature']) {
      // Add signature verification logic here
      // This is a simplified version - implement proper signature verification
    }

    // Parse the webhook payload
    const payload = req.body;
    
    // Log the webhook event
    console.log('Hygraph webhook received:', {
      event: payload.event,
      model: payload.model,
      id: payload.id,
      timestamp: new Date().toISOString()
    });

    // Trigger a new deployment
    // For Vercel, you can use the Deploy Hooks API
    const deployHookUrl = process.env.VERCEL_DEPLOY_HOOK_URL;
    
    if (deployHookUrl) {
      const deployResponse = await fetch(deployHookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          event: payload.event,
          model: payload.model,
          id: payload.id
        })
      });

      if (deployResponse.ok) {
        console.log('Deployment triggered successfully');
      } else {
        console.error('Failed to trigger deployment:', deployResponse.statusText);
      }
    }

    // Return success response
    res.status(200).json({ 
      success: true, 
      message: 'Webhook processed successfully',
      event: payload.event,
      model: payload.model
    });

  } catch (error) {
    console.error('Webhook processing error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
}
