import { useState, useEffect } from 'react'
import '../styles/ResultsPage.css'
import { getUsers } from '../services/api'

export default function ResultsPage() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers()
        setUsers(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  if (loading) return <div className="loading">Загрузка...</div>
  if (error) return <div className="error">Ошибка: {error}</div>

  return (
    <div className="results-page">
      <h2>Результаты</h2>
      <div className="users-list">
        {users.map(user => (
          <div key={user.id} className="user-card">
            <h3>{user.name}</h3>
            <p>Email: {user.email}</p>
            <p>Интересы: {user.interests?.join(', ') || 'Не указаны'}</p>
          </div>
        ))}
      </div>
    </div>
  )
}