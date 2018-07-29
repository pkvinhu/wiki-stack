const express = require('express');
const morgan = require('morgan');
const app = express();
const routes = require('./routes');


const { db, Page, User } = require('./models');


app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({extended: false}));


app.use('/wiki', routes.wiki);
app.use('/user', routes.user);

const PORT = process.env.PORT || 3000

const init = async() => {
	await db.sync({ force: true })
	app.listen(PORT, () => {
		console.log(`Server is listening on port ${PORT}!`);
	});
}

init();


app.get('/', (req, res, next) => {
	res.redirect('/wiki');
})

// app.listen(process.env.PORT || 3000);