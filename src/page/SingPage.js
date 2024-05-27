import Logo from '../UI/Logo';
import classes from './SingPage.module.scss'
import useInput from '../hook/useInput'
import validateFn from '../constant/validateFn.enum';
import { Link, useSearchParams } from 'react-router-dom';
import { showErrorMsg } from '../error/error.validate.msg';
import Button from '../UI/Button';
import Input from '../UI/Input';
import { useDispatch } from 'react-redux';
import { fetchLogin, fetchRegister } from '../store/actions/auth-actions';

const SingPage = () => {

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
        value: valueFullname,
        isValidInput: isValidFullname,
        arrayError: arrayErrorFullname,
        valueChangeHandler: fullnameChangeHandler,
        inputBlurHandler: fullnameBlurHandler,
    } = useInput(validateFn.isNotEmptyFn, 'Fullname');
    let {
        value: valueUsername,
        isValidInput: isValidUsername,
        arrayError: arrayErrorUsername,
        valueChangeHandler: usernameChangeHandler,
        inputBlurHandler: usernameBlurHandler,
    } = useInput(validateFn.isNotEmptyFn, 'Username');

    let {
        value: valuePhone,
        isValidInput: isValidPhone,
        arrayError: arrayErrorPhone,
        valueChangeHandler: phoneChangeHandler,
        inputBlurHandler: phoneBlurHandler,
    } = useInput((value) => {
        return value.length ? validateFn.isPhoneFn(value) : []
    }, 'Phone');

    const [searchParam] = useSearchParams();
    const isLogin = searchParam.get('mode') === 'singIn';
    const containerClass = `${classes.content} ${isLogin ? classes.singIn : ''}`;

    const loginInActive = isValidUsername && isValidPassword
    const validPhone = valuePhone.length === 0 ? true : isValidPhone;
    const registerInActive = loginInActive && isValidEmail && isValidUsername && validPhone && isValidFullname

    const dispatch = useDispatch();
    // TODO Replace data send, add fullname and option for login
    const registerSubmitHandler = (ev) => {
        ev.preventDefault()
        if (!registerInActive) {
            return;
        }
        dispatch(fetchRegister({
            // fullname: valueFullname,
            username: valueUsername,
            email: valueEmail,
            // phone: valuePhone.length ? valuePhone : undefined, 
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
        <div className={classes.sing}>
            <form className={`${classes.singForm} ${classes.singInBx}`} onSubmit={loginSubmitHandler}>
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
                    <Link to={'/sing?mode=singUp'}>SingUp</Link>
                </div>
            </form>
            <form className={`${classes.singForm} ${classes.singUpBx}`} onSubmit={registerSubmitHandler}>
                <h2>Register</h2>
                <Input
                    type='text'
                    onInput={fullnameChangeHandler}
                    onBlur={fullnameBlurHandler}
                    label="Fullname"
                    placeholder='Enter fullname...' />
                {showErrorMsg(arrayErrorFullname, classes.errorMsg)}
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
                    type='phone'
                    onInput={phoneChangeHandler}
                    onBlur={phoneBlurHandler}
                    label="Phone"
                    placeholder='Enter phone(not required)...'
                />
                {showErrorMsg(arrayErrorPhone, classes.errorMsg)}
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
                    <Link to={'/sing?mode=singIn'}>SingIn</Link>
                </div>
            </form>
            <div className={classes.imgBox}>
                <Logo width={280} color='#E7E9ED' />
                <p>We make your day perfect</p>
            </div>
        </div>
    </div>
}

export default SingPage;