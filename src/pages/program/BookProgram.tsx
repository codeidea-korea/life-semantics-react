import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {userState} from '@states/userState';
import { useRecoilValue } from "recoil";
import useAxios from "@/hooks/useAxios";


const BookProgram = () => {
  const user = useRecoilValue(userState);
  const api = useAxios();
  const [isBeforeSurveyInfo, setIsBeforeSurveyInfo] = useState(true);

  useEffect(() => {
    user.accessToken && (
      api
        .get('/users/health-and-cancer/check', {headers: {Authorization: `Bearer ${user.accessToken}`}})
        .then((res) => {
          console.log(res);
          setIsBeforeSurveyInfo(res.data.body.isCreated)
        })
        .catch((err) => {
          console.log(err);
        })
    )
  }, []);

  return (
      <div className="bookProgram">
        <p>
          <span>{user.userName}님, </span>
          오늘 설문은 하셨나요?
        </p>
        <Link to='/survey' state={{ isBeforeSurveyInfo : isBeforeSurveyInfo }} className="surveyLink">
          설문하러가기 {'>'}
        </Link>
      </div>
  );
};

export default BookProgram;
