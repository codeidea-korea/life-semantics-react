import React from 'react';

import useUserHttp from '@hooks/queries/useUserQuery';
import { ListInterface } from '@interfaces/listInterface';
import { UserInterface } from '@interfaces/userInterface';


const UserListComponent = () => {
  const userHttp = useUserHttp();

  const {
    data,
    error,
    isError,
    isFetched,
    isFetching,
    isLoading,
    isStale,
    isSuccess,
    remove,
    status,
  } = userHttp.get<ListInterface<UserInterface[]>>('/user/list', 'list');

  return (
    <React.Fragment>
      {isLoading ? <div>Loading...</div> :
        isSuccess ?
          <div>
            <table>
              <thead>
              <tr>
                <th>No</th>
                <th>ID</th>
                <th>name</th>
              </tr>
              </thead>
              <tbody>
              {data.list.map((item, index) =>
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item?.userID}</td>
                  <td>{item?.userName}</td>
                </tr>,
              )}
              </tbody>
            </table>
          </div> : null
      }
    </React.Fragment>
  );
};

export default UserListComponent;
