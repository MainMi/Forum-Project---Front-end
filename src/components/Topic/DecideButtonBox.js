import { useDispatch, useSelector } from 'react-redux';
import Button from '../../UI/Button';
import classes from './DecideButtonBox.module.scss'
import { deletedTopicToUser } from '../../store/actions/topic-actions';
import { topicAction } from '../../store/topic-slice';
import { uiAction, uiConstantIsVisible } from '../../store/ui-slice';

const DecideButtonBox = ({ indexTopic }) => {
    const currentPage = useSelector((state) => state.topic.currentPage);
    const userInfo = useSelector((state) => state.auth.userInfo);

    const dispatch = useDispatch();

    const deleteTopic = () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this topic?");
        if (confirmDelete) {
            dispatch(deletedTopicToUser(indexTopic, currentPage, userInfo?.isAdmin));
        }
    }

    const editTopic = () => {
        dispatch(topicAction.replaceTopic({ currentTopic: indexTopic }));
        dispatch(uiAction.enable(uiConstantIsVisible.modalTopicEdit));
    }

    return <div className={classes.decideButtonBox}>
        <Button className={classes.button} beforeImg='trash' onClick={deleteTopic}></Button>
        <Button className={classes.button} beforeImg='edit' onClick={editTopic}></Button>
    </div>
}

export default DecideButtonBox;
