import React, { SyntheticEvent, useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [search, setSearch] = useState('');
  const handleSearch = (event: SyntheticEvent) => {
    event.preventDefault();

    if (search !== '') {
      // TODO Implement search
    }
  };

  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light'>
      <div className='container-fluid'>
        <a className='navbar-brand' href='#home'>
          School Management System
        </a>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarSupportedContent'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
            <li className='nav-item'>
              <Link to='/' className='nav-link'>
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/teachers' className='nav-link'>
                Teachers
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/students' className='nav-link'>
                Students
              </Link>
            </li>
          </ul>
          <form className='d-flex'>
            <input
              className='form-control me-2'
              type='search'
              placeholder='Search'
              onChange={(event) => setSearch(event.target.value)}
            />
            <button
              className='btn btn-outline-secondary'
              type='submit'
              onClick={handleSearch}
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
