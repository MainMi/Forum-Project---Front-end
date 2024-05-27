import { useDispatch, useSelector } from 'react-redux';
import SearchBar from '../components/Topic/SearchBar';
import TopicList from '../components/Topic/TopicList';
import classes from './TopicPage.module.scss';
import { useEffect, useState } from 'react';
import { fetchCurrentTopic } from '../store/actions/topic-actions';
import SwitchPager from '../components/Topic/SwitchPager';
import { useLocation } from 'react-router-dom';
import ModalTopicInfo from '../components/Topic/Modal/ModalTopicInfo';
import { uiAction, uiConstantIsVisible } from '../store/ui-slice';
import TopicCreate from '../components/Topic/TopicCreate';
import ModalTopicEdit from '../components/Topic/Modal/ModalTopicEdit';
import ModalCommentEdit from '../components/Topic/Comment/ModalCommentEdit';

const TopicPage = () => {
    const dispatch = useDispatch();

    const topicsInfo = useSelector((state) => state.topic);
    const modalTopicInfoStatus = useSelector((state) => state.ui.modalTopicInfo);
    const modalTopicEditStatus = useSelector((state) => state.ui.modalTopicEdit);
    const modalCommentEditStatus = useSelector((state) => state.ui.modalCommentEdit)

    const { topics, pageSize: totalPages, currentPage } = topicsInfo;

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const userInfo = useSelector((state) => state.auth.userInfo)

    useEffect(() => {
        dispatch(fetchCurrentTopic(queryParams, false));
    }, [dispatch, location.search, currentPage]);

    return (
        <div className={classes.content}>
            <h2>Popular topic</h2>
            <SearchBar />
            {topics.length ? <TopicList userInfo={userInfo} topics={topics} /> : <p>Not Found</p>}
            {topics.length ? (
                <SwitchPager
                    totalPages={totalPages}
                    currentPage={currentPage}
                    queryUrl={location.pathname + location.search}
                />
            ) : null}
            {modalTopicInfoStatus && <ModalTopicInfo />}
            {modalTopicEditStatus && <ModalTopicEdit />}
            {modalCommentEditStatus && <ModalCommentEdit prevModal={modalTopicInfoStatus}/>}
            <TopicCreate />
        </div>
        
    );
};

export default TopicPage;
