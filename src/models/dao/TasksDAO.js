class TasksDAO {
  constructor (dbClient) {
    this.db = dbClient
    this.getAll = this.getAll.bind(this)
    this.getById = this.getById.bind(this)
    this.create = this.create.bind(this)
    this.update = this.update.bind(this)
    this.delete = this.delete.bind(this)
  }

  async getAll () {
    const response = await this.db.query('SELECT id, content FROM tasks')
    return response[0]
  }

  async getById (id) {
    const response = await this.db.query('SELECT id, content FROM tasks WHERE id = ?', [id])
    const rows = response[0]
    return rows
  }

  async create (task) {
    const response = await this.db.query('INSERT INTO tasks (content) VALUES (?)', [task.content])
    const result = response[0]
    return result.insertId
  }

  async update (task) {
    const response = await this.db.query('UPDATE tasks SET content = ? WHERE id = ?', [task.content, task.id])
    const result = response[0]
    return result
  }

  async delete (id) {
    const response = await this.db.query('DELETE FROM tasks WHERE id = ?', [id])
    const result = response[0]
    return result
  }
}

module.exports = TasksDAO
