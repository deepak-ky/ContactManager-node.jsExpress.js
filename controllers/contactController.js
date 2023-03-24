const asyncHandler = require('express-async-handler')
const Contact = require('../models/contactModel')

const getAllContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({user_id: req.user.id})
  res.status(200).json(contacts)
})

const createNewContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body
  if (!name || !email || !phone) {
    res.status(400)
    throw new Error('Name , Email and Phone are mandatory')
  } else {
    //1. Method 1
    // const newContact = new Contact(req.body);
    // const savedContact = newContact.save();

    //2. Method 2
    const newContact = await Contact.create({
      user_id: req.user.id,
      name,
      email,
      phone,
    })
    res.status(200).json(newContact)
  }
})

const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id)
  if (!contact) {
    res.status(404)
    throw new Error('Contact Does not Exist')
  }

  if(contact.user_id.toString() !== req.user.id){
    res.status(403)
    throw new Error("Do not have access to this contact")
  }
  res.status(200).json(contact)
})

const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id)
  if (!contact) {
    res.status(404)
    throw new Error('Contact Does not Exist')
  }

  if(contact.user_id.toString() !== req.user.id){
    res.status(403)
    throw new Error("Do not have access to this contact")
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true },
  )

  res.status(200).json(updatedContact)
})

const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id)
  if (!contact) {
    res.status(404)
    throw new Error('Contact Does not Exist')
  }

  if(contact.user_id.toString() !== req.user.id){
    res.status(403)
    throw new Error("Do not have access to this contact")
  }

  await Contact.deleteOne({_id: req.params.id})
  res.status(200).json('Contact has been deleted.')
})

module.exports = {
  getAllContacts,
  createNewContact,
  getContact,
  updateContact,
  deleteContact,
}
