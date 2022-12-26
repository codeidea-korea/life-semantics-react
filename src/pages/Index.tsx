import React, { useEffect } from 'react';
import WebLayout from '@layouts/web/WebLayout';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { userState } from '@states/userState';

const Index = () => {
  const navigate = useNavigate();
  const [, setUser] = useRecoilState(userState);

  useEffect(() => {
    setUser({userID:'', userName: ''});
    navigate('/main');
  }, []);

  return (
    <React.Fragment>
    </React.Fragment>
  );
};

export default Index;
