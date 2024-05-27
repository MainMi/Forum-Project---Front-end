import { useDispatch } from 'react-redux';
import Button from '../../UI/Button';
import Input from '../../UI/Input';
import classes from './SearchBar.module.scss'
import { fetchCurrentTopic } from '../../store/actions/topic-actions';
import useInput from '../../hook/useInput';

const SearchBar = () => {

    const dispatch = useDispatch();

    const inputStyle = { borderRadius: '10px', height: '40px' }

    const searchTopicData = (ev) => {
        const queryData = {text: valueSearchText}
        ev.preventDefault()

        const queryParams = new URLSearchParams(queryData).toString();

        const currentPath = window.location.pathname;

        const url = `${currentPath}?${queryParams}`

        window.history.replaceState(null, '', url);

        
        dispatch(fetchCurrentTopic(queryData));
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
                placeholder='Enter title...'labelWidth={100}
                inputClassName={classes.searchInput} style={inputStyle}></Input>
        <Button beforeImg='search' type='submit' className={classes.searchButton}></Button>
    </form>
}

export default SearchBar;