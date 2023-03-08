import React from "react";
import useUserHttp from "@hooks/queries/useUserQuery";
import { ListInterface } from "@interfaces/listInterface";
import { UserInterface } from "@interfaces/userInterface";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ProgramFileInterface } from "@/interfaces/programFileInterface";
import axios from "axios";

const DownLoadComponent = ({ fileList }: { fileList: ProgramFileInterface[] }) => {
  const downloadFile = (url: string, name: string) => {
    axios({
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
    });
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
