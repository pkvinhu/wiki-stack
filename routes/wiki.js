const express = require('express');
const router = express.Router();
const { addPage, editPage, main, userList, userPages, wikiPage } = require('../views');
const { Page, User } = require('../models');

module.exports = router;

router.get('/', async (req, res, next) => {
  try {
  	const home = await Page.findAll();
  	res.send(main(home));
  }
  catch (error) {
  	next(error);
  }
})

router.post('/', async (req, res, next) => {

	const page = new Page({
	  title: req.body.title,
	  content: req.body.content,
	  status: req.body.status
	})

    try {
      const [user, wasCreated] = await User.findOrCreate(
		{where: {
			name: req.body.name,
			email: req.body.email
		  }});
      const page = await Page.create(req.body);
      page.setAuthor(user);
      res.redirect(`/wiki/${page.slug}`);
    } 
    catch (error) { next(error) }
})

router.get('/add', (req, res, next) => {
  res.send(addPage());
})

router.get('/:slug', (req, res, next) => {
  // try { 
  	Page.findOne({where: {slug: req.params.slug}})
  	  .then(page => {page.getAuthor()
  	  	.then(author => res.send(wikiPage(page, author)))
  	  		.catch(res.send)})
  	  		  .catch(res.send);

  
  	
  // }
  // catch (error) {
  // 	next(error);
  // }
});