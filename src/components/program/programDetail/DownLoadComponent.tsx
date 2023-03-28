import React from "react";
import useUserHttp from "@hooks/queries/useUserQuery";
import { ListInterface } from "@interfaces/listInterface";
import { UserInterface } from "@interfaces/userInterface";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ProgramFileInterface } from "@/interfaces/programFileInterface";
import axios from "axios";
import useAxios from "@hooks/useAxios";

const DownLoadComponent = ({ fileList }: { fileList: ProgramFileInterface[] }) => {
  const api = useAxios();

  const downloadFile = (url: string, name: string) => {
      api
          .post(`${import.meta.env.VITE_PUBLIC_API_SERVER_URL}usr/programs/file/check`,{
              'filepath' : url
          })
          .then((res) => {
              if(res.data.result === '0') {
                  let downloadLink = document.createElement("a");
                  downloadLink.href = `${import.meta.env.VITE_PUBLIC_API_SERVER_URL}usr/programs/file/download?filepath=${url}&filename=${name}`;
                  downloadLink.download = name;
                  document.body.appendChild(downloadLink);
                  downloadLink.click();
                  document.body.removeChild(downloadLink);

              }else if(res.data.result === '1') {
                  alert('실제 파일이 존재하지 않습니다.');
              }else {
                  alert('오류가 발생하였습니다.');
              }
          })
          .catch((err) => {
              console.log(err);
          });

    /*axios({
      url: import.meta.env.VITE_PUBLIC_APP_URL + 'proxyApi' + url,
      method: "GET",
      responseType: "blob",
    }).then((response) => {
      const blob = new Blob([response.data]);
      const fileObjectUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = fileObjectUrl;
      link.style.display = "none";
      link.download = name;

      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(fileObjectUrl);
    });*/
  };

  const downloadFileAll = () => {
    fileList.map((file, index) => {
      if(file.fileSaveName != undefined && file.fileRealName != undefined){
        downloadFile(file.fileSaveName, file.fileRealName)
      }
    })
  };

  return (
    <React.Fragment>
      <div className="downLoad">
        {fileList?.length > 0 &&
          <div>
            <p>첨부자료</p>
            <a href="#" onClick={downloadFileAll}>
              전체 다운로드
            </a>
          </div>
        }
        <ul>
          {fileList.map((file) => (
            <li key={'fileList_' + file.fileNo} style={{whiteSpace:'nowrap', overflow:'hidden'}}>
              <a href={import.meta.env.VITE_PUBLIC_API_SERVER_URL + file.fileSaveName} download={import.meta.env.VITE_PUBLIC_API_SERVER_URL + file.fileSaveName} target='_blank'>
                {file.fileRealName}
              </a>
              <button onClick={(e) => { file.fileSaveName != undefined && file.fileRealName != undefined ? downloadFile(file.fileSaveName, file.fileRealName) : null }}>다운로드</button>
            </li>
          ))}
          {/* <li>
            <Link to="" download="">
              다운로드
            </Link>
          </li>
          <li>
            <Link to="" download="">
              다운로드
            </Link>
          </li> */}
        </ul>
      </div>
    </React.Fragment>
  );
};

export default DownLoadComponent;
