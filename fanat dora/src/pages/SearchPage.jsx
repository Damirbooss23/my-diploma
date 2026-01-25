import { useState } from 'react';
import UniversitiesList from "../components/UniversitiesList";
import { universities } from "../data/universities";

const SearchPage = ({ onAddFavorite }) => {
  const [query, setQuery] = useState('');
  const [countryFilter, setCountryFilter] = useState('');
  const [programFilter, setProgramFilter] = useState('');

  const filteredUniversities = universities.filter((uni) => {
    const matchesQuery = uni.name.toLowerCase().includes(query.toLowerCase()) ||
                         uni.city.toLowerCase().includes(query.toLowerCase());
    const matchesCountry = countryFilter === '' || uni.country === countryFilter;
    const matchesProgram = programFilter === '' || uni.programs.some(prog => prog.toLowerCase().includes(programFilter.toLowerCase()));

    return matchesQuery && matchesCountry && matchesProgram;
  });

  const countries = [...new Set(universities.map(uni => uni.country))];
  const programs = [...new Set(universities.flatMap(uni => uni.programs))];

  return (
    <div>
      <h1>Поиск университетов</h1>
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="🔍 Поиск по названию или городу..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ padding: '10px', width: '300px', marginRight: '10px' }}
        />
        <select
          value={countryFilter}
          onChange={(e) => setCountryFilter(e.target.value)}
          style={{ padding: '10px', marginRight: '10px' }}
        >
          <option value="">Все страны</option>
          {countries.map(country => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>
        <select
          value={programFilter}
          onChange={(e) => setProgramFilter(e.target.value)}
          style={{ padding: '10px' }}
        >
          <option value="">Все программы</option>
          {programs.map(program => (
            <option key={program} value={program}>{program}</option>
          ))}
        </select>
      </div>
      <UniversitiesList universities={filteredUniversities} onAddFavorite={onAddFavorite} />
    </div>
  );
};

export default SearchPage;