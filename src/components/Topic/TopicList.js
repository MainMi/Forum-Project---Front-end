import classes from './TopicList.module.scss'
import TopicItem from './TopicItem';
import DecideButtonBox from './DecideButtonBox';

const TopicList = ({ topics, userInfo, buttonBox = true }) => {

    

    return <div className={classes.topicList}>
        {topics.map((vl, index) => {
            const isTopicOwner = userInfo.userId === vl.userId || userInfo.isAdmin 
            return <div className={classes.topicBox} key={vl.topicId}>
                <TopicItem topic={vl} key={index}></TopicItem>
                {(buttonBox && isTopicOwner)  && <DecideButtonBox indexTopic={vl.topicId}/>}
            </div>
        })}
    </div>
}

export default TopicList;