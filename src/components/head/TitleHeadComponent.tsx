import React from 'react';
import {useNavigate} from 'react-router-dom';

const TitleHeadComponent = ({name, targetUrl}: { name: string , targetUrl: string}) => {

    const navigate = useNavigate();
    return (
        <React.Fragment>
            <div className='HeaderFix'>
                {targetUrl === '' &&
                <button type='button' onClick={() => navigate(-1)}>
                    <img src='images/arrow.svg'></img>
                </button>
                }
                {targetUrl !== '' &&
                <button type='button' onClick={() => navigate(targetUrl)}>
                    <img src='images/arrow.svg'></img>
                </button>
                }
                <h2>{name}</h2>
            </div>
            <div className='headerSpace'></div>
        </React.Fragment>
    )
};

export default TitleHeadComponent
;
