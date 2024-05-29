import classes from './TopicList.module.scss'
import TopicItem from './TopicItem';
import DecideButtonBox from './DecideButtonBox';

const TopicList = ({ topics, userInfo, buttonBox = true, isAdmin = false }) => {
    return <div className={classes.topicList}>
        {topics.map((vl, index) => {
            const isTopicOwner = userInfo.userId === vl.createdByUser.userId || userInfo?.isAdmin;
            const isTopicDeleted = !!vl.deletedByUser; 
            return <div className={classes.topicBox} key={vl.topicId}>
                <TopicItem topic={vl} key={index}></TopicItem>
                {(buttonBox && isTopicOwner && !isTopicDeleted)  && <DecideButtonBox indexTopic={vl.topicId} isAdmin={isAdmin}/>}
            </div>
        })}
    </div>
}

export default TopicList;
