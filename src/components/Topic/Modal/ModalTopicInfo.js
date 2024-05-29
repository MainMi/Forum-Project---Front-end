import { useDispatch, useSelector } from 'react-redux';
import Modal from '../../../UI/Modal';
import CommentList from '../Comment/CommentList';
import classes from './ModalTopicInfo.module.scss'
import { uiAction, uiConstantIsVisible } from '../../../store/ui-slice';
import { useEffect } from 'react';
import { fetchCurrentTopicComment, fetchCurrentTopicCommentAdmin } from '../../../store/actions/comment-actions';
import { formatDate } from '../../../helper/dateHelper';
import CommentCreate from '../Comment/CommentCreate';
import IconPopup from '../../../UI/IconPopup';

const ModalTopicInfo = () => {
    const currentTopic = useSelector((state) => state.topic.currentTopic);
    const userInfo = useSelector((state) => state.auth.userInfo);
    const isAdmin = userInfo?.isAdmin;

    const dispath = useDispatch();
    const isVisibleModal = () => dispath(uiAction.toggle(
        uiConstantIsVisible.modalTopicInfo
    ));

    useEffect(() => {
        if (currentTopic) {
            if (isAdmin) {
                dispath(fetchCurrentTopicCommentAdmin(currentTopic, { skipDeleted: false }, false))
            } else {
                dispath(fetchCurrentTopicComment(currentTopic, '', false))
            }
        }
    }, [dispath, currentTopic, isAdmin])

    const {
        topic: topicInfo = {},
        comments = [],
    } = useSelector((state) => (state.comment));

    const { title = '', createdAt = '', text = '', updatedAt, createdByUser, editedByUser, deletedByUser } = topicInfo;

    return <Modal onHiddenCart={isVisibleModal}>
        <div className={classes.modalBox}>
            <div className={classes.topicInfo}>
                <h2 className={classes.title}>{title}</h2>
                <p className={classes.text}>{text}</p>
                <div className={classes.userInfo}>
                    <p className={ createdByUser?.isAdmin && classes.adminUsername }>
                        {createdByUser?.username}</p>
                    <p>
                        { editedByUser && !deletedByUser && <IconPopup
                                image={editedByUser.isAdmin ? 'editAdmin' : 'edit' }
                                tooltipStyles={{ width: '150px' }}
                                marginRight='4px'
                            >
                                <p className={editedByUser.isAdmin && classes.adminUsername}>
                                    {editedByUser.username}
                                </p>
                                <p>{formatDate(updatedAt)}</p>
                            </IconPopup> }
                        { deletedByUser && <IconPopup
                                image={deletedByUser.isAdmin ? 'trashAdmin' : 'trash' }
                                tooltipStyles={{ width: '150px' }}
                                marginRight='4px'
                            >
                                <p className={deletedByUser.isAdmin && classes.adminUsername}>
                                    {deletedByUser.username}
                                </p>
                                <p>{formatDate(updatedAt)}</p>
                            </IconPopup> }
                        {formatDate(createdAt)}
                    </p>
                </div>
            </div>
            { !!comments.length && <CommentList comments={comments}/> }
            { userInfo?.userId && !deletedByUser && <CommentCreate currentTopic={currentTopic} comments={comments}/> }
        </div>
    </Modal>
}

export default ModalTopicInfo;
