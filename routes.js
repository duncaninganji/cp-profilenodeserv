import express from 'express';
import { 
    createStudent, 
    getStudent,
    updateStudent,
    deleteStudent,
    getStudentsByCollege
 } from './src/controllers/students.js';

const router = express.Router()

// get students by Id
router.get('/students', getStudent)
// get all the students by college Id 
router.get('/students/college', getStudentsByCollege)
// create a new student
router.post('/students', createStudent)
// update an existing student 
router.put('/students', updateStudent)
// delete an existing student
router.delete('/students', deleteStudent)

export default router