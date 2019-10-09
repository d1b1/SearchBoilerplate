const fetch = require('node-fetch').default;
const _ = require('underscore')
const algolia = require('./services/algolia');
const takeshape = require('./services/takeshape')

// Setup the index.
const index = client.initIndex('cheese');

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

module.export = (req, res) => {

	takeshape(query).then(res => {

		var items = res.data.getCheeseList.items
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
				console.log('Indexed', data);
				var count = data.objectIDs.length;

				res.status(200).send({ message: `Rebuild all takeshape data to the index ${count}` })
			})
			.catch(err => {
				console.log('Got an Eror', err);
				res.status(500).send({ message: err.message })
			});

	}).catch(err => {
		res.status(500).send({ message: err.message })
	})



}
