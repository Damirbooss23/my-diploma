import { universities } from "../data/universities";

const UniversitiesList = ({ universities: unis = universities, onAddFavorite }) => {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Universities</h2>

      {unis.map((uni) => (
        <div
          key={uni.id}
          style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "15px",
            marginBottom: "12px"
          }}
        >
          <h3>{uni.name}</h3>

          <p>
            📍 {uni.city}, {uni.country}
          </p>

          <p>🌍 World Ranking: {uni.ranking}</p>

          <p>🎓 Programs: {uni.programs.join(", ")}</p>

          {uni.foundation && <p>✅ Foundation available</p>}

          {onAddFavorite && (
            <button 
              onClick={() => onAddFavorite(uni.name)} 
              style={{ padding: '5px 10px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              Добавить в избранное
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default UniversitiesList;