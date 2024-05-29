import { useDispatch, useSelector } from 'react-redux';
import Button from '../../../UI/Button';
import Textarea from '../../../UI/Textarea';
import validateFn from '../../../constant/validateFn.enum';
import useInput from '../../../hook/useInput';
import classes from './CommentCreate.module.scss'
import { addCommentToUser } from '../../../store/actions/comment-actions';

const CommentCreate = ({ currentTopic, comments }) => {
    const userInfo = useSelector((state) => state.auth.userInfo);
    const isAdmin = userInfo?.isAdmin;

    let {
        value: valueDescription,
        isValidInput: isValidDescription,
        valueChangeHandler: descriptionChangeHandler,
        inputBlurHandler: descriptionBlurHandler,
        resetFn: resetDescription
    } = useInput(validateFn.isNotEmptyFn, 'Description');

    const dispatch = useDispatch();
    const isSubmit = isValidDescription;
    const submitHandler = (ev) => {
        ev.preventDefault();
        if (isSubmit) {
            dispatch(addCommentToUser({
                text: valueDescription
            }, currentTopic, isAdmin));
            resetDescription();
        }
    }

    return <form className={classes.createForm} onSubmit={submitHandler}>
        <h2>Create Comment</h2>
        <Textarea label='Description' value={valueDescription} onChange={descriptionChangeHandler} onBlur={descriptionBlurHandler} ></Textarea>
        <div className={classes.buttonBox}>
            <Button padding='8px 30px' disabled={!isSubmit}>Create</Button>
        </div>
    </form>
}

export default CommentCreate;
