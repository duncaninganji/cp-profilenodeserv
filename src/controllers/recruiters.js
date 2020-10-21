import Firestore from '@google-cloud/firestore';
import { recruitersCollectionId } from '../constants.js'

// create a new client
const firestore = new Firestore();

export async function createRecruiter(req, res) {
  if (!req.body) {
    console.log("Request object missing body")
    return res.status(404).send("Request object missing body")
  }

  const recruiterObj = req.body
  const recruiterId = recruiterObj.email 
  
  firestore
    .collection(recruitersCollectionId)
    .doc(recruiterId)
    .set(recruiterObj)
    .then(() => {  
      console.log(`Recruiter with id ${recruiterId} created`)
      return res.status(200).send(`New recruiter with id ${recruiterId} added`)
    })
    .catch(error => {
      console.error(error)
      res.status(404).send('Error creating recruiter')
    });
}

export async function getRecruiter(req, res) {
  if (!req.query) {
    console.log("Request object missing id query")
    return res.status(404).send("Request object missing id query")
  }

  const recruiterId = req.query.id || ''

  firestore
    .collection(recruiterCollectionId)
    .doc(recruiterId)
    .get()
    .then(recruiter => {
      const recruiterObj = recruiter.data()
      if (recruiterObj && recruiterObj.active) {
        console.log(`recruiter with ${recruiterId} found\n`, recruiter.data())
        return res.status(200).json(recruiter.data())
      }

      console.log(`recruiter with id ${recruiterId} does not exist`)
      return res.status(404).send(`recruiter with id ${recruiterId} does not exist`)
    })
    .catch(error => {
      console.error(error)
      res.status(404).send("Error fetching recruiter")
    })
}

export async function getRecruitersByCompany(req, res) {
  return res.status(200).json({})
}

export async function updateRecruiter(req, res) {
  if (!req.query) {
    console.log("Request object missing id query")
    return res.status(404).send("Request object missing id query")
  }

  if (!req.body) {
    console.log("Request object missing body")
    return res.status(404).send("Request object missing body")
  }

  const recruiterId = req.query.id || ''

  firestore
    .collection(recruiterCollectionId)
    .doc(recruiterId)
    .update(req.body)
    .then(() => {  
      console.log(`recruiter with id ${recruiterId} updated`)
      return res.status(200).send(`recruiter with id ${recruiterId} updated`)
    })
    .catch(error => {
      console.error(error)
      res.status(404).send('Error updating recruiter')
    });
}

export async function deleteRecruiter(req, res) {
  if (!req.query) {
    console.log("Request object missing id query")
    return res.status(404).send("Request object missing id query")
  }

  const recruiterId = req.query.id || ''

  firestore
    .collection(recruiterCollectionId)
    .doc(recruiterId)
    .update({
      active: false
    })
    .then(() => {
      console.log(`recruiter with ${recruiterId} deleted\n`)
      return res.status(200).send(`recruiter with ${recruiterId} deleted\n`)
    })
    .catch(error => {
      console.error(error)
      res.status(404).send("Error deleting recruiter")
    })
}