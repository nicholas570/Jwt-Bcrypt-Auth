import { useContext, useEffect, useState } from 'react';
import { Route, Redirect, useHistory } from 'react-router-dom';

import { authContext } from '../../context/AuthProvider';
import { userContext } from '../../context/UserProvider';

function PrivateRoute({ component: Component, layout: Layout, ...rest }) {
  const { userData } = useContext(userContext);
  const { accessPrivateRoutes } = useContext(authContext);
  const [isValid, setIsValid] = useState();
  const history = useHistory();

  useEffect(() => {
    accessPrivateRoutes(history, userData, setIsValid);
  }, []);

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
