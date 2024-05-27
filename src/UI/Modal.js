import { Fragment } from 'react';
import classes from './Modal.module.css';
import ReactDOM from 'react-dom'

const Backdrop = (props) => {
    return <div className={classes.backdrop} onClick={props.onHiddenCart}></div>
}

const ModalOverlays = (props) => {
    return <div className={classes.modal}>
            {props.children}
        </div>
}
const overlays = document.getElementById('overlays');
const Modal = (props) => {
    return <>
        {ReactDOM.createPortal(<div className={classes.content}>
                <ModalOverlays>{props.children}</ModalOverlays>, overlays
            <Backdrop onHiddenCart={props.onHiddenCart}/>
        </div>, overlays)}
    </>
        
}
export default Modal;