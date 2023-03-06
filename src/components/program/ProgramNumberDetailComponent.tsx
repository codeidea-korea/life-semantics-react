import React from "react";
import { ProgramNumberDetailInterface } from "@/interfaces/programNumberDetailInterface";

const ProgramNumberDetailComponent = ({roundDetail}: {roundDetail: ProgramNumberDetailInterface}) => {
  const [, month, day] = roundDetail.prDate.split('T')[0].split('-');
  const week = ['일', '월', '화', '수', '목', '금', '토'];
  const weekDay = week[new Date(roundDetail.prDate).getDay()];

  return (
    <React.Fragment>
      <div className="round">
        <div className="roundItem">
          <p>{roundDetail.prTitle}</p>
          <ul>
            <li>
              일시 : <span>{month[0] === '0' ? month[1] : month}/{day} {weekDay} {roundDetail.prSttTime}~{roundDetail.prEndTime}</span>
            </li>
            <li>
              장소 : <span>{roundDetail.prPlace === "etc" ? roundDetail.prPlaceText : roundDetail.prPlaceText}</span>
            </li>
            <li>
              세부활동 : <span>{roundDetail.prActs}</span>
            </li>
            <li>
              준비물 : <span>{roundDetail.prMaterials}</span>
            </li>
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProgramNumberDetailComponent;
