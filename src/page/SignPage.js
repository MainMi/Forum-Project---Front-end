import Logo from '../UI/Logo';
import classes from './SignPage.module.scss'
import useInput from '../hook/useInput'
import validateFn from '../constant/validateFn.enum';
import { Link, useSearchParams } from 'react-router-dom';
import { showErrorMsg } from '../error/error.validate.msg';
import Button from '../UI/Button';
import Input from '../UI/Input';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLogin, fetchRegister } from '../store/actions/auth-actions';

import { useNavigate } from 'react-router-dom';

const SignPage = () => {
    const navigate = useNavigate();
    const userInfo = useSelector((state) => state.auth.userInfo);
    if (userInfo?.userId) {
        navigate('/topic');
    }

    let {
        value: valuePassword,
        isValidInput: isValidPassword,
        arrayError: arrayErrorPassword,
        valueChangeHandler: passwordChangeHandler,
        inputBlurHandler: passwordBlurHandler,
    } = useInput((value) => {
        const arrValidEmpty = validateFn.isNotEmptyFn(value)
        const arrValidPassword = validateFn.isPasswordFn(value);
        return [...arrValidEmpty, ...arrValidPassword]
    }, 'Password');

    let {
        value: valueEmail,
        isValidInput: isValidEmail,
        arrayError: arrayErrorEmail,
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
    } = useInput((value) => {
        const arrValidEmpty = validateFn.isNotEmptyFn(value)
        const arrValidEmail = validateFn.isEmailFn(value);
        return [...arrValidEmpty, ...arrValidEmail]
    }, 'Email');

    let {
        value: valueUsername,
        isValidInput: isValidUsername,
        arrayError: arrayErrorUsername,
        valueChangeHandler: usernameChangeHandler,
        inputBlurHandler: usernameBlurHandler,
    } = useInput(validateFn.isNotEmptyFn, 'Username');

    const [searchParam] = useSearchParams();
    const isLogin = !searchParam.get('mode') || searchParam.get('mode') === 'signIn';
    const containerClass = `${classes.content} ${isLogin ? classes.signIn : ''}`;

    const loginInActive = isValidUsername && isValidPassword
    const registerInActive = loginInActive && isValidEmail && isValidUsername

    const dispatch = useDispatch();
    const registerSubmitHandler = (ev) => {
        ev.preventDefault()
        if (!registerInActive) {
            return;
        }
        dispatch(fetchRegister({
            username: valueUsername,
            email: valueEmail,
            password: valuePassword
        }))
    }
    const loginSubmitHandler = async (ev) => {
        ev.preventDefault()
        if (!loginInActive) {
            return;
        }
        dispatch(fetchLogin({ username: valueUsername, password: valuePassword }));
    }

    return <div className={containerClass}>
        <div className={classes.sign}>
            <form className={`${classes.signForm} ${classes.signInBx}`} onSubmit={loginSubmitHandler}>
                <h2>Login</h2>
                <Input
                    type='text'
                    onInput={usernameChangeHandler}
                    onBlur={usernameBlurHandler}
                    label="Username"
                    placeholder='Enter username...' />
                {showErrorMsg(arrayErrorUsername, classes.errorMsg)}
                <Input
                    type='password'
                    value={valuePassword}
                    onInput={passwordChangeHandler}
                    onBlur={passwordBlurHandler}
                    label="Password"
                    placeholder='Enter password...'
                />
                {showErrorMsg(arrayErrorPassword, classes.errorMsg)}
                <Button className={classes.submitBtn} disabled={!loginInActive} type='submit' padding='8px 40px'>Login</Button>
                <div className={classes.changeTextBox}>
                    <p>You dont have account</p>
                    <Link to={'/sign?mode=signUp'}>Sign Up</Link>
                </div>
            </form>
            <form className={`${classes.signForm} ${classes.signUpBx}`} onSubmit={registerSubmitHandler}>
                <h2>Register</h2>
                <Input
                    type='text'
                    onInput={usernameChangeHandler}
                    onBlur={usernameBlurHandler}
                    label="Username"
                    placeholder='Enter username...' />
                {showErrorMsg(arrayErrorUsername, classes.errorMsg)}
                <Input
                    type='text'
                    value={valueEmail}
                    onInput={emailChangeHandler}
                    onBlur={emailBlurHandler}
                    label="Email"
                    placeholder='Enter email...'
                />
                {showErrorMsg(arrayErrorEmail, classes.errorMsg)}
                <Input
                    type='password'
                    value={valuePassword}
                    onInput={passwordChangeHandler}
                    onBlur={passwordBlurHandler}
                    label="Password"
                    placeholder='Enter password...'
                />
                {showErrorMsg(arrayErrorPassword, classes.errorMsg)}
                <Button className={classes.submitBtn} disabled={!registerInActive} type='submit' color='red' padding='8px 40px'>Register</Button>
                <div className={classes.changeTextBox}>
                    <p>You already have account </p>
                    <Link to={'/sign?mode=signIn'}>Sign In</Link>
                </div>
            </form>
            <div className={classes.imgBox}>
                <Logo width={280} color='#E7E9ED' />
                <p>We make your day perfect</p>
            </div>
        </div>
    </div>
}

export default SignPage;
