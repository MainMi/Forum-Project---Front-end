import { Fragment } from 'react';
import classes from './Notification.module.css'
import ReactDOM from 'react-dom'

const NotificationOverlays = (props) => {
    const status = !props.status ? '' : classes[props.status];
    const show = props.show ? '' : classes.show;
    const className = `${classes.modal} ${status} ${show}`;

    return <div className={className}>
            <div className={classes.content}>{props.children}</div>
    </div>
}

const overlays = document.getElementById('overlays');
const Notification = (props) => {
    return <Fragment>
        {ReactDOM.createPortal(<div className={classes.notificationBox}>
            <NotificationOverlays status={props.status} show={props.show}>{props.children}</NotificationOverlays>
            </div>, overlays)}
    </Fragment>
}

export default Notification;
