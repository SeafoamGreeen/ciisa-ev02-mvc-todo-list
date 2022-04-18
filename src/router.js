const express = require('express')
const PageController = require('./controllers/PageController')
const TaskController = require('./controllers/TaskController')
const SqlClient = require('./lib/SqlClient')

const router = express.Router()

// Database
const sqlClient = new SqlClient()

// Controllers
const pageController = new PageController()
const taskController = new TaskController(sqlClient)

// Routes
router.get('/', taskController.renderHomeWithTasks)
router.post('/', taskController.insertAndRenderTask)
router.get('/edit/:id', taskController.renderTaskUpdate)
router.post('/edit/:id/makechanges', taskController.insertAndRenderUpdate)
router.post('/delete/:id', taskController.deleteTask)

router.get('*', pageController.renderNotFound)

module.exports = router
