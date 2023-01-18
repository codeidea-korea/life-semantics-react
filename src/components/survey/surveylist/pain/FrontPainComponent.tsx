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
                <span data-index={1} className="dot" data-name="foreHead"></span>
                <span data-index={3} className="dot" data-name="leftShoulder"></span>
                <span data-index={2} className="dot" data-name="rightShoulder"></span>
                <span data-index={5} className="dot" data-name="leftArmpit"></span>
                <span data-index={4} className="dot" data-name="rightArmpit"></span>
                <span data-index={7} className="dot" data-name="leftchest"></span>
                <span data-index={6} className="dot" data-name="rightchest"></span>
                <span data-index={9} className="dot" data-name="leftwaist"></span>
                <span data-index={8} className="dot" data-name="rightwaist"></span>
                <span data-index={10} className="dot" data-name="abdomen"></span>
                <span data-index={12} className="dot" data-name="leftPelvis"></span>
                <span data-index={11} className="dot" data-name="rightPelvis"></span>
                <span data-index={14} className="dot" data-name="leftWrist"></span>
                <span data-index={13} className="dot" data-name="rightWrist"></span>
                <span data-index={16} className="dot" data-name="leftFinger"></span>
                <span data-index={15} className="dot" data-name="rightFinger"></span>

                <span data-index={20} className="dot" data-name="leftKnee"></span>
                <span data-index={19} className="dot" data-name="rightKnee"></span>

                <span data-index={24} className="dot" data-name="leftAnkles"></span>
                <span data-index={23} className="dot" data-name="rightAnkles"></span>

                <span data-index={26} className="dot" data-name="leftAnkles2"></span>
                <span data-index={25} className="dot" data-name="rightAnkles2"></span>

                <span data-index={17} className="dot" data-name="rightThigh"></span>
                <span data-index={18} className="dot" data-name="leftThigh"></span>

                <span data-index={21} className="dot" data-name="rightShin"></span>
                <span data-index={22} className="dot" data-name="leftShin"></span>
            </div>
        </React.Fragment>
    );
};

export default FrontPainComponent;
