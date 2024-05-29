import { useState } from 'react';
import classes from './Input.module.scss'
import openEyes from '../static/image/inputIcons/openEyes.svg'
import closeEyes from '../static/image/inputIcons/closeEyes.svg'

const Input = (props) => {
    const {
        label,
        placeholder = '',
        id,
        error = '',
        size = 14,
        labelWidth = 50,
        type = 'text',
        style,
        labelClassName = '',
        labelBoxClassName = '',
        inputClassName = '', 
        ...otherProps
    } = props;

    const className = `${classes.input} ${error ? classes.error : ''}`
    const styleSize = { fontSize: `${size}px`};
    const inputSize = { ...styleSize, height: `${size + 18}px`, ...style};
    const boxStyle = { width: `${labelWidth}%`}

    const [ typeInput, setTypeInput ] = useState(type);
    const isPassword = typeInput === 'password';

    const onHiddenText = () => setTypeInput(isPassword ? 'text' : 'password');

    return <div className={`${classes.labelBox} ${labelBoxClassName}`} style={boxStyle}>
        <label htmlFor={id} style={styleSize} className={labelClassName}>{label}</label>
        <input
            id={id}
            placeholder={placeholder}
            type={typeInput}
            className={`${className} ${inputClassName}`}
            style={inputSize}
            {...otherProps}
        >
        </input>
        {type === 'password' && <img src={ isPassword ? openEyes : closeEyes } onClick={onHiddenText} alt='c'></img>}
        {!!error.lenght || <div className={classes.error}>{error}</div>}
    </div>
}

export default Input;
