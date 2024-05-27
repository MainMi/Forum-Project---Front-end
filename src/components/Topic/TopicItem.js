import { formatDate } from '../../helper/dateHelper';
import { truncateString } from '../../helper/stringHelper';
import classes from './TopicItem.module.scss'
import { topicAction } from '../../store/topic-slice';
import { uiAction, uiConstantIsVisible } from '../../store/ui-slice';
import { useDispatch } from 'react-redux';


const TopicItem = ({ topic }) => {
    const { title, updatedAt, username, text } = topic;
    const date = formatDate(updatedAt)
    const userText = truncateString(text)

    const dispatch = useDispatch();
    const selectTopic = () => {
        dispatch(topicAction.replaceTopic({ currentTopic: topic.topicId }))
        dispatch(uiAction.enable(uiConstantIsVisible.modalTopicInfo))
    }
    
    return <div className={classes.topicItem} onClick={selectTopic}>
        <h4>{title}</h4>
        <div>{userText}</div>
        <div className={classes.userInfo}>
            <span>{date}</span>
            <span>{username}</span>
        </div>
    </div>
}

export default TopicItem;