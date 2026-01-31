import react from "react";
import { universities } from "../data/universities";

const UniversitiesList = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Universities</h2>

      {universities.map((uni) => (
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
        </div>
      ))}
    </div>
  );
};

export default UniversitiesList;
