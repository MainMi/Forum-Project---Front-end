import { useDispatch, useSelector } from 'react-redux';
import Button from '../../../UI/Button';
import { formatDate } from '../../../helper/dateHelper';
import classes from './CommentItem.module.scss'
import { uiAction, uiConstantIsVisible } from '../../../store/ui-slice';
import { commentAction } from '../../../store/comment-slice';
import { deletedCommentToUser } from '../../../store/actions/comment-actions';
import IconPopup from '../../../UI/IconPopup';

const CommentItem = ({ comment }) => {
    const userInfo = useSelector((state) => state.auth.userInfo);
    const currentTopic = useSelector((state) => state.topic.currentTopic);
    const topics = useSelector((state) => state.topic.topics);

    const isAdmin = userInfo.isAdmin;

    const currentTopicData = topics.find(topic => topic.topicId === currentTopic);
    const { createdAt, text, createdByUser, editedByUser, updatedAt, deletedByUser } = comment;
    const isEdit = (userInfo.userId === createdByUser.userId || isAdmin) && !currentTopicData.deletedByUser && !deletedByUser;

    const date = formatDate(createdAt)
    const classNameButtonBox = `${classes.buttonBox} ${!isEdit ? classes.disabled : ''}`

    const dispatch = useDispatch();

    const editComment = () => {
        dispatch(commentAction.replaceComment({ currentComment: comment.commentId }))
        dispatch(uiAction.enable(uiConstantIsVisible.modalCommentEdit))
    }

    const deleteComment = () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this comment?");
        if (confirmDelete) {
            dispatch(deletedCommentToUser(currentTopic, comment.commentId, isAdmin));
        }
    }

    const itemClasses = [classes.commentItem];
    if (deletedByUser) {
        itemClasses.push(classes.commentDeleted);
    }

    return <div className={itemClasses.join(' ')}>
        <div className={classes.userInfo}>
            <span>
                {date}
                { editedByUser && !deletedByUser && <IconPopup
                        image={editedByUser.isAdmin ? 'editAdmin' : 'edit' }
                        tooltipStyles={{ width: '150px' }}
                        marginLeft='4px'
                    >
                        <p className={editedByUser.isAdmin && classes.adminUsername}>
                            {editedByUser.username}
                        </p>
                        <p>{formatDate(updatedAt)}</p>
                    </IconPopup> }
                { deletedByUser && <IconPopup
                        image={deletedByUser.isAdmin ? 'trashAdmin' : 'trash' }
                        tooltipStyles={{ width: '150px' }}
                        marginLeft='4px'
                    >
                        <p className={deletedByUser.isAdmin && classes.adminUsername}>
                            {deletedByUser.username}
                        </p>
                        <p>{formatDate(updatedAt)}</p>
                    </IconPopup> }
            </span>
            <span className={ createdByUser.isAdmin && classes.adminUsername }>
                {createdByUser.username}
            </span>
        </div>
        <p className={classes.text}>{text}</p>
        <div className={classNameButtonBox}>
            <Button className={classes.button} onClick={editComment}>Edit</Button>
            <Button className={classes.button} color="red" onClick={deleteComment}>Trash</Button>
        </div>
    </div>
}

export default CommentItem;
