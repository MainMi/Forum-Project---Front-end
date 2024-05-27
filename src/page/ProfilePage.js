import { useDispatch, useSelector } from 'react-redux';
import TopicList from '../components/Topic/TopicList';
import classes from './ProfilePage.module.scss'
import { fetchCurrentTopic } from '../store/actions/topic-actions';

const ProfilePage = () => {

    const userInfo = useSelector((state) => state.auth.userInfo)
    
    const topics = useSelector((state) => state.topic.topics)
    

    const dispatch = useDispatch();

    if (!topics.length) {
        dispatch(fetchCurrentTopic())
    }

    if (!userInfo.userId) {
        return
    }

    return <div className={classes.content}>
        <div className={classes.userInfo}>
            <h2>Your information</h2>
            <div className={classes.information}>
                <div className={classes.infoBox}>
                    <h3 className={classes.label}>Username</h3>
                    <p>@{userInfo.username}</p>
                </div>
                <div className={classes.infoBox}>
                    <h3 className={classes.label}>Email</h3>
                    <p>{userInfo.email}</p>
                </div>
            </div>
        </div>
        <div className={classes.topicInfo}>
            <h2>Your comments</h2>
            <TopicList topics={topics} userInfo={userInfo} buttonBox={false} />
        </div>
        
    </div>
}

export default ProfilePage;