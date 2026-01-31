import { useState, useEffect, useCallback } from 'react'
import './App.css'
import RegisterPage from './components.jsx/RegisterPage'
import Navbar from './components.jsx/Navbar'
import ResultsPage from './components.jsx/ResultsPage'
import SearchPage from './pages/SearchPage'
import UniversityForm from './pages/UniversityForm'
import UniversityDetail from './pages/UniversityDetail'
import { loginUser, getFavorites, addToFavorites, deleteUniversity } from './services/api'

function App() {
  const [currentPage, setCurrentPage] = useState('register')
  const [user, setUser] = useState(null)
  const [favorites, setFavorites] = useState([])
  const [selectedUniId, setSelectedUniId] = useState(null)
  const [unisRefreshKey, setUnisRefreshKey] = useState(0)

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

  const openUniDetail = (id) => { setSelectedUniId(id); setCurrentPage('uni_detail'); };
  const openUniCreate = () => { setSelectedUniId(null); setCurrentPage('uni_create'); };
  const openUniEdit = (id) => { setSelectedUniId(id); setCurrentPage('uni_edit'); };
  const handleDeleteUniversity = async (id) => {
    try {
      if (!confirm('Удалить университет?')) return;
      await deleteUniversity(id);
      setUnisRefreshKey(k => k + 1);
      setCurrentPage('search');
    } catch (err) {
      alert('Ошибка удаления: ' + err.message);
    }
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
            <div className="search-bar">
              <input
                type="text"
                placeholder="🔍 Поиск университетов..."
                onClick={() => setCurrentPage('search')}
              />
            </div>
            <button className="fav-btn" onClick={() => setCurrentPage('favorites')}>Избранное</button>
            <button onClick={() => setCurrentPage('results')}>Результаты</button>
            <button onClick={() => handleAddFavorite('Новый элемент')}>Добавить в избранное</button>
            <button onClick={openUniCreate}>Добавить университет</button>
          </div>
        )}
        {currentPage === 'search' && user && (
          <SearchPage
            onAddFavorite={handleAddFavorite}
            onView={openUniDetail}
            onEdit={openUniEdit}
            onDelete={handleDeleteUniversity}
            refreshKey={unisRefreshKey}
          />
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

        {currentPage === 'uni_create' && user && (
          <UniversityForm mode="create" onDone={() => { setUnisRefreshKey(k => k+1); setCurrentPage('search'); }} />
        )}
        {currentPage === 'uni_edit' && user && (
          <UniversityForm mode="edit" id={selectedUniId} onDone={() => { setUnisRefreshKey(k => k+1); setCurrentPage('search'); }} />
        )}
        {currentPage === 'uni_detail' && user && (
          <UniversityDetail id={selectedUniId} onEdit={(id) => openUniEdit(id)} onBack={() => setCurrentPage('search')} />
        )}
      </main>

      <footer className="app-footer">
        <p>&copy; 2025 UNIMATE. Все права защищены.</p>
      </footer>
    </div>
  )
}

export default App
