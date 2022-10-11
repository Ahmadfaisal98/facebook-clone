import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import debounce from 'lodash.debounce';

import useClickOutside from '../../hooks/useClickOutside';
import {
  useAddSearchHistoryMutation,
  useDeleteSearchHistoryMutation,
  useGetSearchHistoryQuery,
  useSearchUserMutation,
} from '../../services/userApi';
import { Return, Search } from '../../svg';

export default function SearchMenu({ color, setShowSearchMenu }) {
  const [iconVisible, setIconVisible] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const [addSearchHistory] = useAddSearchHistoryMutation();
  const [searchUser, { data: dataSearchUser }] = useSearchUserMutation();
  const { data: dataSearchHistory, isSuccess } = useGetSearchHistoryQuery();
  const [deleteSearch] = useDeleteSearchHistoryMutation();

  const searchHistory = isSuccess ? [...dataSearchHistory] : [];

  console.log(searchHistory);

  const menu = useRef(null);
  const input = useRef(null);

  useClickOutside(menu, () => {
    setShowSearchMenu(false);
  });

  useEffect(() => {
    input.current.focus();
  }, []);

  const debouncedChangeHandler = useMemo(
    () => debounce(() => searchTerm && searchUser(searchTerm), 300),
    [searchUser, searchTerm]
  );

  useEffect(() => {
    return () => {
      debouncedChangeHandler.cancel();
    };
  }, [debouncedChangeHandler]);

  return (
    <div className='header_left search_area scrollbar' ref={menu}>
      <div className='search_wrap'>
        <div className='header_logo'>
          <div
            className='circle hover1'
            onClick={() => setShowSearchMenu(false)}
          >
            <Return color={color} />
          </div>
        </div>
        <div
          className='search'
          onClick={() => {
            input.current.focus();
          }}
        >
          {iconVisible && (
            <div>
              <Search color={color} />
            </div>
          )}
          <input
            type='text'
            placeholder='Search Facebook'
            ref={input}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyUp={debouncedChangeHandler}
            onFocus={() => {
              setIconVisible(false);
            }}
            onBlur={() => {
              setIconVisible(true);
            }}
          />
        </div>
      </div>
      <div className='search_history_header'>
        <span>Recent searches</span>
        <a>Edit</a>
      </div>
      <div className='search_history scrollbar'>
        {searchHistory &&
          searchTerm === '' &&
          searchHistory
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((user) => (
              <div className='search_user_item hover1' key={user?._id}>
                <Link
                  className='flex'
                  to={`/profile/${user?.user?.username}`}
                  onClick={() => {
                    addSearchHistory({ searchUser: user?.user?._id });
                    setShowSearchMenu(false);
                  }}
                >
                  <img src={user?.user?.picture} alt='' />
                  <span>
                    {user?.user?.first_name} {user?.user?.last_name}
                  </span>
                </Link>
                <i
                  className='exit_icon'
                  onClick={() => {
                    console.log('first');
                    deleteSearch({ searchUser: user?.user?._id });
                  }}
                ></i>
              </div>
            ))}
      </div>
      <div className='search_results scrollbar'>
        {dataSearchUser?.map((user) => (
          <Link
            to={`/profile/${user.username}`}
            className='search_user_item hover1'
            onClick={() => {
              addSearchHistory({ searchUser: user._id });
              setShowSearchMenu(false);
            }}
            key={user.username}
          >
            <img src={user.picture} alt='' />
            <span>
              {user.first_name} {user.last_name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
