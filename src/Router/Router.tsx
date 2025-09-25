import {Route, Routes} from 'react-router-dom';
import LoginPage from '../components/pages/LoginPage/LoginPage';
import PrivateRoute from './PrivateRoute';
import HomePage from '../components/pages/HomePage';
import UserTable from '../components/pages/UserPage/UserTable';
import UserPage from '../components/pages/UserPage/UserPage';
import authorities from '../config/Authorities';
import ProfileListPage from "../components/pages/ProfileListPage/ProfileListPage";
import AdminPage from "../components/pages/AdminPage/AdminPage";

/**
 * Router component renders a route switch with all available pages
 */

const Router = () => {

    return (
        <Routes>
            <Route path={'/'} element={<HomePage/>}/>
            <Route path={'/login'} element={<LoginPage/>}/>

            <Route
                path={'/users'}
                element={<PrivateRoute requiredAuths={[]} element={<UserTable/>}/>}
            />
            <Route
                path='/useredit'
                element={
                    <PrivateRoute
                        requiredAuths={[authorities.USER_DEACTIVATE, authorities.USER_MODIFY]}
                        element={<UserPage/>}
                    ></PrivateRoute>
                }
            />

            <Route
                path='/profileList/:userId'
                element={
                    <PrivateRoute
                        requiredAuths={[]}
                        element={<ProfileListPage/>}
                    ></PrivateRoute>
                }
            />

            <Route
                path='/admin'
                element={
                    <PrivateRoute
                        requiredAuths={[authorities.SEE_ADMIN_PAGE]}
                        element={<AdminPage/>}
                    ></PrivateRoute>
                }
            />

            <Route
                path='/useredit/:userId'
                element={
                    <PrivateRoute
                        requiredAuths={[authorities.USER_MODIFY]}
                        element={<UserPage/>}
                    ></PrivateRoute>
                }
            />

            <Route path='*' element={<div>Not Found</div>}/>
        </Routes>
    );
};

export default Router;
