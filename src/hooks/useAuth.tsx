import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userState } from "@/states/userState";
import { useRecoilValue } from "recoil";

const useAuth = () => {
  const user = useRecoilValue(userState);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user.accessToken) {
      navigate("/login")
    }
  }, [navigate, user])
}

export default useAuth;