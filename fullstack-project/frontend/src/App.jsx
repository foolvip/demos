import { useState, useEffect } from 'react'
import './App.scss'

function App() {
  // 任务管理状态
  const [tasks, setTasks] = useState([])
  const [loadingTasks, setLoadingTasks] = useState(true)
  const [newTask, setNewTask] = useState({ name: '', description: '' })
  const [editingTask, setEditingTask] = useState(null)
  
  // 技能管理状态
  const [skills, setSkills] = useState([])
  const [loadingSkills, setLoadingSkills] = useState(true)
  const [newSkill, setNewSkill] = useState({ name: '', description: '', proficiency: 'beginner' })
  const [editingSkill, setEditingSkill] = useState(null)
  
  // 通用状态
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState('tasks') // 'tasks' 或 'skills'

  // 获取所有任务
  const fetchTasks = async () => {
    setLoadingTasks(true)
    setError(null)
    try {
      const response = await fetch('/api/items')
      if (!response.ok) throw new Error('Failed to fetch tasks')
      const data = await response.json()
      if (data.success) {
        setTasks(data.items)
      }
    } catch (err) {
      setError(err.message)
      console.error('Error fetching tasks:', err)
    } finally {
      setLoadingTasks(false)
    }
  }

  // 添加任务
  const addTask = async (e) => {
    e.preventDefault()
    if (!newTask.name.trim()) return

    try {
      const response = await fetch('/api/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTask)
      })
      if (!response.ok) throw new Error('Failed to add task')
      await response.json()
      setNewTask({ name: '', description: '' })
      fetchTasks() // 重新获取任务列表
    } catch (err) {
      setError(err.message)
      console.error('Error adding task:', err)
    }
  }

  // 更新任务
  const updateTask = async (e) => {
    e.preventDefault()
    if (!editingTask || !editingTask.name.trim()) return

    try {
      const response = await fetch(`/api/items/${editingTask.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editingTask)
      })
      if (!response.ok) throw new Error('Failed to update task')
      await response.json()
      setEditingTask(null)
      fetchTasks() // 重新获取任务列表
    } catch (err) {
      setError(err.message)
      console.error('Error updating task:', err)
    }
  }

  // 删除任务
  const deleteTask = async (taskId) => {
    try {
      const response = await fetch(`/api/items/${taskId}`, {
        method: 'DELETE'
      })
      if (!response.ok) throw new Error('Failed to delete task')
      await response.json()
      fetchTasks() // 重新获取任务列表
    } catch (err) {
      setError(err.message)
      console.error('Error deleting task:', err)
    }
  }

  // 编辑任务
  const startEditTask = (task) => {
    setEditingTask({ ...task })
  }

  // 取消编辑任务
  const cancelEditTask = () => {
    setEditingTask(null)
  }
  
  // 获取所有技能
  const fetchSkills = async () => {
    setLoadingSkills(true)
    setError(null)
    try {
      const response = await fetch('/api/skills')
      if (!response.ok) throw new Error('Failed to fetch skills')
      const data = await response.json()
      if (data.success) {
        setSkills(data.skills)
      }
    } catch (err) {
      setError(err.message)
      console.error('Error fetching skills:', err)
    } finally {
      setLoadingSkills(false)
    }
  }
  
  // 添加技能
  const addSkill = async (e) => {
    e.preventDefault()
    if (!newSkill.name.trim()) return

    try {
      const response = await fetch('/api/skills', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newSkill)
      })
      if (!response.ok) throw new Error('Failed to add skill')
      await response.json()
      setNewSkill({ name: '', description: '', proficiency: 'beginner' })
      fetchSkills() // 重新获取技能列表
    } catch (err) {
      setError(err.message)
      console.error('Error adding skill:', err)
    }
  }
  
  // 更新技能
  const updateSkill = async (e) => {
    e.preventDefault()
    if (!editingSkill || !editingSkill.name.trim()) return

    try {
      const response = await fetch(`/api/skills/${editingSkill.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editingSkill)
      })
      if (!response.ok) throw new Error('Failed to update skill')
      await response.json()
      setEditingSkill(null)
      fetchSkills() // 重新获取技能列表
    } catch (err) {
      setError(err.message)
      console.error('Error updating skill:', err)
    }
  }
  
  // 删除技能
  const deleteSkill = async (skillId) => {
    try {
      const response = await fetch(`/api/skills/${skillId}`, {
        method: 'DELETE'
      })
      if (!response.ok) throw new Error('Failed to delete skill')
      await response.json()
      fetchSkills() // 重新获取技能列表
    } catch (err) {
      setError(err.message)
      console.error('Error deleting skill:', err)
    }
  }
  
  // 编辑技能
  const startEditSkill = (skill) => {
    setEditingSkill({ ...skill })
  }
  
  // 取消编辑技能
  const cancelEditSkill = () => {
    setEditingSkill(null)
  }

  // 初始化加载数据
  useEffect(() => {
    fetchTasks()
    fetchSkills()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <h1>任务管理系统</h1>
        <p>支持任务管理和技能管理</p>

        {error && (
          <div className="error-message">
            <p>错误: {error}</p>
            <button onClick={() => setError(null)}>关闭</button>
          </div>
        )}
        
        {/* 标签页切换 */}
        <div className="tabs">
          <button 
            className={`tab-btn ${activeTab === 'tasks' ? 'active' : ''}`}
            onClick={() => setActiveTab('tasks')}
          >
            任务管理
          </button>
          <button 
            className={`tab-btn ${activeTab === 'skills' ? 'active' : ''}`}
            onClick={() => setActiveTab('skills')}
          >
            技能管理
          </button>
        </div>

        {/* 任务管理标签页 */}
        {activeTab === 'tasks' && (
          <>
            {/* 添加/编辑任务表单 */}
            <div className="task-form">
              {editingTask ? (
                <form onSubmit={updateTask}>
                  <h2>编辑任务</h2>
                  <div className="form-group">
                    <label htmlFor="edit-task-name">任务名称:</label>
                    <input
                      id="edit-task-name"
                      type="text"
                      value={editingTask.name}
                      onChange={(e) => setEditingTask({ ...editingTask, name: e.target.value })}
                      placeholder="输入任务名称"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="edit-task-description">任务描述:</label>
                    <textarea
                      id="edit-task-description"
                      value={editingTask.description}
                      onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                      placeholder="输入任务描述"
                      rows="3"
                    />
                  </div>
                  <div className="form-actions">
                    <button type="submit" className="btn btn-primary">保存</button>
                    <button type="button" className="btn btn-secondary" onClick={cancelEditTask}>取消</button>
                  </div>
                </form>
              ) : (
                <form onSubmit={addTask}>
                  <h2>添加新任务</h2>
                  <div className="form-group">
                    <label htmlFor="new-task-name">任务名称:</label>
                    <input
                      id="new-task-name"
                      type="text"
                      value={newTask.name}
                      onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
                      placeholder="输入任务名称"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="new-task-description">任务描述:</label>
                    <textarea
                      id="new-task-description"
                      value={newTask.description}
                      onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                      placeholder="输入任务描述"
                      rows="3"
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">添加任务</button>
                </form>
              )}
            </div>

            {/* 任务列表 */}
            <div className="task-list">
              <h2>任务列表</h2>
              {loadingTasks ? (
                <p>加载任务中...</p>
              ) : tasks.length === 0 ? (
                <p>暂无任务，点击上方添加新任务</p>
              ) : (
                <ul>
                  {tasks.map((task) => (
                    <li key={task.id} className="task-item">
                      <div className="task-content">
                        <h3>{task.name}</h3>
                        {task.description && <p>{task.description}</p>}
                        <div className="task-meta">
                          <small>创建时间: {new Date(task.created_at).toLocaleString()}</small>
                          {task.updated_at && task.updated_at !== task.created_at && (
                            <small>更新时间: {new Date(task.updated_at).toLocaleString()}</small>
                          )}
                        </div>
                      </div>
                      <div className="task-actions">
                        <button className="btn btn-secondary" onClick={() => startEditTask(task)}>编辑</button>
                        <button className="btn btn-danger" onClick={() => deleteTask(task.id)}>删除</button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </>
        )}
        
        {/* 技能管理标签页 */}
        {activeTab === 'skills' && (
          <>
            {/* 添加/编辑技能表单 */}
            <div className="task-form">
              {editingSkill ? (
                <form onSubmit={updateSkill}>
                  <h2>编辑技能</h2>
                  <div className="form-group">
                    <label htmlFor="edit-skill-name">技能名称:</label>
                    <input
                      id="edit-skill-name"
                      type="text"
                      value={editingSkill.name}
                      onChange={(e) => setEditingSkill({ ...editingSkill, name: e.target.value })}
                      placeholder="输入技能名称"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="edit-skill-description">技能描述:</label>
                    <textarea
                      id="edit-skill-description"
                      value={editingSkill.description}
                      onChange={(e) => setEditingSkill({ ...editingSkill, description: e.target.value })}
                      placeholder="输入技能描述"
                      rows="3"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="edit-skill-proficiency">熟练程度:</label>
                    <select
                      id="edit-skill-proficiency"
                      value={editingSkill.proficiency}
                      onChange={(e) => setEditingSkill({ ...editingSkill, proficiency: e.target.value })}
                    >
                      <option value="beginner">初级</option>
                      <option value="intermediate">中级</option>
                      <option value="advanced">高级</option>
                      <option value="expert">专家</option>
                    </select>
                  </div>
                  <div className="form-actions">
                    <button type="submit" className="btn btn-primary">保存</button>
                    <button type="button" className="btn btn-secondary" onClick={cancelEditSkill}>取消</button>
                  </div>
                </form>
              ) : (
                <form onSubmit={addSkill}>
                  <h2>添加新技能</h2>
                  <div className="form-group">
                    <label htmlFor="new-skill-name">技能名称:</label>
                    <input
                      id="new-skill-name"
                      type="text"
                      value={newSkill.name}
                      onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                      placeholder="输入技能名称"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="new-skill-description">技能描述:</label>
                    <textarea
                      id="new-skill-description"
                      value={newSkill.description}
                      onChange={(e) => setNewSkill({ ...newSkill, description: e.target.value })}
                      placeholder="输入技能描述"
                      rows="3"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="new-skill-proficiency">熟练程度:</label>
                    <select
                      id="new-skill-proficiency"
                      value={newSkill.proficiency}
                      onChange={(e) => setNewSkill({ ...newSkill, proficiency: e.target.value })}
                    >
                      <option value="beginner">初级</option>
                      <option value="intermediate">中级</option>
                      <option value="advanced">高级</option>
                      <option value="expert">专家</option>
                    </select>
                  </div>
                  <button type="submit" className="btn btn-primary">添加技能</button>
                </form>
              )}
            </div>
            
            {/* 技能列表 */}
            <div className="task-list">
              <h2>技能列表</h2>
              {loadingSkills ? (
                <p>加载技能中...</p>
              ) : skills.length === 0 ? (
                <p>暂无技能，点击上方添加新技能</p>
              ) : (
                <ul>
                  {skills.map((skill) => (
                    <li key={skill.id} className="task-item">
                      <div className="task-content">
                        <h3>{skill.name}</h3>
                        {skill.description && <p>{skill.description}</p>}
                        <div className="task-meta">
                          <small>熟练程度: {skill.proficiency === 'beginner' ? '初级' : 
                                         skill.proficiency === 'intermediate' ? '中级' : 
                                         skill.proficiency === 'advanced' ? '高级' : '专家'}</small>
                          <small>创建时间: {new Date(skill.created_at).toLocaleString()}</small>
                          {skill.updated_at && skill.updated_at !== skill.created_at && (
                            <small>更新时间: {new Date(skill.updated_at).toLocaleString()}</small>
                          )}
                        </div>
                      </div>
                      <div className="task-actions">
                        <button className="btn btn-secondary" onClick={() => startEditSkill(skill)}>编辑</button>
                        <button className="btn btn-danger" onClick={() => deleteSkill(skill.id)}>删除</button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </>
        )}
      </header>
    </div>
  )
}

export default App