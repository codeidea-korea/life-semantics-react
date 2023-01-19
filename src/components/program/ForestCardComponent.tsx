import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { forestState } from "@/states/forestState";

const ForestCardComponent = () => {
  const forestList = useRecoilValue(forestState);

  return (
    <React.Fragment>
      {
        forestList.map((forest, idx) => (
          <div className="forestCard" key={forest.id}>
            <Link to={"/forestView"} state={{forestId : forest.id}}>
              <p className="forestName">{forest.name}</p>
              <span>
                {forest.address}
              </span>
              <span>{forest.tel}</span>
            </Link>
          </div>
        ))
      }
    </React.Fragment>
  );
};

export default ForestCardComponent;
