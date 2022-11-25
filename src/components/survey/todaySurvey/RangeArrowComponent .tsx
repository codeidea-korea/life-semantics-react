import React, { Component, useEffect } from 'react';
import { useState } from 'react';
import useUserHttp from '@hooks/queries/useUserQuery';
import { ListInterface } from '@interfaces/listInterface';
import { UserInterface } from '@interfaces/userInterface';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const  RangeArrowComponent= ({left, right}:{left:React.ReactElement | string; right:React.ReactElement | string;}) => {

    return (
        <React.Fragment>
            <div className='Arrow'>
                <span className='arrowLeft'>
                    <span>{left}</span>
                </span>
                <span className='arrowRight'>
                    <span>{right}</span>
                </span>
            </div>
        </React.Fragment>
      );
};

export default RangeArrowComponent;
