import { useState, useEffect, useCallback } from 'react'
import './App.css'
import RegisterPage from './components.jsx/RegisterPage'
import Navbar from './components.jsx/Navbar'
import ResultsPage from './components.jsx/ResultsPage'
import { loginUser, getFavorites, addToFavorites } from './services/api'

function App() {
  const [currentPage, setCurrentPage] = useState('register')
  const [user, setUser] = useState(null)
  const [favorites, setFavorites] = useState([])

  const loadFavorites = useCallback(async () => {
    try {
      const favs = await getFavorites()
      setFavorites(favs)
    } catch (error) {
      console.error('Failed to load favorites:', error)
    }
  }, [])

  const handleAddFavorite = async (item) => {
    try {
      await addToFavorites({ userId: user.id, item })
      loadFavorites() // reload favorites
    } catch (error) {
      alert('Ошибка добавления в избранное: ' + error.message)
    }
  }

  useEffect(() => {
    if (user) {
      loadFavorites()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  const handleRegister = (userData) => {
    setUser(userData)
    setCurrentPage('home')
  }

  const handleLogout = () => {
    setUser(null)
    setCurrentPage('register')
    localStorage.removeItem('token')
  }

  const handleLogin = (userData) => {
    setUser(userData)
    setCurrentPage('home')
  }

  return (
    <div className="app-container">
      <Navbar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        user={user} 
        handleLogout={handleLogout} 
      />

      <main className="app-main">
        {currentPage === 'register' && (
          <RegisterPage onRegister={handleRegister} />
        )}
        {currentPage === 'login' && (
          <div className="login-page">
            <h2>Вход</h2>
            <form onSubmit={async (e) => {
              e.preventDefault();
              const email = e.target.email.value;
              const password = e.target.password.value;
              try {
                const data = await loginUser({ email, password });
                localStorage.setItem('token', data.accessToken);
                handleLogin({ name: email.split('@')[0], email }); // simple name from email
              } catch (error) {
                alert('Ошибка входа: ' + error.message);
              }
            }}>
              <input name="email" type="email" placeholder="Email" required />
              <input name="password" type="password" placeholder="Пароль" required />
              <button type="submit">Войти</button>
            </form>
          </div>
        )}
        {currentPage === 'home' && user && (
          <div className="home-page">
            <h2>Добро пожаловать, {user.name}!</h2>
            <button onClick={() => setCurrentPage('favorites')}>Избранное</button>
            <button onClick={() => setCurrentPage('results')}>Результаты</button>
            <button onClick={() => handleAddFavorite('Новый элемент')}>Добавить в избранное</button>
          </div>
        )}
        {currentPage === 'results' && user && (
          <ResultsPage />
        )}
        {currentPage === 'favorites' && user && (
          <div className="favorites-page">
            <h2>Избранное</h2>
            <ul>
              {favorites.map((fav, index) => (
                <li key={index}>{fav.item}</li>
              ))}
            </ul>
            <button onClick={() => setCurrentPage('home')}>Назад</button>
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>&copy; 2025 UNIMATE. Все права защищены.</p>
      </footer>
    </div>
  )
}

export default App
