import expres from 'express'
import {adminLogin,getUser,deleteUser,searchAdminUser,editUser,registerUser,getUserForEdit, logoutAdmin} from '../controllers/adminController.js'


const adminRoute=expres.Router()    

adminRoute.post('/adminLogin',adminLogin)
adminRoute.post('/createUser',registerUser)
adminRoute.get('/userTable',getUser)
adminRoute.delete('/deleteUser/:id',deleteUser)
adminRoute.get('/searchUser/:id',searchAdminUser)
adminRoute.get('/editUser/:id',getUserForEdit)
adminRoute.put('/editUser/:id',editUser)
adminRoute.post('/logout',logoutAdmin)


export default adminRoute

