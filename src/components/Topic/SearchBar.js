import { useDispatch, useSelector } from 'react-redux';
import Button from '../../UI/Button';
import Input from '../../UI/Input';
import classes from './SearchBar.module.scss'
import { fetchCurrentTopic, fetchCurrentTopicAdmin } from '../../store/actions/topic-actions';
import useInput from '../../hook/useInput';

const SearchBar = () => {
    const dispatch = useDispatch();

    const inputStyle = { borderRadius: '10px', height: '40px' };
    const userInfo = useSelector((state) => state.auth.userInfo);
    const isAdmin = userInfo?.isAdmin;

    const searchTopicData = (ev) => {
        ev.preventDefault();

        const currentPath = window.location.pathname;
        const queryData = { currentPage: 1 };

        if (valueSearchText) {
            queryData.text = valueSearchText;
            const queryParams = new URLSearchParams(queryData);
            const url = `${currentPath}?${queryParams.toString()}`;

            window.history.replaceState(null, '', url);
        } else {
            window.history.replaceState(null, '', currentPath);
        }

        if (isAdmin) {
            queryData.skipDeleted = !isAdmin;
            dispatch(fetchCurrentTopicAdmin(queryData, false));
        } else {
            dispatch(fetchCurrentTopic(queryData));
        }
    }

    let {
        value: valueSearchText,
        valueChangeHandler: searchTextChangeHandler,
        inputBlurHandler: searchTextBlurHandler,
    } = useInput(false, 'SearchText');

    return <form onSubmit={searchTopicData} className={classes.searchBar}>
        <Input type='text'
                value={valueSearchText}
                onInput={searchTextChangeHandler}
                onBlur={searchTextBlurHandler}
                placeholder='Enter title...'
                labelWidth={100}
                inputClassName={classes.searchInput} style={inputStyle}></Input>
        <Button beforeImg='search' type='submit' className={classes.searchButton}></Button>
    </form>
}

export default SearchBar;
