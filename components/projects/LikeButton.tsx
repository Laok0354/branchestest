const LikeDislikeButton = ({
  filled,
  notFilled,
  liked,
  handleLike
}: {
  filled: string;
  notFilled: string;
  liked : boolean
  handleLike : () => void
}) => {
  return (
    <div>
      <button onClick={handleLike}  className={`transform transition-transform duration-300 ease-in-out mr-1 ${liked ? 'scale-110' : 'scale-100'}`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          fill="currentColor"
          viewBox="0 0 16 16"
          className={`text-white cursor-pointer ${liked ? 'active' : ''}`}
        >
          <path d={liked ? filled : notFilled} />
        </svg>
      </button>
    </div>
  );
};

export default LikeDislikeButton;
