export default function PostError({ error, handleSubmit }) {
  return (
    <div className='postError'>
      <div>{error}</div>
      <button className='blue_btn' onClick={handleSubmit}>
        Try Again
      </button>
    </div>
  );
}
