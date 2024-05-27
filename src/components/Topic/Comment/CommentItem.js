import { useDispatch, useSelector } from 'react-redux';
import Button from '../../../UI/Button';
import { formatDate } from '../../../helper/dateHelper';
import classes from './CommentItem.module.scss'
import { uiAction, uiConstantIsVisible } from '../../../store/ui-slice';
import { commentAction } from '../../../store/comment-slice';
import { deletedCommentToUser } from '../../../store/actions/comment-actions';

const CommentItem = ({ comment }) => {
    const userInfo = useSelector((state) => state.auth.userInfo)
    const currentTopic = useSelector((state) => state.topic.currentTopic)

    const isEdit = userInfo.userId === comment.userId
    const { createdAt, username, text } = comment;
    const date = formatDate(createdAt)
    const classNameButtonBox = `${classes.buttonBox} ${!isEdit ? classes.disabled : ''}`

    const dispatch = useDispatch();

    const editComment = () => {
        dispatch(commentAction.replaceComment({ currentComment: comment.commentId }))
        dispatch(uiAction.enable(uiConstantIsVisible.modalCommentEdit))
    }
    const deleteComment = () => {
        dispatch(deletedCommentToUser(currentTopic, comment.commentId))
    }

    return <div className={classes.commentItem}>
        <div className={classes.userInfo}>
            <span>{date}</span>
            <span>{username}</span>
        </div>
        <p>{text}</p>
        <div className={classNameButtonBox}>
            <Button className={classes.button} onClick={editComment}>Edit</Button>
            <Button className={classes.button} color="red" onClick={deleteComment}>Trash</Button>
        </div>
    </div>
}

export default CommentItem;