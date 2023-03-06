import React from 'react';
import { useNavigate } from 'react-router-dom';
import useUserHttp from '@hooks/queries/useUserQuery';
import { ListInterface } from '@interfaces/listInterface';
import { UserInterface } from '@interfaces/userInterface';

const GoodByeComponent = () => {
  const navigate = useNavigate();

  const moveProgramList = () => {
    navigate('/program', {state: {pgType: 'goodBye'}});
  };

  return (
    <React.Fragment>
        <div className='good' id='goodBye' onClick={moveProgramList}>
            <p>굿바이 피로</p>
            <span>피로로 인해 일상 활동이 제한되는 암 경험자에게 숲 활동, 운동, 명상 중심의 8단계 산림치유 프로그램을 제공하여 피로를 감소시키고 신체적 심리적 건강의 향상을 도모하는 프로그램.</span>
        </div>
    </React.Fragment>
  );
};

export default GoodByeComponent;
