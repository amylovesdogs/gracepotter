const db = require('APP/db');

const products = 
[
  {
  	name: 'Nimbus 2000', 
	  description: 'blah', 
	  price: 349.99, 
	  quantity: 100, 
	  photoURL: 'http://vignette4.wikia.nocookie.net/harrypotter/images/0/0f/Nimbus_2000_1.jpg/revision/latest?cb=20150530185551',
	  category: 'Broomsticks'
	},
  {
  	name: 'Pencil', 
	  description: 'It\s a pencil', 
	  price: 0.99, 
	  quantity: 999, 
	  photoURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Number-2-pencil.jpg/2560px-Number-2-pencil.jpg',
	  category: 'Muggle Stuff'
	}
]

const setProductCategory = (product_id, category_id) => {
	return db.model('product_categories').create({
		product_id,
		category_id
	});
}

const seedProducts = () => 
db.Promise.map(products, (product, index) => {
	return db.model('products')
	.create(product)
	.then(product => {
		return db.model('categories').find({
			where: {
				name: products[index].category
			}
		})
		.then(category => {
			return setProductCategory(product.id, category.id);
		})
	});
});

module.exports = seedProducts;