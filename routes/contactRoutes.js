const express = require('express')
const router = express.Router()
const {
  getAllContacts,
  createNewContact,
  getContact,
  updateContact,
  deleteContact,
} = require('../controllers/contactController')
const validateToken = require('../middleware/validateTokenHandler')

router.use(validateToken)
router.get('/', getAllContacts)
router.post('/', createNewContact)
router.get('/:id', getContact)
router.put('/:id', updateContact)
router.delete('/:id', deleteContact)

module.exports = router
