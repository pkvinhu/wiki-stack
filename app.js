const express = require('express');
const morgan = require('morgan');
const app = express();
const routes = require('./routes');

const { db, Page, User } = require('./models');


db.authenticate().
then(() => {
	console.log('connected to the database');
})
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({extended: false}));


app.use('/wiki', routes.wiki);
app.use('/user', routes.user);

const init = async() => {
	await models.db.sync({ force: true })
	server.listen(PORT, () => {
		console.log(`Server is listening on port ${PORT}!`);
	});
}


app.get('/', (req, res, next) => {
	res.redirect('/wiki');
})

app.listen(process.env.PORT || 3000);