import React from 'react'
import '../styles/Universities.css';

export default function Navbar({ currentPage, setCurrentPage, user, handleLogout }) {
  return (
    <header className="navbar">
      <h1 className="brand">UNIMATE</h1>
      <nav>
        {!user && (
          <>
            <button 
              onClick={() => setCurrentPage('register')}
              className={currentPage === 'register' ? 'active' : ''}
            >
              Регистрация
            </button>
            <button 
              onClick={() => setCurrentPage('login')}
              className={currentPage === 'login' ? 'active' : ''}
            >
              Войти
            </button>
          </>
        )}
      </nav>
      {user && (
        <div className="user-info">
          <nav className="user-nav">
            <button 
              onClick={() => setCurrentPage('home')}
              className={currentPage === 'home' ? 'active' : ''}
            >
              Главная
            </button>
            <button 
              onClick={() => setCurrentPage('favorites')}
              className={`fav-btn ${currentPage === 'favorites' ? 'active' : ''}`}
            >
              Избранное
            </button>
            <button 
              onClick={() => setCurrentPage('results')}
              className={currentPage === 'results' ? 'active' : ''}
            >
              Результаты
            </button>
          </nav>
          <span className="greeting">Привет, {user.name}!</span>
          <button onClick={handleLogout} className="logout-btn">Выход</button>
        </div>
      )}
    </header>
  )
}