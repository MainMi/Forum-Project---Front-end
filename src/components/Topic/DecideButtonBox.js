import { useDispatch, useSelector } from 'react-redux';
import Button from '../../UI/Button';
import classes from './DecideButtonBox.module.scss'
import { deletedTopicToUser } from '../../store/actions/topic-actions';
import { topicAction } from '../../store/topic-slice';
import { uiAction, uiConstantIsVisible } from '../../store/ui-slice';

const DecideButtonBox = ({ indexTopic }) => {

    const currentPage = useSelector((state) => state.topic.currentPage)

    const dispatch = useDispatch();
    

    const deleteTopic = () => {
        dispatch(deletedTopicToUser(indexTopic, currentPage))
    }

    const selectTopic = () => {
        dispatch(topicAction.replaceTopic({ currentTopic: indexTopic }))
        dispatch(uiAction.enable(uiConstantIsVisible.modalTopicInfo))
    }

    const editTopic = () => {
        dispatch(topicAction.replaceTopic({ currentTopic: indexTopic }))
        dispatch(uiAction.enable(uiConstantIsVisible.modalTopicEdit))
    }

    return <div className={classes.decideButtonBox}>
        <Button className={classes.button} beforeImg='search' onClick={selectTopic}></Button>
        <Button className={classes.button} beforeImg='trash' onClick={deleteTopic}></Button>
        <Button className={classes.button} beforeImg='edit' onClick={editTopic}></Button>
        <Button className={classes.button} beforeImg='people'></Button>
    </div>
}

export default DecideButtonBox;