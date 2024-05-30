import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import TopicList from '../components/Topic/TopicList';
import classes from './ProfilePage.module.scss'
import { fetchCurrentTopic } from '../store/actions/topic-actions';
import { useEffect } from 'react';
import { formatDate } from '../helper/dateHelper';
import Button from '../UI/Button';
import Input from '../UI/Input';
import { showErrorMsg } from '../error/error.validate.msg';
import useInput from '../hook/useInput';
import validateFn from '../constant/validateFn.enum';
import { fetchAuth } from '../store/actions/auth-actions';
import urlEnum from '../constant/urlEnum';
import { authAction } from '../store/auth-slice';

const ProfilePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userInfo = useSelector((state) => state.auth.userInfo);
    const topics = useSelector((state) => state.topic.topics);

    const userId = userInfo?.userId;

    useEffect(() => {
        if (userId) {
            dispatch(fetchCurrentTopic({ userId }, false));
        }
    }, [userId, dispatch]);

    let {
        value: valuePassword,
        isValidInput: isValidPassword,
        arrayError: arrayErrorPassword,
        valueChangeHandler: passwordChangeHandler,
        inputBlurHandler: passwordBlurHandler,
    } = useInput((value) => {
        const arrValidEmpty = validateFn.isNotEmptyFn(value)
        const arrValidPassword = validateFn.isPasswordFn(value);

        return [...arrValidEmpty, ...arrValidPassword];
    }, 'Old password');

    let {
        value: valueNewPassword,
        isValidInput: isValidNewPassword,
        arrayError: arrayErrorNewPassword,
        valueChangeHandler: newPasswordChangeHandler,
        inputBlurHandler: newPasswordBlurHandler,
    } = useInput((value) => {
        const arrValidEmpty = validateFn.isNotEmptyFn(value)
        const arrValidPassword = validateFn.isPasswordFn(value);

        return [...arrValidEmpty, ...arrValidPassword];
    }, 'New password');

    if (!userId) {
        return;
    }

    const changePasswordEnabled = isValidPassword && isValidNewPassword && valueNewPassword !== valuePassword;

    const changePasswordSubmitHandler = async (ev) => {
        ev.preventDefault();

        if (!changePasswordEnabled) {
            return;
        }

        const responseFn = () => {
            dispatch(authAction.logOutAuth());
            navigate('/sign');
        }

        dispatch(fetchAuth(
            responseFn,
            {
                url: urlEnum.changePassword,
                method: 'POST',
                body: {
                    password: valuePassword,
                    newPassword: valueNewPassword
                }
            }
        ));
    }

    return <div className={classes.content}>
        <div className={classes.userInfo}>
            <h2>Your information</h2>
            <div className={classes.information}>
                <div className={classes.infoBox}>
                    <h3 className={classes.label}>Username</h3>
                    <p>@{userInfo.username}</p>
                </div>
                <div className={classes.infoBox}>
                    <h3 className={classes.label}>Email</h3>
                    <p>{userInfo.email}</p>
                </div>
                <div className={classes.infoBox}>
                    <h3 className={classes.label}>Role</h3>
                    <p className={userInfo.isAdmin && classes.adminUsername}>
                        {userInfo.isAdmin ? 'Admin' : 'User'}
                    </p>
                </div>
                <div className={classes.infoBox}>
                    <h3 className={classes.label}>Registered</h3>
                    <p>{formatDate(userInfo.createdAt)}</p>
                </div>
            </div>
        </div>
        <form className={classes.changePassword} onSubmit={changePasswordSubmitHandler}>
            <h2>Change Password</h2>
            <div className={classes.changePasswordInputs}>
                <Input
                    type='password'
                    value={valuePassword}
                    onInput={passwordChangeHandler}
                    onBlur={passwordBlurHandler}
                    label="Password"
                    placeholder='Enter password...'
                />
                {showErrorMsg(arrayErrorPassword, classes.errorMsg)}
                <Input
                    type='password'
                    value={valueNewPassword}
                    onInput={newPasswordChangeHandler}
                    onBlur={newPasswordBlurHandler}
                    label="New password"
                    placeholder='Enter password...'
                />
                {showErrorMsg(arrayErrorNewPassword, classes.errorMsg)}
            </div>
            <Button
                className={classes.submitBtn}
                disabled={!changePasswordEnabled}
                type='submit'
                padding='8px 40px'
            >
                Change
            </Button>
        </form>
        <div className={classes.topicInfo}>
            <h2>Your topics</h2>
            {topics.length ? <TopicList userInfo={userInfo} topics={topics} /> : <p>You do not have any!</p>}
        </div>
    </div>
}

export default ProfilePage;
