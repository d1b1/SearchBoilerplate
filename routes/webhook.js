const _ = require('underscore')
const algolia = require('../services/algolia');
const takeshape = require('../services/takeshape')

module.exports = function(req, res) {

	// Echo what is happening.
	var body = req.body
	console.log('Action', body.action, 'Body', body);

	// Set the index for the content type.
	const index = algolia.initIndex(body.data.contentTypeName);

	// If the action is to delete, then we do it now and stop the code.
	if (body.action === "content:delete") {
		index.deleteObject(body.data.contentId, () => {
			return res.status(200).send('Removed Index item')
		})
	}

	const query = ` {
		getCheese(_id: "${body.data.contentId}") {
			_id
			name
			source
			characteristics {
				milk
				texture
				style
			}
		}
	}`;

	takeshape.query(query).then(result => {

		var obj = json.data.getCheese;
		obj.objectID = obj._id

		index.addObject(obj, () => {
			console.log(`Indexed ${body.data.contentTypeName} id: ${body.data.contentId} `)
			res.status(200).send(`Handled a Webhook Request for ${body.data.contentTypeName} id: ${body.data.contentId}`)
		})
	})

}
