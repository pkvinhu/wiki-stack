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

const seedPage = {
	title: 'Authenticity',
	content: 'Seitan health goth cred sriracha hoodie selfies jianbing portland gastropub. Blue bottle sustainable PBR&B cray, beard plaid wayfarers XOXO neutra heirloom roof party photo booth fam. Cornhole sustainable meditation, tattooed vice normcore stumptown coloring book freegan cardigan readymade letterpress. Humblebrag locavore readymade fashion axe mumblecore af kitsch tbh.'
}

const seedUser = {
	name: 'Brooklyn Baddy',
	email: 'bkbaddy@fairtrade.com'
}

const init = async() => {
	await db.sync({ force: true })
	const page = await Page.create(seedPage);
    const user = await User.create(seedUser);
    page.setAuthor(user);
	app.listen(PORT, () => {
		console.log(`Server is listening on port ${PORT}!`);
	});
}

init();


app.get('/', (req, res, next) => {
	res.redirect('/wiki');
})

// app.listen(process.env.PORT || 3000);