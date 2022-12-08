import React, {useRef, useState} from "react";
import InputElement from "../elements/InputElement";

const LostIdComponent = ({next}: { next: Function }) => {
    const [requiredComplete, setRequiredComplete] = useState(false);
    const [requiredPhoneNumber, setRequiredPhoneNumber] = useState(false);
    const [num, setNum] = useState('');
    const [timePlaceHolder, setTimePlaceHolder] = useState('인증번호 입력(10분 안에)');

    const moveNextStep = () => {
        next();
    };

    const handlePhoneNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = event.currentTarget;
        let reducePhoneNumber = value.replace(/[^0-9]/g, '')
            .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3").replace(/(\-{1,2})$/g, "");
        if (reducePhoneNumber.length == 13) {
            setRequiredPhoneNumber(true);
        } else {
            setRequiredPhoneNumber(false);
        }
        setNum(reducePhoneNumber);
    };

    const handlePlaceHolder = () => {
        setTimePlaceHolder('10:00')
    }

    const handleSendAuth = () => {
        //TODO 인증 전송 로직 .then 후에 200 떨어진후 로직
        handlePlaceHolder();
    }

    return (
        <React.Fragment>
            <div className="Container">
                <div>
                    <h3 className="">본인 인증을 진행해 주세요.</h3>
                    <span className="CodeCheck">
                        <InputElement type="text" placeholder="휴대폰 번호 입력" value={num} onChange={handlePhoneNumber}
                                      maxLength={13}/>
                        {requiredPhoneNumber &&
                            <button type="button" onClick={handleSendAuth}>인증번호<br/>받기</button>
                        }
                        {!requiredPhoneNumber &&
                            <button type="button">인증번호<br/>받기</button>
                        }
                    </span>
                    <InputElement type="text" id="authNumber" placeholder={timePlaceHolder}/>
                </div>
                <p className="alarm">
                    아직 인증이<br/>완료되지 않았습니다.
                </p>
            </div>
            {requiredComplete &&
                <button type="button" className="btn-02 fixed active" onClick={moveNextStep}>다음</button>
            }
            {!requiredComplete &&
                <button type="button" className="btn-02 fixed">다음</button>
            }
        </React.Fragment>
    );
};

export default LostIdComponent;
