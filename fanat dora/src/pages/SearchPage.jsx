import '../styles/Universities.css';
import { useState } from 'react';
import UniversitiesList from "../components/UniversitiesList";
import { universities } from "../data/universities";

const SearchPage = ({ onAddFavorite }) => {
  const [query, setQuery] = useState('');
  const [countryFilter, setCountryFilter] = useState('');
  const [programFilter, setProgramFilter] = useState('');
  const [minRank, setMinRank] = useState('');
  const [maxRank, setMaxRank] = useState('');

  const filteredUniversities = universities.filter((uni) => {
    const matchesQuery = uni.name.toLowerCase().includes(query.toLowerCase()) ||
                         uni.city.toLowerCase().includes(query.toLowerCase());
    const matchesCountry = countryFilter === '' || uni.country === countryFilter;
    const matchesProgram = programFilter === '' || uni.programs.some(prog => prog.toLowerCase().includes(programFilter.toLowerCase()));
    const matchesRank = (!minRank || Number(uni.ranking) >= Number(minRank)) && (!maxRank || Number(uni.ranking) <= Number(maxRank));

    return matchesQuery && matchesCountry && matchesProgram && matchesRank;
  });

  const countries = [...new Set(universities.map(uni => uni.country))];
  const programs = [...new Set(universities.flatMap(uni => uni.programs))];

  return (
    <div className="unis-container">
      <h1 className="unis-header">Поиск университетов</h1>
      <div className="filter-bar">
        <input
          type="text"
          placeholder="🔍 Поиск по названию или городу..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select
          value={countryFilter}
          onChange={(e) => setCountryFilter(e.target.value)}
        >
          <option value="">Все страны</option>
          {countries.map(country => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>
        <select
          value={programFilter}
          onChange={(e) => setProgramFilter(e.target.value)}
        >
          <option value="">Все программы</option>
          {programs.map(program => (
            <option key={program} value={program}>{program}</option>
          ))}
        </select>

        <input
          type="number"
          placeholder="min rank"
          value={minRank}
          onChange={(e) => setMinRank(e.target.value)}
        />
        <input
          type="number"
          placeholder="max rank"
          value={maxRank}
          onChange={(e) => setMaxRank(e.target.value)}
        />
      </div>
      <UniversitiesList universities={filteredUniversities} onAddFavorite={onAddFavorite} />
    </div>
  );
};

export default SearchPage; 