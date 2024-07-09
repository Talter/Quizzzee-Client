import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import QuestionSetOverview from '../../components/quizzy/questionSetOverview';
import { UserContext } from '../../context/UserContext';
import { message } from 'antd';

function QuizzzyDetail() {
    const { id } = useParams();
    const [data, setData] = useState();
    const [quizzzies, setQuizzzies] = useState();
    const { token } = useContext(UserContext);
    const [messageApi, contextHolder] = message.useMessage();

    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/quizzzy/${id}`);
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

    useEffect(() => {
      
      fetchData();
    }, []);

    const openMessage = (type, content) => {
      messageApi.open({
        type,
        content,
      });
    };
  
    const handleSetActive = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/quizzzy/${id}/${data.isActive ? "block" : "unblock"}`,
          {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          openMessage("error", "Network response was not ok!")
          throw new Error("Network response was not ok");
        }
        if(data.isActive){
          openMessage("success", "Ban user successfully!")
        }else {
          openMessage("success", "Unban user successfully!")
        }
        fetchData();
  
      } catch (error) {
        openMessage("error", "Error handle user's availability!");
      }
    }
    
  return (
    <div>
      {contextHolder}
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
        {
          data && (
            <div className="mt-12 text-2xl mx-6 font-semibold">
        <span>Availability: </span>
          <button onClick={() => handleSetActive()} className={"py-2 px-4 text-white rounded-lg " + (data.isActive ? "bg-green-400" : "bg-red-500")} >{data.isActive ? "Active" : "Banned"}</button>
      </div>
          )
        }
    </div>
  )
}

export default QuizzzyDetail