import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import QuestionSetOverview from '../../components/quizzy/questionSetOverview';

function QuizzzyDetail() {
    const { id } = useParams();
    const [data, setData] = useState();
    const [quizzzies, setQuizzzies] = useState();

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`http://localhost:8080/api/quizzzy/${id}`);
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          setData(data);
          setQuizzzies(data.quizzzes);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }, []);

    
  return (
    <div>
        <div className="text-3xl mt-12 mx-8 font-semibold flex justify-between">
            <span>{data && data.title}</span>
            <span>{data && data._id}</span>
        </div>
        <div className="px-12 py-12 grid grid-flow-row gap-10 ">
        {quizzzies &&
            quizzzies.map((quizzzy) => (
              <QuestionSetOverview quizzzy={quizzzy} key={quizzzy._id}/>
            ))}
        </div>
    </div>
  )
}

export default QuizzzyDetail