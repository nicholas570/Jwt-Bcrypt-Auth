import { useContext, useEffect, useState } from 'react';
import { Route, Redirect, useHistory } from 'react-router-dom';
import axiosInstance from '../../axios/axiosInstance';

import { userContext } from '../../context/userProvider';

function PrivateRoute({ component: Component, ...rest }) {
  const { userData } = useContext(userContext);
  const [isValid, setIsValid] = useState();
  const history = useHistory();

  useEffect(() => {
    axiosInstance(history)
      .post('api/auth/authenticateToken', { token: userData.token })
      .then(({ data }) => {
        setIsValid(data);
      })
      .catch((err) => setIsValid(err.response));
  }, []);

  return (
    <>
      {isValid && (
        <Route
          {...rest}
          render={(props) =>
            isValid === true ? <Component {...props} /> : <Redirect to='/' />
          }
        />
      )}
    </>
  );
}

export default PrivateRoute;
