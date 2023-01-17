import React, { useEffect, useState } from 'react';
import ProgramNumberDetailComponent from './ProgramNumberDetailComponent';
import useUserHttp from '@hooks/queries/useUserQuery';
import { ListInterface } from '@interfaces/listInterface';
import { UserInterface } from '@interfaces/userInterface';
import { ProgramNumberDetailInterface } from "@/interfaces/programNumberDetailInterface";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const RoundComponent = ({roundList}: {roundList: ProgramNumberDetailInterface[]}) => {
  const [roundDetails, setRoundDetails] = useState<ProgramNumberDetailInterface[]>([]);
  
  useEffect(() => {
    const totalRound = document.querySelector('.roundNumber') as HTMLDivElement;
    totalRound.click();
  }, []);

  useEffect(()=>{
    setRoundDetails([...roundList]);
  },[roundList])

  const setDetail = (
    event: React.MouseEvent<HTMLElement>,
    roundNumber: number,
    backgroundColor: string,
    color: string
  ) => {
    event.preventDefault();

    const target = event.target as HTMLDivElement;
    target.parentElement
      ?.querySelectorAll<HTMLDivElement>('.swiper-slide')
      .forEach((item) => {
        item.style.backgroundColor = '#f3f3f3';
        item.style.color = '#8f8f8f';
      });

    target.style.backgroundColor = backgroundColor;
    target.style.color = color;

    setRoundDetails(roundNumber === 0 ? [...roundList] : [roundList[roundNumber-1]]);
  };

  return (
    <React.Fragment>
      <Swiper
        spaceBetween={20}
        slidesPerView={'auto'}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
      >
        <SwiperSlide
          className="roundNumber"
          onClick={(event) => setDetail(event, 0, '#41b946', '#fff')}
        >
          전체
        </SwiperSlide>
        
        {roundList.map((round) => (
          <SwiperSlide
            className="roundNumber"
            onClick={(event) => setDetail(event, round.prNum, '#41b946', '#fff')}
            key={round.prNum}
          >
            {round.prNum}회기
          </SwiperSlide> 
        ))}
      </Swiper>

      {roundDetails && roundDetails.map(round => <ProgramNumberDetailComponent roundDetail={round} key={round.prNum}/>)}
    </React.Fragment>
  );
};

export default RoundComponent;
