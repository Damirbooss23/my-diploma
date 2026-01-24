import { useState } from 'react'
import '../styles/RegisterPage.css'
import { registerUser } from '../services/api'

export default function RegisterPage({ onRegister }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    interests: []
  })

  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const interests = ['STEM', 'Гуманитарные науки', 'Искусство', 'Бизнес', 'Медицина']

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleInterestChange = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }))
  }

  const validateForm = () => {
    let newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Имя обязательно'
    }

    if (!formData.email.includes('@')) {
      newErrors.email = 'Некорректный email'
    }

    if (formData.password.length < 6) {
      newErrors.password = 'Пароль должен содержать минимум 6 символов'
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Пароли не совпадают'
    }

    if (formData.interests.length === 0) {
      newErrors.interests = 'Выберите минимум один интерес'
    }

    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const newErrors = validateForm()
    
    if (Object.keys(newErrors).length === 0) {
      try {
        const data = await registerUser({
          email: formData.email,
          password: formData.password,
          name: formData.name,
          interests: formData.interests
        })
        
        setSubmitted(true)
        onRegister({
          name: formData.name,
          email: formData.email,
          interests: formData.interests,
          ...data
        })
      } catch (error) {
        setErrors({ submit: error.message || 'Ошибка регистрации' })
      }
    } else {
      setErrors(newErrors)
    }
  }

  if (submitted) {
    return (
      <div className="register-page">
        <div className="success-message">
          <h2>✅ Регистрация успешна!</h2>
          <p>Добро пожаловать, {formData.name}!</p>
          <p>Теперь вы можете начать поиск идеального университета.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="register-page">
      <div className="register-container">
        <h2>Создать аккаунт</h2>
        <p className="register-subtitle">Присоединяйтесь к UNIMATE и найдите свой идеальный университет</p>

        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label htmlFor="name">Полное имя:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Иван Иванов"
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="ivan@example.com"
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Пароль:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Минимум 6 символов"
            />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Подтвердить пароль:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Повторите пароль"
            />
            {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
          </div>

          <div className="form-group">
            <label>Ваши интересы:</label>
            <div className="interests-group">
              {interests.map(interest => (
                <label key={interest} className="interest-label">
                  <input
                    type="checkbox"
                    checked={formData.interests.includes(interest)}
                    onChange={() => handleInterestChange(interest)}
                  />
                  {interest}
                </label>
              ))}
            </div>
            {errors.interests && <span className="error">{errors.interests}</span>}
          </div>

          <button type="submit" className="register-btn">Зарегистрироваться</button>
        </form>

        <p className="login-link">
          Уже есть аккаунт? <a href="#login">Войдите здесь</a>
        </p>
      </div>
    </div>
  )
}
