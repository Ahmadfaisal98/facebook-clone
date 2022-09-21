import { ArrowRight, Plus } from '../../../svg';
import { stories } from '../../../data/home';
import Story from './Story';
import './style.scss';

export default function Stories() {
  return (
    <div className='stories'>
      <div className='create_story_card'>
        <img
          src='../../../images/default_pic.png'
          alt=''
          className='create_story_img'
        />
        <div className='plus_story'>
          <Plus color='#fff' />
        </div>
        <div className='story_create_text'>Create Story</div>
      </div>
      {stories.map((story) => (
        <Story story={story} key={story.profile_name} />
      ))}
      <div className='white_circle'>
        <ArrowRight color='#65676b' />
      </div>
    </div>
  );
}