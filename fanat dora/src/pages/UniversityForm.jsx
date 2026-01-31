import '../styles/Universities.css';
import { useState, useEffect } from 'react';
import { createUniversity, updateUniversity, getUniversity } from '../services/api';

const UniversityForm = ({ mode = 'create', id, onDone }) => {
  const [form, setForm] = useState({
    name: '', country: '', city: '', ranking: '', programs: '', foundation: false
  });

  useEffect(() => {
    if (mode === 'edit' && id) {
      getUniversity(id).then(data => {
        if (!data) return;
        setForm({
          ...data,
          programs: (data.programs || []).join(', '),
          ranking: data.ranking ?? ''
        });
      }).catch(console.error);
    }
  }, [mode, id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name: form.name,
      country: form.country,
      city: form.city,
      ranking: Number(form.ranking),
      programs: form.programs ? form.programs.split(',').map(s => s.trim()).filter(Boolean) : [],
      foundation: !!form.foundation
    };
    try {
      if (mode === 'create') await createUniversity(payload);
      else await updateUniversity(id, payload);
      if (onDone) onDone();
    } catch (err) {
      alert('Ошибка: ' + (err.message || err));
    }
  };

  return (
    <div className="form-container">
      <h2>{mode === 'create' ? 'Добавить университет' : 'Редактировать университет'}</h2>
      <form onSubmit={handleSubmit} className="uni-form">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Название" required />
        <input name="country" value={form.country} onChange={handleChange} placeholder="Страна" required />
        <input name="city" value={form.city} onChange={handleChange} placeholder="Город" required />
        <input name="ranking" value={form.ranking} onChange={handleChange} placeholder="World ranking (число)" type="number" required />
        <input name="programs" value={form.programs} onChange={handleChange} placeholder="Программы (через запятую)" />
        <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <input name="foundation" type="checkbox" checked={form.foundation} onChange={handleChange} /> Foundation available
        </label>
        <div className="form-actions">
          <button className="btn btn-primary" type="submit">Сохранить</button>
          <button className="btn btn-secondary" type="button" onClick={() => onDone && onDone()}>Отмена</button>
        </div>
      </form>
    </div>
  );
};

export default UniversityForm; 
