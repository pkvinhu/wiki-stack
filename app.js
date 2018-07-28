const express = require('express');
const morgan = require('morgan');
const app = express();
const { db, Page, User } = require('./models');


db.authenticate().
then(() => {
	console.log('connected to the database');
})
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({extended: false}));

const init = async() => {
	await models.db.sync({ force: true })
	server.listen(PORT, () => {
		console.log(`Server is listening on port ${PORT}!`);
	});
}


app.get('/', (req, res) => {
	res.send('hello world');
})

app.listen(process.env.PORT || 3000);