const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack');

const slugify = (title) => {
  return title.replace(/\s+/g, '_').replace(/\W/g, '');
}

const Page = db.define('pages', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM('open', 'closed'),
    defaultValue: null
  }
});

Page.beforeValidate((instance, options) => {
  const slugTitle = slugify(instance.title);
  instance.slug = slugTitle;
})

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
    	isEmail: true
    }
  }
});

module.exports = {
	db,
  Page,
  User
}