import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import {
  ArrowDown,
  Friends,
  Gaming,
  HomeActive,
  Logo,
  Market,
  Menu,
  Messenger,
  Notifications,
  Search,
  Watch,
} from '../../svg';
import { useSelector } from 'react-redux';
import SearchMenu from './SearchMenu';
import AllMenu from './AllMenu';

import useClickOutside from '../../hooks/useClickOutside';
import './style.scss';

export default function Header() {
  const user = useSelector((state) => state.user);
  const [showSearchMenu, setShowSearchMenu] = useState(false);
  const [showAllMenu, setShowAllMenu] = useState(false);

  const allMenu = useRef(null);
  useClickOutside(allMenu, () => {
    setShowAllMenu(false);
  });

  const color = '#65676b';

  return (
    <header className='header'>
      <div className='header_left'>
        <Link to='/' className='header_logo'>
          <div className='circle'>
            <Logo />
          </div>
        </Link>
        <div
          className='search search1'
          onClick={() => {
            setShowSearchMenu(true);
          }}
        >
          <Search color={color} />
          <input
            type='text'
            placeholder='Search Facebook'
            className='hide_input'
          />
        </div>
      </div>
      {showSearchMenu && (
        <SearchMenu color={color} setShowSearchMenu={setShowSearchMenu} />
      )}
      <div className='header_middle'>
        <Link to='/' className='middle_icon active'>
          <HomeActive />
        </Link>
        <Link to='/' className='middle_icon hover1'>
          <Friends color={color} />
        </Link>
        <Link to='/' className='middle_icon hover1'>
          <Watch color={color} />
          <div className='middle_notification'>9+</div>
        </Link>
        <Link to='/' className='middle_icon hover1'>
          <Market color={color} />
        </Link>
        <Link to='/' className='middle_icon hover1'>
          <Gaming color={color} />
        </Link>
      </div>
      <div className='header_right'>
        <Link to='/profile' className='profile_link hover1'>
          <img src={user?.picture} alt='profile' />
          <span>{user?.first_name}</span>
        </Link>
        <div
          className='circle_icon hover1'
          ref={allMenu}
          onClick={() => {
            setShowAllMenu((prev) => !prev);
          }}
        >
          <Menu />
          {showAllMenu && <AllMenu />}
        </div>
        <div className='circle_icon hover1'>
          <Messenger />
        </div>
        <div className='circle_icon hover1'>
          <Notifications />
          <div className='right_notification'>5</div>
        </div>
        <div className='circle_icon hover1'>
          <ArrowDown />
        </div>
      </div>
    </header>
  );
}