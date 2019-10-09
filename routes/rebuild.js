const fetch = require('node-fetch').default;
const _ = require('underscore')
const algolia = require('../services/algolia');
const takeshape = require('../services/takeshape')

// Setup the index.
const index = algolia.initIndex('cheese');

var query = `{
	 getCheeseList {
			items {
				_id
				name
				characteristics {
		      aged
		      covering
		      flavors
		      milk
		      rennetType
		      standardsAndProcessing
		      style
		      texture
		    }
		    description
			}
		}
	}
`

module.exports = (req, res) => {

	takeshape(query).then(result => {

		var items = result.data.getCheeseList.items
		var list = [];

		// Loop the fields and set the data as needed.
		_.each(items, item => {
			var object = item
			item.objectID = item._id;
			if (item.photo) item.photoUrl = 'https://images.takeshape.io/' + item.photo.path;
			list.push(item)
		})

		index
			.addObjects(list)
			.then((data) => {
				res.status(200).send(`Rebuild all takeshape data to the index ${data.objectIDs.length}`)
			})
			.catch(err => {
				console.log('Got an Eror', err);
				res.status(500).send(err.message)
			});

	}).catch(err => {
		res.status(500).send(err.message)
	})



}
