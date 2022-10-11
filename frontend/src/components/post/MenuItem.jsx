export default function MenuItem({ icon, title, subtitle, img, onClick }) {
  return (
    <li className='hover1' onClick={onClick}>
      {img ? <img src={img} alt='' /> : <i className={icon}></i>}
      <div className='post_menu_text'>
        <span>{title}</span>
        {subtitle && <span className='menu_post_col'>{subtitle}</span>}
      </div>
    </li>
  );
}
