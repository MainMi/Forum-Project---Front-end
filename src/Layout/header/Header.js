import { NavLink } from 'react-router-dom';
import classes from './Header.module.scss';
import Button from '../../UI/Button';
import Logo from '../../UI/Logo';
import { useDispatch, useSelector } from 'react-redux';
import { authAction } from '../../store/auth-slice';
import { useEffect } from 'react';
import { fetchUserInfo } from '../../store/actions/auth-actions';

const Header = () => {
    const dispatch = useDispatch();
    const userToken = useSelector((state) => state.auth.userToken);
    const userInfo = useSelector((state) => state.auth.userInfo);

    useEffect(() => {
        if (!userToken) {
            dispatch(fetchUserInfo());
        }
    }, []);


    const navLinkHeader = ({ isActive }) => {
        return isActive ? classes.active : undefined;
    };

    const clickLogoutHandler = () => {
        dispatch(authAction.logOutAuth());
    };

    
    return (
        <header className={classes.header}>
            <h2 className={classes.title}>
                <Logo className={classes.logo} width={26} color="#E7E9ED" />
                orum Project
            </h2>
            <nav className={classes.navigation}>
                <div className={classes.navBox}>
                    <NavLink to="/" className={navLinkHeader}>
                        Home
                    </NavLink>
                </div>
                <div className={classes.navBox}>
                    <NavLink to="/about" className={navLinkHeader}>
                        About
                    </NavLink>
                </div>
                <div className={classes.navBox}>
                    <NavLink to="/topic" className={navLinkHeader}>
                        Topic
                    </NavLink>
                </div>
                {userInfo?.userId && (
                    <div className={classes.navBox}>
                        <NavLink to="/profile" className={navLinkHeader}>
                            Profile
                        </NavLink>
                    </div>
                )}
            </nav>
            <div className={classes.buttonBox}>
                {!userInfo?.userId ? (
                    <NavLink to="/sing">
                        <Button width="max-content" padding="8px 40px">
                            Sign
                        </Button>
                    </NavLink>
                ) : (
                    <NavLink to="/">
                        <Button
                            width="max-content"
                            padding="8px 40px"
                            color="red"
                            onClick={clickLogoutHandler}
                        >
                            Logout
                        </Button>
                    </NavLink>
                )}
            </div>
        </header>
    );
};

export default Header;
