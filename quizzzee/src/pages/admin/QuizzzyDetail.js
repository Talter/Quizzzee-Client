import React from 'react'
import { useParams } from 'react-router-dom';
import QuestionSetOverview from '../../components/quizzy/questionSetOverview';

function QuizzzyDetail() {
    const { id } = useParams();
  return (
    <div>
        <div>
            Name ABC XYZ
        </div>
        <div className="px-12 py-12 grid grid-flow-row gap-10 ">
            <QuestionSetOverview />
            <QuestionSetOverview />
            <QuestionSetOverview />
            <QuestionSetOverview />
        </div>
    </div>
  )
}

export default QuizzzyDetail