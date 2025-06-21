import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ component: Component, allowedRoles, ...rest }) => {
    const { isAuthenticated, account } = useSelector((state) => state.user);

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if (!allowedRoles.includes(account.roleId)) {
        return <Navigate to="/unauthorized" />;
    }

    return <Component {...rest} />;
};

export default PrivateRoute;