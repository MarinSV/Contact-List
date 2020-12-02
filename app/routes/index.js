var express = require('express');
var router = express.Router();
var controllers =  require('../controllers');    
const contactController = controllers.contact;
const numberController = controllers.number;
const emailController = controllers.email;


// GET home page.
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
}); 

/* Contact Router */
router.get('/api/contact', contactController.list);
router.get('/api/contact/:id', contactController.getById);
router.post('/api/contact', contactController.add);
router.put('/api/contact/:id', contactController.update);
router.delete('/api/contact/:id', contactController.delete);

/* Number Router */
router.get('/api/number', numberController.list);
router.get('/api/number/:id', numberController.getById);
router.post('/api/number', numberController.add);
router.put('/api/number/:id', numberController.update);
router.delete('/api/number/:id', numberController.delete);

/* Email Router */
router.get('/api/email', emailController.list);
router.get('/api/email/:id', emailController.getById);
router.post('/api/email', emailController.add);
router.put('/api/email/:id', emailController.update);
router.delete('/api/email/:id', emailController.delete);

/* Advance Router */
router.post('/api/contact/add_full_contact', contactController.addFullContact);
router.post('/api/contact/add_with_numbers', contactController.addWithNumbers);
router.post('/api/contact/add_with_emails', contactController.addWithEmails);

module.exports = router;
//};