import { useContext, useEffect, useState } from 'react';
import { Route, Redirect, useHistory } from 'react-router-dom';

import { authContext } from '../../context/AuthProvider';

function PrivateRoute({ component: Component, layout: Layout, ...rest }) {
  const { accessPrivateRoutes, token, setToken } = useContext(authContext);
  const [isValid, setIsValid] = useState();
  const history = useHistory();

  useEffect(() => {
    accessPrivateRoutes(history, token, setIsValid);
    setToken(localStorage.getItem('Token'));
  }, [token]);

  return (
    <>
      {isValid && (
        <Route
          {...rest}
          render={(props) =>
            isValid === true ? (
              <Layout {...props}>
                <Component {...props} />
              </Layout>
            ) : (
              <Redirect to='/' />
            )
          }
        />
      )}
    </>
  );
}

export default PrivateRoute;
