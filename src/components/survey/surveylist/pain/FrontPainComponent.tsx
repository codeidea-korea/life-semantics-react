import React, { useEffect, useState } from "react";
import ImageMapper, { MapAreas } from "@mohamadtsn/react-img-mapper";
import InputElement from "@/components/elements/InputElement";
import useUserHttp from "@hooks/queries/useUserQuery";
import { ListInterface } from "@interfaces/listInterface";
import { UserInterface } from "@interfaces/userInterface";

import $ from "jquery";

const FrontPainComponent = () => {
    const [center, setCenter] = useState(0);

    return (
        <React.Fragment>
            <div className="frontPain">
                <img src="images/front.svg" alt="앞모습" />
                <span data-index={1} className="dot" data-name="foreHead" data-title="전두부"></span>
                <span data-index={3} className="dot" data-name="leftShoulder" data-title="왼쪽 어깨"></span>
                <span data-index={2} className="dot" data-name="rightShoulder" data-title="오른쪽 어깨"></span>
                <span data-index={5} className="dot" data-name="leftArmpit" data-title="왼쪽 겨드랑이"></span>
                <span data-index={4} className="dot" data-name="rightArmpit" data-title="오른쪽 겨드랑이"></span>
                <span data-index={7} className="dot" data-name="leftchest" data-title="왼쪽 가슴"></span>
                <span data-index={6} className="dot" data-name="rightchest" data-title="오른쪽 가슴"></span>
                <span data-index={9} className="dot" data-name="leftwaist" data-title="왼쪽 허리"></span>
                <span data-index={8} className="dot" data-name="rightwaist" data-title="오른쪽 허리"></span>
                <span data-index={10} className="dot" data-name="abdomen" data-title="복부"></span>
                <span data-index={12} className="dot" data-name="leftPelvis" data-title="왼쪽 골반"></span>
                <span data-index={11} className="dot" data-name="rightPelvis" data-title="오른쪽 골반"></span>
                <span data-index={14} className="dot" data-name="leftWrist" data-title="왼쪽 손목"></span>
                <span data-index={13} className="dot" data-name="rightWrist" data-title="오른쪽 손목"></span>
                <span data-index={16} className="dot" data-name="leftFinger" data-title="왼쪽 손가락 관절 및 손끝"></span>
                <span data-index={15} className="dot" data-name="rightFinger" data-title="오른쪽 손가락 관절 및 손끝"></span>

                <span data-index={20} className="dot" data-name="leftKnee" data-title="왼쪽 무릎"></span>
                <span data-index={19} className="dot" data-name="rightKnee" data-title="오른쪽 무릎"></span>

                <span data-index={24} className="dot" data-name="leftAnkles" data-title="왼쪽 발목"></span>
                <span data-index={23} className="dot" data-name="rightAnkles" data-title="오른쪽 발목"></span>

                <span data-index={26} className="dot" data-name="leftAnkles2" data-title="왼쪽 발가락 관절 및 발끝"></span>
                <span data-index={25} className="dot" data-name="rightAnkles2" data-title="오른쪽 발가락 관절 및 발끝"></span>

                <span data-index={17} className="dot" data-name="rightThigh" data-title="오른쪽 허벅지"></span>
                <span data-index={18} className="dot" data-name="leftThigh" data-title="왼쪽 허벅지"></span>

                <span data-index={21} className="dot" data-name="rightShin" data-title="오른쪽 정강이"></span>
                <span data-index={22} className="dot" data-name="leftShin" data-title="왼쪽 정강이"></span>
            </div>
        </React.Fragment>
    );
};

export default FrontPainComponent;
