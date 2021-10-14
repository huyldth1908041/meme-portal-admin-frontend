import styled from 'styled-components';
import { useState } from 'react';


const SearchBox = styled.div`
  position: relative;
  height: 40px;
  background-color: #fff;
  display: flex;
  align-items: center;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  border-radius: 15px;
  overflow: hidden;
`;
const SearchInput = styled.input`
  font-family: Roboto, sans-serif;
  height: 100%;
  width: 100%;
  padding: 10px 60px 10px 20px;
  font-size: 1rem;
  border-radius: 15px;
  color: #111;
  background-color: #fff;
  border: none;
  outline: none;

  &:focus {
    border: 1px solid #d68102;
  }
`;
const SearchIcon = styled.i`
  font-size: 1.5rem;
  position: absolute;
  right: 20px;
  cursor: pointer;
`;

const SearchBar = ({ placeholderText, onSearch }) => {
  const [query, setQuery] = useState('');
  const handleSubmit = e => {
    e.preventDefault();
    onSearch(query);
  };
  return (
    <form onSubmit={handleSubmit}>
      <SearchBox>
        <SearchInput type='text' placeholder={placeholderText} value={query}
                     onChange={(e) => setQuery(e.target.value)} />
        <SearchIcon className='mdi mdi-magnify' onClick={handleSubmit} />
      </SearchBox>
    </form>
  );
};

export default SearchBar;