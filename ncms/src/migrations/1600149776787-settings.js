const { Settings } = require('./../models/settings.modal');

/**
 * Make any changes you need to make to the database here
 */
async function up () {
  // Write migration here
  await this('settings').create({
    name: 'Your Hospital Name ',
    title: 'Hospital name sub title',
    email: 'example@gmail.com',
    hotline: '42424345',
    logo: 'logo.png',
    address: 'dhaka, Bangladesh.',
  });
}

/**
 * Make any changes that UNDO the up function side effects here (if possible)
 */
async function down () {
  // Write migration here
}

module.exports = { up, down };
