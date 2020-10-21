import express from 'express';
import { 
    createStudent, 
    getStudent,
    updateStudent,
    deleteStudent,
    getStudentsByCollege
 } from './src/controllers/students.js';
 import {
    createRecruiter,
    getRecruiter,
    updateRecruiter,
    deleteRecruiter,
    getRecruitersByCompany
 } from './src/controllers/recruiters.js';
import {
    createCollegeAdmin,
    getCollegeAdmin,
    updateCollegeAdmin,
    deleteCollegeAdmin
} from './src/controllers/collegeAdmins.js';

const router = express.Router()

/* Students Collection CRUD */
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

/* Recruiters Collection CRUD */
// get recruiters by Id
router.get('/recruiters', getRecruiter)
// get all the recruiters by college Id 
router.get('/recruiters/company', getRecruitersByCompany)
// create a new recruiter
router.post('/recruiters', createRecruiter)
// update an existing recruiter 
router.put('/recruiters', updateRecruiter)
// delete an existing recruiter
router.delete('/recruiters', deleteRecruiter)

/* College Admins Collection CRUD */
// get college admins by Id
router.get('/college-admins', getCollegeAdmin)
// create a new college admin
router.post('/college-admins', createCollegeAdmin)
// update an existing college admin 
router.put('/college-admins', updateCollegeAdmin)
// delete an existing college admin
router.delete('/college-admins', deleteCollegeAdmin)

export default router