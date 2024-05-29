import { useDispatch, useSelector } from 'react-redux';
import TopicList from '../components/Topic/TopicList';
import classes from './ProfilePage.module.scss'
import { fetchCurrentTopic } from '../store/actions/topic-actions';
import { useEffect } from 'react';
import { formatDate } from '../helper/dateHelper';

const ProfilePage = () => {
    const dispatch = useDispatch();
    const userInfo = useSelector((state) => state.auth.userInfo);
    const topics = useSelector((state) => state.topic.topics);

    const userId = userInfo?.userId;

    useEffect(() => {
        if (userId) {
            dispatch(fetchCurrentTopic({ userId }, false));
        }
    }, [userId, dispatch]);

    if (!userId) {
        return;
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
                <div className={classes.infoBox}>
                    <h3 className={classes.label}>Role</h3>
                    <p className={userInfo.isAdmin && classes.adminUsername}>
                        {userInfo.isAdmin ? 'Admin' : 'User'}
                    </p>
                </div>
                <div className={classes.infoBox}>
                    <h3 className={classes.label}>Registered</h3>
                    <p>{formatDate(userInfo.createdAt)}</p>
                </div>
            </div>
        </div>
        <div className={classes.topicInfo}>
            <h2>Your topics</h2>
            {topics.length ? <TopicList userInfo={userInfo} topics={topics} /> : <p>You do not have any!</p>}
        </div>
    </div>
}

export default ProfilePage;
