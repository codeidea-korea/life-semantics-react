import React, {useEffect, useState} from 'react';

const LostIdComponent = ({next}: { next: Function }) => {
    const [requiredComplete, setRequiredComplete] = useState(false);
    const [requiredPhoneNumber, setRequiredPhoneNumber] = useState(false);
    const [requiredAuthCode, setRequiredAuthCode] = useState(false);
    const [num, setNum] = useState('');
    const [code, setCode] = useState('');
    const [timePlaceHolder, setTimePlaceHolder] = useState('인증번호 입력(10분 안에)');
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
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

    const handleAuthCode = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = event.currentTarget;
        let reduceAuthCode = value.replace(/[^0-9]/g, '');
        if (reduceAuthCode.length == 6) {
            setRequiredAuthCode(true);
        } else {
            setRequiredAuthCode(false);
        }
        setCode(reduceAuthCode);
    }

    /**
     * 카운트다운 시간 설정, 기존 입력 코드 & 입력완료 플래그 초기화
     * @param {number} minute 초기화 시 사용할 숫자타입의 분 값
     * @param {number} second 초기화 시 사용할 숫자타입의 초 값
     * @return 초기화된 state
     */
    const handleCountDownPlaceHolder = (minute: number, second: number) => {
        setCode('');
        setRequiredAuthCode(false);
        setMinutes(minute);
        setSeconds(second);
    }

    const handleRequestAuth = () => {
        //TODO 인증 요청 로직 .then 후에 200 떨어진후 밑에 로직
        handleCountDownPlaceHolder(10,0);
    };

    const handleSendAuth = () => {
        //TODO 인증 확인 로직 .then 후에 200 떨어진후 밑에 로직
        setRequiredComplete(true);
    };

    useEffect(() => {
        if (seconds > 0 || minutes > 0) {
            const countdown = setInterval(() => {
                if (parseInt(String(seconds)) > 0) {
                    setSeconds(parseInt(String(seconds)) - 1);
                }
                if (parseInt(String(seconds)) === 0) {
                    if (parseInt(String(minutes)) === 0) {
                        clearInterval(countdown);
                    } else {
                        setMinutes(parseInt(String(minutes)) - 1);
                        setSeconds(59);
                    }
                }
                setTimePlaceHolder(`${minutes}` + ' : ' + (seconds < 10 ? `0${seconds}` : seconds));
            }, 1000);
            return () => clearInterval(countdown);
        }
    }, [minutes, seconds]);

    return (
        <React.Fragment>
            <div className="Container">
                <div>
                    <h3 className="">본인 인증을 진행해 주세요.</h3>
                    <span className="CodeCheck">
                        <input type="text" placeholder="휴대폰 번호 입력" value={num} onChange={handlePhoneNumber} maxLength={13}/>
                        {requiredPhoneNumber &&
                            <button type="button" onClick={handleRequestAuth}>인증번호<br/>받기</button>
                        }
                        {!requiredPhoneNumber &&
                            <button type="button" className="doubleCheck green">인증번호<br/>받기</button>
                        }
                    </span>
                    <span className="CodeCheck">
                    <input type="text" id="authNumber" placeholder={timePlaceHolder} maxLength={6} value={code}
                           onChange={handleAuthCode}/>
                        {requiredAuthCode &&
                            <button type="button" onClick={handleSendAuth}>확인</button>
                        }
                        {!requiredAuthCode &&
                            <button type="button" className="doubleCheck green">확인</button>
                        }
                    </span>

                </div>
                {requiredComplete && <p className="alarm">인증이<br/>완료되었습니다.</p>}
                {!requiredComplete && <p className="alarm">아직 인증이<br/>완료되지 않았습니다.</p>}
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
