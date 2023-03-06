import React from 'react';
import { useNavigate } from 'react-router-dom';
import useUserHttp from '@hooks/queries/useUserQuery';
import { ListInterface } from '@interfaces/listInterface';
import { UserInterface } from '@interfaces/userInterface';

const GoodSleepComponent = () => {
  const navigate = useNavigate();

  const moveProgramList = () => {
    navigate('/program', {state: {pgType: 'goodNight'}});
  };

  return (
    <React.Fragment>
        <div className='good' id='goodSleep' onClick={moveProgramList}>
            <p>웰컴 굿잠</p>
            <span>수면 장애로 인해 일상 활동이 제한되는 암 경험자에게 숲 활동, 운동, 명상 중심의 수면 증진 8단계 산림치유 프로그램을 수면을 증진시키고 신체적 심리적 건강의 향상을 도모하는 프로그램.</span>
        </div>
    </React.Fragment>
  );
};

export default GoodSleepComponent;
