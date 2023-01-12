import React, { useEffect, useState } from "react";
import ImageMapper, { MapAreas } from "@mohamadtsn/react-img-mapper";
import InputElement from "@/components/elements/InputElement";
import useUserHttp from "@hooks/queries/useUserQuery";
import { ListInterface } from "@interfaces/listInterface";
import { UserInterface } from "@interfaces/userInterface";

import $ from "jquery";

const BackPainComponent = () => {
    return (
        <React.Fragment>
            <div className="backPain">
                <img src="images/back.svg" alt="뒷모습" />
                <span className="dot" data-name="backHead"></span>
                <span className="dot" data-name="neck"></span>
                <span className="dot" data-name="rightBack"></span>
                <span className="dot" data-name="leftBack"></span>
                <span className="dot" data-name="rightElbow"></span>
                <span className="dot" data-name="leftElbow"></span>
                <span className="dot" data-name="waist"></span>
                <span className="dot" data-name="rightHip"></span>
                <span className="dot" data-name="leftHip"></span>
                <span className="dot" data-name="tailbone"></span>
                <span className="dot" data-name="rightHeel"></span>
                <span className="dot" data-name="leftHeel"></span>
                <span className="dot" data-name="rightThigh"></span>
                <span className="dot" data-name="leftThigh"></span>
                <span className="dot" data-name="rightShin"></span>
                <span className="dot" data-name="leftShin"></span>
                <span className="dot" data-name="rightKnee"></span>
                <span className="dot" data-name="leftKnee"></span>
            </div>
        </React.Fragment>
    );
};

export default BackPainComponent;
