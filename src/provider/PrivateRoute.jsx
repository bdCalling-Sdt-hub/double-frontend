import { Navigate } from 'react-router';
import PropTypes from 'prop-types';

const PrivateRoute = ({ children }) => {
        const token = localStorage.getItem('authToken');
        if (!token) {
                return <Navigate to="/auth/login" />;
        }
        return children;
};

PrivateRoute.propTypes = {
        children: PropTypes.node.isRequired,
};

export default PrivateRoute;
