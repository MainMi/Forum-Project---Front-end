import { formatDate } from '../../helper/dateHelper';
import { truncateString } from '../../helper/stringHelper';
import classes from './TopicItem.module.scss'
import { topicAction } from '../../store/topic-slice';
import { uiAction, uiConstantIsVisible } from '../../store/ui-slice';
import { useDispatch } from 'react-redux';
import IconPopup from '../../UI/IconPopup';

const TopicItem = ({ topic }) => {
    const { title, createdAt, updatedAt, text, createdByUser, editedByUser, deletedByUser } = topic;
    const date = formatDate(createdAt);
    const userText = truncateString(text);

    const dispatch = useDispatch();
    const selectTopic = () => {
        dispatch(topicAction.replaceTopic({ currentTopic: topic.topicId }));
        dispatch(uiAction.enable(uiConstantIsVisible.modalTopicInfo));
    }

    const itemClasses = [classes.topicItem];
    if (deletedByUser) {
        itemClasses.push(classes.topicDeleted);
    }

    return <div className={itemClasses.join(' ')} onClick={selectTopic}>
        <h4>{title}</h4>
        <div>{userText}</div>
        <div className={classes.userInfo}>
            <span>
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
                {date}
            </span>
            <span className={createdByUser.isAdmin && classes.adminUsername}>{createdByUser.username}</span>
        </div>
    </div>
}

export default TopicItem;
