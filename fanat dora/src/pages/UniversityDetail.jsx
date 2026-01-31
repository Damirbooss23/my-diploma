import '../styles/Universities.css';
import { useEffect, useState } from 'react';
import { getUniversity, deleteUniversity } from '../services/api';

const UniversityDetail = ({ id, onEdit, onBack }) => {
  const [uni, setUni] = useState(null);

  useEffect(() => {
    if (!id) return;
    getUniversity(id).then(setUni).catch(console.error);
  }, [id]);

  if (!uni) return <div className="detail-container">Загрузка...</div>;

  return (
    <div className="detail-container">
      <div className="detail-card">
        <button className="btn btn-secondary" onClick={() => onBack && onBack()}>Назад</button>
        <h2 style={{ marginTop: 10 }}>{uni.name}</h2>
        <p className="uni-meta">📍 {uni.city}, {uni.country}</p>
        <p className="uni-meta">🌍 Ranking: {uni.ranking}</p>
        <p className="uni-meta">🎓 {uni.programs && uni.programs.join(', ')}</p>
        {uni.foundation && <p className="uni-meta">✅ Foundation available</p>}
        <div style={{ marginTop: 10 }} className="uni-actions">
          <button className="btn btn-primary" onClick={() => onEdit && onEdit(uni.id)}>Изменить</button>
          <button className="btn btn-danger" onClick={async () => {
            if (!confirm('Удалить университет?')) return;
            try {
              await deleteUniversity(uni.id);
              if (onBack) onBack();
            } catch (err) {
              alert('Ошибка удаления: ' + (err.message || err));
            }
          }}>Удалить</button>
        </div>
      </div>
    </div>
  );
};

export default UniversityDetail; 
