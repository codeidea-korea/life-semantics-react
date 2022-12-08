import React from 'react';
import WebLayout from '@layouts/web/WebLayout';
import {useNavigate} from 'react-router-dom';

const PolicyPrivacy = () => {
    const navigate = useNavigate();
    return (
        <WebLayout>
            <div className="HeaderFix policyHeader">
                <h2>민감 정보 수집 및 이용 동의</h2>
                <button type="button" onClick={() => navigate(-1)}>
                    <img src="images/close.svg"></img>
                </button>
            </div>
            <div className='headerSpace'></div>
            <div className="policy">
                <h3>민감 정보 수집 및 이용 동의</h3>
                속에서 발휘하기 더운지라 용기가 가는 것이다. 소금이라 품에 사랑의 하여도
                심장은 그들에게 온갖 만천하의 웅대한 것이다. 새가 인생의 하는 얼음
                우리의 끝에 행복스럽고 듣기만 사랑의 황금시대다. 힘차게 것은 이상의
                이것이야말로 우리 싶이 때까지 위하여서. 사람은 놀이 청춘에서만 주는
                인생의 약동하다. 이상을 않는 피부가 간에 그것을 기쁘며, 오아이스도
                위하여서. 이상은 하는 얼음 따뜻한 있는가? 눈에 피에 이상을 따뜻한 가치를
                그들에게 운다. 만물은 인류의 사라지지 보라. 눈에 이 희망의 것이다.
                반짝이는 능히 크고 곳이 없으면, 열매를 뿐이다. 무엇을 피고 고행을 이상은
                것이다. 피부가 타오르고 구할 같으며, 천자만홍이 두기 놀이 것이다. 인간의
                피가 꽃 이 커다란 피고 무엇이 열매를 그들은 위하여서. 가는 뛰노는 꽃이
                있는 따뜻한 주는 우리 청춘의 이것이다. 무엇을 실현에 들어 그들은 힘있다.
                방황하여도, 품고 보배를 봄날의 동력은 붙잡아 영락과 위하여, 있으랴? 남는
                설산에서 자신과 공자는 이것이다. 크고 희망의 같이, 청춘은 구하지
                인도하겠다는 새 길지 황금시대다. 찾아 가장 그림자는 것이다. 품에 원질이
                미인을 앞이 위하여서. 없으면, 청춘은 불러 자신과 풍부하게 말이다.
                위하여, 곳으로 방지하는 같은 없는 광야에서 교향악이다. 싶이 구하기
                석가는 새가 만천하의 지혜는 위하여 같은 봄바람이다. 무엇을 수 바이며,
                것이다. 가슴에 풀이 부패를 우리는 사막이다. 불러 앞이 그들의 얼마나
                무엇을 예가 이상의 것이 사막이다. 같이, 끓는 주며, 인생의 쓸쓸하랴?
                할지라도 예가 청춘의 힘차게 힘차게 듣는다.
            </div>
        </WebLayout>
    );
};

export default PolicyPrivacy;
