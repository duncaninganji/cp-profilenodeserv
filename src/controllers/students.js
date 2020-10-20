import Firestore from '@google-cloud/firestore';
import { studentsCollectionId } from '../constants.js';

// create a new client
const firestore = new Firestore();

export async function createStudent(req, res) {
  if (!req.body) {
    console.log("Request object missing body")
    return res.status(404).send("Request object missing body")
  }

  const studentObj = req.body
  const studentId = studentObj.email 
  
  firestore
    .collection(studentsCollectionId)
    .doc(studentId)
    .set(studentObj)
    .then(() => {  
      console.log(`Student with id ${studentId} created`)
      return res.status(200).send(`New Student with id ${studentId} added`)
    })
    .catch(error => {
      console.error(error)
      res.status(404).send('Error creating student')
    });
}

export async function getStudent(req, res) {
  if (!req.query) {
    console.log("Request object missing id query")
    return res.status(404).send("Request object missing id query")
  }

  const studentId = req.query.id || ''

  firestore
    .collection(studentsCollectionId)
    .doc(studentId)
    .get()
    .then(student => {
      const studentObj = student.data()
      if (studentObj && studentObj.active) {
        console.log(`Student with ${studentId} found\n`, student.data())
        return res.status(200).json(student.data())
      }

      console.log(`Student with id ${studentId} does not exist`)
      return res.status(404).send(`Student with id ${studentId} does not exist`)
    })
    .catch(error => {
      console.error(error)
      res.status(404).send("Error fetching student")
    })
}

export async function getStudentsByCollege(req, res) {
  return res.status(200).json({})
}

export async function updateStudent(req, res) {
  if (!req.query) {
    console.log("Request object missing id query")
    return res.status(404).send("Request object missing id query")
  }

  if (!req.body) {
    console.log("Request object missing body")
    return res.status(404).send("Request object missing body")
  }

  const studentId = req.query.id || ''

  firestore
    .collection(studentsCollectionId)
    .doc(studentId)
    .update(req.body)
    .then(() => {  
      console.log(`Student with id ${studentId} updated`)
      return res.status(200).send(`Student with id ${studentId} updated`)
    })
    .catch(error => {
      console.error(error)
      res.status(404).send('Error updating student')
    });
}

export async function deleteStudent(req, res) {
  if (!req.query) {
    console.log("Request object missing id query")
    return res.status(404).send("Request object missing id query")
  }

  const studentId = req.query.id || ''

  firestore
    .collection(studentsCollectionId)
    .doc(studentId)
    .update({
      active: false
    })
    .then(() => {
      console.log(`Student with ${studentId} deleted\n`)
      return res.status(200).send(`Student with ${studentId} deleted\n`)
    })
    .catch(error => {
      console.error(error)
      res.status(404).send("Error deleting student")
    })
}
