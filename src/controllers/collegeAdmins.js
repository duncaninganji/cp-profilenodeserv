import Firestore from '@google-cloud/firestore';
import { collegeAdminsCollectionId } from '../constants.js'

// create a new client
const firestore = new Firestore();

export async function createCollegeAdmin(req, res) {
  if (!req.body) {
    console.log("Request object missing body")
    return res.status(404).send("Request object missing body")
  }

  const collegeAdminObj = req.body
  const collegeAdminId = collegeAdminObj.email 
  
  firestore
    .collection(collegeAdminsCollectionId)
    .doc(collegeAdminId)
    .set(collegeAdminObj)
    .then(() => {  
      console.log(`collegeAdmin with id ${collegeAdminId} created`)
      return res.status(200).send(`New collegeAdmin with id ${collegeAdminId} added`)
    })
    .catch(error => {
      console.error(error)
      res.status(404).send('Error creating collegeAdmin')
    });
}

export async function getCollegeAdmin(req, res) {
  if (!req.query) {
    console.log("Request object missing id query")
    return res.status(404).send("Request object missing id query")
  }

  const collegeAdminId = req.query.id || ''

  firestore
    .collection(collegeAdminCollectionId)
    .doc(collegeAdminId)
    .get()
    .then(collegeAdmin => {
      const collegeAdminObj = collegeAdmin.data()
      if (collegeAdminObj && collegeAdminObj.active) {
        console.log(`collegeAdmin with ${collegeAdminId} found\n`, collegeAdmin.data())
        return res.status(200).json(collegeAdmin.data())
      }

      console.log(`collegeAdmin with id ${collegeAdminId} does not exist`)
      return res.status(404).send(`collegeAdmin with id ${collegeAdminId} does not exist`)
    })
    .catch(error => {
      console.error(error)
      res.status(404).send("Error fetching collegeAdmin")
    })
}

export async function updateCollegeAdmin(req, res) {
  if (!req.query) {
    console.log("Request object missing id query")
    return res.status(404).send("Request object missing id query")
  }

  if (!req.body) {
    console.log("Request object missing body")
    return res.status(404).send("Request object missing body")
  }

  const collegeAdminId = req.query.id || ''

  firestore
    .collection(collegeAdminCollectionId)
    .doc(collegeAdminId)
    .update(req.body)
    .then(() => {  
      console.log(`collegeAdmin with id ${collegeAdminId} updated`)
      return res.status(200).send(`collegeAdmin with id ${collegeAdminId} updated`)
    })
    .catch(error => {
      console.error(error)
      res.status(404).send('Error updating collegeAdmin')
    });
}

export async function deleteCollegeAdmin(req, res) {
  if (!req.query) {
    console.log("Request object missing id query")
    return res.status(404).send("Request object missing id query")
  }

  const collegeAdminId = req.query.id || ''

  firestore
    .collection(collegeAdminCollectionId)
    .doc(collegeAdminId)
    .update({
      active: false
    })
    .then(() => {
      console.log(`collegeAdmin with ${collegeAdminId} deleted\n`)
      return res.status(200).send(`collegeAdmin with ${collegeAdminId} deleted\n`)
    })
    .catch(error => {
      console.error(error)
      res.status(404).send("Error deleting collegeAdmin")
    })
}