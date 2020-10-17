import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from '../App';

const PrivateRoute = ({ children, ...rest }) => {

    const [ loggedInUser, setLoggedInUser ] = useContext(UserContext);

    return (
        <Route
            {...rest}
            render={({ location }) =>
            loggedInUser.email ? (children) :
                    (
                        <Redirect
                            to={{
                                pathname: "/signin",
                                state: { form: location }
                            }}
                        >

                        </Redirect>
                    )
            }
        >

        </Route>
    );
};

export default PrivateRoute;