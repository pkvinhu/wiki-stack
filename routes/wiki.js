const express = require('express');
const router = express.Router();
const { addPage, editPage, main, userList, userPages, wikiPage } = require('../views');
const { Page } = require('../models');

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
      await page.save();

      res.redirect(`/wiki/${page.slug}`);
    } 
    catch (error) { next(error) }
})

router.get('/add', (req, res, next) => {
  res.send(addPage());
})

router.get('/:slug', async (req, res, next) => {
  try { 
  	const page = await Page.findOne({
  	where: {slug: req.params.slug}
  });
  res.send(wikiPage(page));

  }
  catch (error) {
  	next(error);
  }
});