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
            <span>숲 활동, 운동, 명상 프로그램이 각 10-30분 정도로 총 4~6가지의 활동으로 운영.</span>
        </div>
    </React.Fragment>
  );
};

export default GoodSleepComponent;
