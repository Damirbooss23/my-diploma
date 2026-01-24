import { useState, useEffect } from 'react'
import '../styles/ChoosedPage.css'
import { getChoosed, removeFromChoosed } from '../services/choosed'

export default function ChoosedPage() {
  const [choosedItems, setChoosedItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchChoosed = async () => {
      try {
        const data = await getChoosed()
        setChoosedItems(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchChoosed()
  }, [])

  const handleRemove = async (product) => {
    try {
      await removeFromChoosed(product)
      setChoosedItems(choosedItems.filter(item => item.id !== product.id))
    } catch (err) {
      setError(err.message)
    }
  }

  if (loading) return <div className="loading">Загрузка...</div>
  if (error) return <div className="error">Ошибка: {error}</div>

  return (
    <div className="choosed-page">
      <h2>Выбранные товары</h2>
      <div className="choosed-list">
        {choosedItems.length === 0 ? (
          <p>Нет выбранных товаров</p>
        ) : (
          choosedItems.map(item => (
            <div key={item.id} className="choosed-card">
              <h3>{item.name}</h3>
              <p>Количество: {item.quantity}</p>
              <button onClick={() => handleRemove(item)}>Удалить</button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}