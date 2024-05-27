import { useDispatch, useSelector } from 'react-redux';
import Modal from '../../../UI/Modal';
import CommentList from '../Comment/CommentList';
import classes from './ModalTopicInfo.module.scss'
import { uiAction, uiConstantIsVisible } from '../../../store/ui-slice';
import { useEffect } from 'react';
import { fetchCurrentTopicComment } from '../../../store/actions/comment-actions';
import { formatDate } from '../../../helper/dateHelper';
import CommentCreate from '../Comment/CommentCreate';

const ModalTopicInfo = () => {
    const currentTopic = useSelector((state) => state.topic.currentTopic)
    const dispath = useDispatch();
    const isVisibleModal = () => dispath(uiAction.toggle(
        uiConstantIsVisible.modalTopicInfo
    ));
    useEffect(() => {
        if (currentTopic) {
            dispath(fetchCurrentTopicComment(currentTopic, '', false))
        }
    }, [dispath, currentTopic])
    
    const {
        topic: topicInfo = {},
        comments = [],
    } = useSelector((state) => (state.comment))

    const { title = '', createdAt = '', username = '', text = '' } = topicInfo;

    return <Modal onHiddenCart={isVisibleModal}>
        <div className={classes.modalBox}>
            <div className={classes.titleBox}>
                <h2>{title}</h2>
            </div>
            <div className={classes.topicInfo}>
                <h2>Topic info</h2>
                <p>{text}</p>
                <div className={classes.userInfo}>
                    <p>{username}</p>
                    <p>{formatDate(createdAt)}</p>
                </div>
            </div>
            {!!comments.length && <CommentList comments={comments}/>}
            <CommentCreate currentTopic={currentTopic} comments={comments}/>
        </div>
    </Modal>
}

export default ModalTopicInfo;