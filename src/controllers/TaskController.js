const TasksDAO = require('../models/dao/TasksDAO')

class TaskController {
  constructor (db) {
    this.tasksDAO = new TasksDAO(db)
    this.renderHomeWithTasks = this.renderHomeWithTasks.bind(this)
    this.renderTaskUpdate = this.renderTaskUpdate.bind(this)
    this.insertAndRenderTask = this.insertAndRenderTask.bind(this)
    this.insertAndRenderUpdate = this.insertAndRenderUpdate.bind(this)
    this.deleteTask = this.deleteTask.bind(this)
  }

  async renderHomeWithTasks (req, res) {
    const tasks = await this.tasksDAO.getAll()
    res.render('home', {
      tasks
    })
  }

  async renderTaskUpdate (req, res) {
    const id = req.params.id
    try {
      const task = await this.tasksDAO.getById(id)

      if (!task[0]) {
        res.status(404).render('404')
        return
      }

      // task.content me regresaba como indefinido
      // a menos de que fuera escrito como task[0].content
      console.log('updating', task)
      console.log('updating', task.content)
      console.log('updating', task[0].content)

      res.render('update-task', {
        id,
        content: task[0].content
      })
    } catch (error) {
      console.log(error)
      res.status(500).render('500')
    }
  }

  async insertAndRenderTask (req, res) {
    const content = req.body.content
    try {
      const id = await this.tasksDAO.create({ content })
      console.log('checking data creation', { id })
      res.redirect('/')
    } catch (error) {
      console.log(error)
      res.status(500).render('500')
    }
  }

  async insertAndRenderUpdate (req, res) {
    const id = req.params.id
    const content = req.body.content
    try {
      const task = { content, id }
      await this.tasksDAO.update(task)
      console.log('checking data update', { task })
      res.redirect('/')
    } catch (error) {
      console.log(error)
      res.status(500).render('500')
    }
  }

  async deleteTask (req, res) {
    const id = req.params.id
    try {
      console.log('checking deletion', { id })
      await this.tasksDAO.delete(id)
      res.redirect('/')
    } catch (error) {
      console.log(error)
      res.status(500).render('500')
    }
  }
}

module.exports = TaskController
