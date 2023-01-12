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
                <span className="dot" data-name="foreHead"></span>
                <span className="dot" data-name="leftShoulder"></span>
                <span className="dot" data-name="rightShoulder"></span>
                <span className="dot" data-name="leftArmpit"></span>
                <span className="dot" data-name="rightArmpit"></span>
                <span className="dot" data-name="leftchest"></span>
                <span className="dot" data-name="rightchest"></span>
                <span className="dot" data-name="leftwaist"></span>
                <span className="dot" data-name="rightwaist"></span>
                <span className="dot" data-name="abdomen"></span>
                <span className="dot" data-name="leftPelvis"></span>
                <span className="dot" data-name="rightPelvis"></span>
                <span className="dot" data-name="leftWrist"></span>
                <span className="dot" data-name="rightWrist"></span>
                <span className="dot" data-name="leftFinger"></span>
                <span className="dot" data-name="rightFinger"></span>
                <span className="dot" data-name="leftKnee"></span>
                <span className="dot" data-name="rightKnee"></span>
                <span className="dot" data-name="leftAnkles"></span>
                <span className="dot" data-name="rightAnkles"></span>
                <span className="dot" data-name="leftAnkles"></span>
                <span className="dot" data-name="rightAnkles"></span>
                <span className="dot" data-name="rightThigh"></span>
                <span className="dot" data-name="leftThigh"></span>
                <span className="dot" data-name="rightShin"></span>
                <span className="dot" data-name="leftShin"></span>
            </div>
        </React.Fragment>
    );
};

export default FrontPainComponent;
