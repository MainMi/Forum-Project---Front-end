import classes from './Button.module.scss'
import buttonsImage from '../static/image/buttonIcons'

const Button = (props) => {
    let {
        type = 'border',
        disabled = false,
        active = false,
        size = 16,
        beforeImg = false,
        afterImg = false,
        className = '',
        onClick = () => {},
        color = '',
        ...otherStyles
    } = props;

    if (beforeImg) {
        beforeImg = beforeImg in buttonsImage ? buttonsImage[beforeImg] : beforeImg
    }

    if (afterImg) {
        afterImg = afterImg in buttonsImage ? buttonsImage[afterImg] : afterImg
    }

    const newClassName = `${classes.button} ${type === 'noBorder' ? classes.noBorder : ''} ${active ? classes.active : ''} ${className} ${classes[color]}`;

    const imgSizeStyle = { width: `${size}px`, height: `${size}px`};

    return <button className={newClassName} disabled={disabled} onClick={onClick} style={{ fontSize: `${size}px`, ...otherStyles}}>
        {beforeImg && <img src={beforeImg} style={imgSizeStyle} alt='bImg'/>}
        {!props.children || <div>{props.children}</div>}
        {afterImg && <img src={afterImg} style={imgSizeStyle} alt='aImg'/>}
    </button>
}

export default Button;
