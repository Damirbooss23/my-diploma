import '../styles/Universities.css';
import { universities } from "../data/universities";

const UniversitiesList = ({ universities: unis = universities, onAddFavorite }) => {
  return (
    <div className="unis-container">
      <h2 className="unis-header">Universities</h2>

      <div className="unis-list">
        {unis.map((uni) => (
          <div key={uni.id} className="uni-card">
            <h3>{uni.name}</h3>

            <p className="uni-meta">📍 {uni.city}, {uni.country}</p>

            <p className="uni-meta">🌍 World Ranking: {uni.ranking}</p>

            <p className="uni-meta">🎓 {uni.programs && uni.programs.join(", ")}</p>

            {uni.foundation && <p className="uni-meta">✅ Foundation available</p>}

            {onAddFavorite && (
              <div className="uni-actions">
                <button className="btn btn-fav" onClick={() => onAddFavorite(uni.name)}>Добавить в избранное</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UniversitiesList; 