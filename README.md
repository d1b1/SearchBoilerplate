# Formaggio Webhooks
This repo provides a the node.js API code setting up Webhooks on Heroku. This codebased provides 
the webhook code to accept webhook events from Takeshape.io and populate data in Algolia. 

# FYI - Formagg.io is a cheese search engine.

Required
- Algolia Admin Key
- Algolia APP Id
- Takeshape Project Id
- Takeshape API Key

#### Endpoints
This creates two endpoints.

- Webhook = '/webhook' - Expects a Takeshape.io Webhook Post. Uses the content type and content ID to post to Algolia.
- Rebuild = '/rebuild?contentType=' - Does a full port/rebuild of data from a Takeshape.io content type to Agolia index.

#### Index Names
This code creates an index in Algolia using the Takeshape content Id.
