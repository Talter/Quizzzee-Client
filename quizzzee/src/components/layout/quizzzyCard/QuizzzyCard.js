import { Link } from "react-router-dom";


const QuizzzyCard = ({ quizzzy }) => {
  return (
    <Link
      className=" rounded-xl  bg-subColor shadow-inner grid grid-rows-2 transition transform hover:scale-105 active:scale-90"
      to={`/quizzzy/${quizzzy._id}`}
    >
      <div className="min-h-36 text-xl text-white text-center flex items-center justify-center">
        {quizzzy.title}
      </div>
      <div className="min-h-36 bg-white border-extraColor border rounded-xl text-black px-4 py-2">
        <div>Description: {quizzzy.description}</div>
        <div>Author: {quizzzy.createdBy}</div>
        <div className="mt-7 text-gray-400">
          Last update: {quizzzy.updatedAt.substring(0,10)}
        </div>
      </div>
    </Link>
  );
};

export default QuizzzyCard;
