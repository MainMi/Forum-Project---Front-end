import { useDispatch, useSelector } from 'react-redux';
import classes from './ModalCommentToEdit.module.scss'
import useInput from '../../../hook/useInput';
import validateFn from '../../../constant/validateFn.enum';
import { editCommentToUser } from '../../../store/actions/comment-actions';
import { uiAction, uiConstantIsVisible } from '../../../store/ui-slice';
import Modal from '../../../UI/Modal';
import Textarea from '../../../UI/Textarea';
import Button from '../../../UI/Button';

const ModalCommentEdit = () => {
    const currentComment = useSelector((state) => state.comment.currentComment)
    const comments = useSelector((state) => state.comment.comments)
    console.log(comments, currentComment);
    let currentCommentInfo = {};
    for (let i = 0; i < comments.length; i++) {
        if (comments[i].commentId === currentComment) {
            currentCommentInfo = comments[i];
        }
    }

    const { text: description = '' } = currentCommentInfo;

    let {
        value: valueDescription,
        isValidInput: isValidDescription,
        arrayError: arrayErrorDescription,
        valueChangeHandler: descriptionChangeHandler,
        inputBlurHandler: descriptionBlurHandler,
    } = useInput(validateFn.isNotEmptyFn, 'Description', description);

    const dispatch = useDispatch();

    const isSubmit = isValidDescription;

    const currentTopic = useSelector((state) => state.topic.currentTopic)

    const submitHandler = (ev) => {
        ev.preventDefault();
        if (isSubmit) {
            dispatch(editCommentToUser({
                text: valueDescription
            }, currentTopic, currentComment))
            hiddenModal();
        }
    }

    const hiddenModal = () => {
        dispatch(uiAction.disabled(uiConstantIsVisible.modalCommentEdit))
    }

    return <Modal onHiddenCart={hiddenModal}>
        <div className={classes.content}>
            <form className={classes.createForm} onSubmit={submitHandler}>
                <h2>Edit Comment</h2>
                <Textarea label='Description' onChange={descriptionChangeHandler} onBlur={descriptionBlurHandler} value={valueDescription}></Textarea>
                <div className={classes.buttonBox}>
                    <Button padding='8px 30px' color="red" onClick={hiddenModal}>Cancel</Button>
                    <Button padding='8px 30px' disabled={!isSubmit}>Edit</Button>
                </div>
            </form>
        </div>
    </Modal>
}

export default ModalCommentEdit;