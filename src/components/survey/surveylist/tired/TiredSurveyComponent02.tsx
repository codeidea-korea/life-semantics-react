import React, { useEffect, useState } from "react";
import InputElement from "@/components/elements/InputElement";
import useUserHttp from "@hooks/queries/useUserQuery";
import $ from "jquery";

const TiredSurveyComponent02 = () => {
 


  return (
    <React.Fragment>
     
     <div className="surveyList">
      <ul>
        <li className="surveyContent">
          <p>6. 몸이 무겁고 나른하다고 느끼십니까?</p>
          <ul>
            <li>
              <InputElement type='radio' className='radioButton' value='1' name='qna6'/>
              <label htmlFor="">전혀 그렇지 않다</label>
            </li>
            <li>
              <InputElement type='radio' className='radioButton' value='2' name='qna6'/>
              <label htmlFor="">거의 그렇지 않다</label>
            </li>
            <li>
              <InputElement type='radio' className='radioButton' value='3' name='qna6'/>
              <label htmlFor="">약간 그렇다</label>
            </li>
            <li>
              <InputElement type='radio' className='radioButton' value='4' name='qna6'/>
              <label htmlFor="">상당히 그렇다</label>
            </li>
            <li>
              <InputElement type='radio' className='radioButton' value='5' name='qna6'/>
              <label htmlFor="">매우 상당히 그렇다</label>
            </li>
            
          </ul>
        </li>
        <li className="surveyContent">
          <p>7. 말할 때 실수가 늘어난 것 같다고 느끼십니까?</p>
          <ul>
            <li>
              <InputElement type='radio' className='radioButton' value='1' name='qna7'/>
              <label htmlFor="">전혀 그렇지 않다</label>
            </li>
            <li>
              <InputElement type='radio' className='radioButton' value='2' name='qna7'/>
              <label htmlFor="">거의 그렇지 않다</label>
            </li>
            <li>
              <InputElement type='radio' className='radioButton' value='3' name='qna7'/>
              <label htmlFor="">약간 그렇다</label>
            </li>
            <li>
              <InputElement type='radio' className='radioButton' value='4' name='qna7'/>
              <label htmlFor="">매우 그렇다</label>
            </li>
            <li>
              <InputElement type='radio' className='radioButton' value='5' name='qna7'/>
              <label htmlFor="">매우 상당히 그렇다</label>
            </li>
            
          </ul>
        </li>
        <li className="surveyContent">
          <p>8. 무엇인가에 흥미가 느껴지십니까?</p>
          <ul>
            <li>
              <InputElement type='radio' className='radioButton' value='1' name='qna8'/>
              <label htmlFor="">전혀 그렇지 않다</label>
            </li>
            <li>
              <InputElement type='radio' className='radioButton' value='2' name='qna8'/>
              <label htmlFor="">거의 그렇지 않다</label>
            </li>
            <li>
              <InputElement type='radio' className='radioButton' value='3' name='qna8'/>
              <label htmlFor="">상당히 그렇다</label>
            </li>
            <li>
              <InputElement type='radio' className='radioButton' value='4' name='qna8'/>
              <label htmlFor="">매우 그렇다</label>
            </li>
            <li>
              <InputElement type='radio' className='radioButton' value='5' name='qna8'/>
              <label htmlFor="">매우 상당히 그렇다</label>
            </li>
            
          </ul>
        </li>
        <li className="surveyContent">
          <p>9. (어떤 것을 할 때) 지쳐서 하기 싫다고 느끼십니까?</p>
          <ul>
            <li>
              <InputElement type='radio' className='radioButton' value='1' name='qna9'/>
              <label htmlFor="">전혀 그렇지 않다</label>
            </li>
            <li>
              <InputElement type='radio' className='radioButton' value='2' name='qna9'/>
              <label htmlFor="">거의 그렇지 않다</label>
            </li>
            <li>
              <InputElement type='radio' className='radioButton' value='3' name='qna9'/>
              <label htmlFor="">상당히 그렇다</label>
            </li>
            <li>
              <InputElement type='radio' className='radioButton' value='4' name='qna9'/>
              <label htmlFor="">매우 그렇다</label>
            </li>
            <li>
              <InputElement type='radio' className='radioButton' value='5' name='qna9'/>
              <label htmlFor="">매우 상당히 그렇다</label>
            </li>
          </ul>
        </li>
        <li className="surveyContent">
          <p>10. 자주 깜박하거나 건망증이 있다고 느끼십니까?</p>
          <ul>
            <li>
              <InputElement type='radio' className='radioButton' value='1' name='qna10'/>
              <label htmlFor="">전혀 그렇지 않다</label>
            </li>
            <li>
              <InputElement type='radio' className='radioButton' value='2' name='qna10'/>
              <label htmlFor="">거의 그렇지 않다</label>
            </li>
            <li>
              <InputElement type='radio' className='radioButton' value='3' name='qna10'/>
              <label htmlFor="">약간 그렇다</label>
            </li>
            <li>
              <InputElement type='radio' className='radioButton' value='4' name='qna10'/>
              <label htmlFor="">상당히 그렇다</label>
            </li>
            <li>
              <InputElement type='radio' className='radioButton' value='5' name='qna10'/>
              <label htmlFor="">매우 상당히 그렇다</label>
            </li>
          </ul>
        </li>
      </ul>
     </div>
    </React.Fragment>
  );
};

export default TiredSurveyComponent02;
