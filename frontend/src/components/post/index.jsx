import { useState } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

import { Dots, Public } from '../../svg';
import ReactsPopup from './ReactsPopup';
import CreateComment from './CreateComment';
import './style.scss';
import PostMenu from './PostMenu';
import {
  useGetReactQuery,
  useReactPostMutation,
} from '../../services/reactApi';
import Comment from './Comment';

export default function Post({ post, user, profile }) {
  const [visible, setVisible] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [count, setCount] = useState(1);

  const { data: react } = useGetReactQuery(post._id);
  const [reactPost] = useReactPostMutation();

  const comments = [...post.comments];

  return (
    <div className='post' style={{ width: `${profile ? '100%' : ''}` }}>
      <div className='post_header'>
        <Link
          to={`/profile/${post.user.username}`}
          className='post_header_left'
        >
          <img src={post.user.picture} alt='' />
          <div className='header_col'>
            <div className='post_profile_name'>
              {post.user.first_name} {post.user.last_name}
              <div className='updated_p'>
                {post.type === 'profilePicture' &&
                  `updated ${
                    post.user.gender === 'male' ? 'his' : 'her'
                  } profile picture`}
                {post.type === 'cover' &&
                  `updated ${
                    post.user.gender === 'male' ? 'his' : 'her'
                  } cover picture`}
              </div>
            </div>
            <div className='post_profile_privacy_date'>
              <Moment fromNow interval={30}>
                {post.createdAt}
              </Moment>
              . <Public color='#828387' />
            </div>
          </div>
        </Link>
        <div
          className='post_header_right hover1'
          onClick={() => setShowMenu((prev) => !prev)}
        >
          <Dots color='#828387' />
        </div>
      </div>
      {post.background ? (
        <div
          className='post_bg'
          style={{ backgroundImage: `url(${post.background})` }}
        >
          <div className='post_bg_text'>{post.text}</div>
        </div>
      ) : post.type === null ? (
        <>
          <div className='post_text'>{post.text}</div>
          {post.images?.length > 0 && (
            <div
              className={
                post.images.length === 1
                  ? 'grid_1'
                  : post.images.length === 2
                  ? 'grid_2'
                  : post.images.length === 3
                  ? 'grid_3'
                  : post.images.length === 4
                  ? 'grid_4'
                  : post.images.length >= 5 && 'grid_5'
              }
            >
              {post.images.slice(0, 5).map((image, i) => (
                <img src={image.url} key={i} alt='' className={`img-${i}`} />
              ))}
              {post.images.length > 5 && (
                <div className='more-pics-shadow'>
                  +{post.images.length - 5}
                </div>
              )}
            </div>
          )}
        </>
      ) : post.type === 'profilePicture' ? (
        <div className='post_profile_wrap'>
          <div className='post_updated_bg'>
            <img src={post.user.cover} alt='' />
          </div>
          <img
            src={post.images[0].url}
            alt=''
            className='post_updated_picture'
          />
        </div>
      ) : (
        <div className='post_cover_wrap'>
          <img src={post.images[0].url} alt='' />
        </div>
      )}

      <div className='post_infos'>
        <div className='reacts_count'>
          <div className='reacts_count_imgs'>
            {react?.reacts &&
              react?.reacts
                .slice(0, 3)
                .map(
                  (value) =>
                    value.count > 0 && (
                      <img
                        src={`../../../reacts/${value.react}.svg`}
                        alt=''
                        key={value.react}
                      />
                    )
                )}
          </div>
          <div className='reacts_count_num'>
            {react?.total > 0 && react?.total}
          </div>
        </div>
        <div className='to_right'>
          <div className='comments_count'>{comments.length} comments</div>
          <div className='share_count'>0 share</div>
        </div>
      </div>
      <div className='post_actions'>
        <ReactsPopup
          visible={visible}
          setVisible={setVisible}
          postId={post._id}
          reactPost={reactPost}
        />
        <div
          className='post_action hover1'
          onMouseOver={() => {
            setTimeout(() => {
              setVisible(true);
            }, 500);
          }}
          onMouseLeave={() => {
            setTimeout(() => {
              setVisible(false);
            }, 500);
          }}
          onClick={() =>
            reactPost({ postId: post._id, react: react.check || 'like' })
          }
        >
          {react?.check ? (
            <img
              src={`../../../reacts/${react?.check}.svg`}
              alt=''
              className='small_react'
              style={{ width: '18px' }}
            />
          ) : (
            <i className='like_icon'></i>
          )}
          <span
            style={{
              textTransform: 'capitalize',
              color: `${
                react?.check === 'like'
                  ? '#4267b2'
                  : react?.check === 'love'
                  ? '#f63459'
                  : react?.check === 'haha'
                  ? '#f7b125'
                  : react?.check === 'sad'
                  ? '#f7b125'
                  : react?.check === 'wow'
                  ? '#f7b125'
                  : react?.check === 'angry'
                  ? '#e4605a'
                  : ''
              }`,
            }}
          >
            {react?.check || 'Like'}
          </span>
        </div>
        <div className='post_action hover1'>
          <i className='comment_icon'></i>
          <span>Comment</span>
        </div>
        <div className='post_action hover1'>
          <i className='share_icon'></i>
          <span>Share</span>
        </div>
      </div>

      <div className='comments_wrap'>
        <div className='comments_order'></div>
        <CreateComment user={user} postId={post._id} setCount={setCount} />
        {comments.length > 0 &&
          comments
            .sort((a, b) => {
              return new Date(b.commentAt) - new Date(a.commentAt);
            })
            .slice(0, count)
            .map((comment, i) => <Comment comment={comment} key={i} />)}
        {count < comments.length && (
          <div
            className='view_comments'
            onClick={() => setCount((prev) => prev + 3)}
          >
            View more comments
          </div>
        )}
      </div>
      {showMenu && (
        <PostMenu
          userId={user.id}
          postUserId={post.user._id}
          postId={post._id}
          setShowMenu={setShowMenu}
          user={user}
          images={post.images}
        />
      )}
    </div>
  );
}
