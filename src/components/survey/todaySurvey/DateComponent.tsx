import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import useUserHttp from '@hooks/queries/useUserQuery';
import { ListInterface } from '@interfaces/listInterface';
import { UserInterface } from '@interfaces/userInterface';
import { userState } from '@/states/userState';
import { useRecoilValue } from 'recoil';
import { NavItem } from 'react-bootstrap';

const DateComponent = () => {
    const user = useRecoilValue(userState)
    const today = new Date();
    const todayMonth = today.getMonth();
    const todayDate = today.getDate();
    const handleChagne = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
    }

    //url로 전달받은 데이터
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const pgNo = urlParams.get('pgNo');


    function getDates(start: string): Array<{ year: string, month: string, day: string, total: string }> {
        const startDate = new Date(start);
        const endDate = new Date();
        endDate.setDate(endDate.getDate() + 1)
        const result = [];
        while (startDate <= endDate) {
            result.push({
                year: startDate.getFullYear().toString(),
                month: (startDate.getMonth() + 1).toString(),
                day: startDate.getDate().toString(),
                total: startDate.toISOString().slice(0, 10),
            });
            startDate.setDate(startDate.getDate() + 1);
        }
        return result;
    }

    function getToday() {
        var date = new Date();
        var year = date.getFullYear();
        var month = ("0" + (1 + date.getMonth())).slice(-2);
        var day = ("0" + date.getDate()).slice(-2);
        return year + "-" + month + "-" + day;
    }
    const [selectedDate, setSelectedDate] = useState<Array<{ year: string; month: string; day: string; total: string }>>([]);
    const [selectedIndex, setSelectedIndex] = useState<any>(0);
    useEffect(() => {
        fetch(`https://api.life.codeidea.io/usr/programs/myList?paUserNo=${user.userNo}`,
            {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + user.accessToken,
                    'Content-Type': 'application/json'
                },
            }).then((response) => {
                return response.json();
            }).then((data) => {
                console.log(data);
                data.body.forEach((item: any, idx: number) => {
                    if (pgNo == item.pgNo) {
                        setSelectedDate(getDates(item.pgSttDate))
                        setSelectedIndex(getDates(item.pgSttDate).length - 1);
                    }
                });
            }).catch((error) => {
                console.log(error)
            });
    }, []);
    const handlePrevDate = () => {
        if (selectedIndex > selectedDate.length - 6)
            selectedIndex > 0 && setSelectedIndex(selectedIndex - 1)
    }

    const handleNextDate = () => {
        selectedIndex < selectedDate.length - 1 && setSelectedIndex(selectedIndex + 1)
    }


    return (
        <>
            <div className="dDay">D+{selectedDate.length - 1}</div>
            <div className='date'>
                <button type='button' onClick={handlePrevDate}></button>
                {selectedDate.map((date, index) => (
                    index == selectedIndex
                        ?
                        <span className='today' key={index}>
                            {date.month}월{date.day}일
                        </span>
                        :
                        <span style={{ display: "none" }} className='today' key={index}>
                            {date.month}월{date.day}일
                        </span>
                ))}
                <button type='button' onClick={handleNextDate}> </button>
            </div>
        </>

    );
};

export default DateComponent;
