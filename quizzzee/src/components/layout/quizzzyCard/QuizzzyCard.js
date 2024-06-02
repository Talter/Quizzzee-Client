const QuizzzyCard = ({ quizzzy }) => {
  return (
    <a
      className=" rounded-xl  bg-subColor shadow-inner grid grid-rows-2 transition transform hover:scale-105"
      href={`/quizzzy/${quizzzy.id}`}
    >
      <div className="min-h-36 text-xl text-white text-center flex items-center justify-center">
        {quizzzy.name}
      </div>
      <div className="min-h-36 bg-white border-extraColor border rounded-xl text-black px-4 py-2">
        <div>Description: {quizzzy.description}</div>
        <div>Author: {quizzzy.author}</div>
        <div className="mt-7 text-gray-400">
          Last update: {quizzzy.lastUpdate}
        </div>
      </div>
    </a>
  );
};

export default QuizzzyCard;
