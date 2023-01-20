import React from "react";
import { Link } from "react-router-dom";
import {userState} from '@states/userState';
import { useRecoilValue } from "recoil";


const BookProgram = () => {
  const user = useRecoilValue(userState);

  return (
      <div className="bookProgram">
        <p>
          <span>{user.userName}님, </span>
          오늘 설문은 하셨나요?
        </p>
        <Link to='/survey' className="surveyLink">
          설문하러가기 {'>'}
        </Link>
      </div>
  );
};

export default BookProgram;
