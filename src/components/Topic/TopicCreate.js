import { useDispatch, useSelector } from 'react-redux';
import Button from '../../UI/Button';
import Input from '../../UI/Input';
import Textarea from '../../UI/Textarea';
import validateFn from '../../constant/validateFn.enum';
import useInput from '../../hook/useInput';
import classes from './TopicCreate.module.scss'
import { addTopicToUser } from '../../store/actions/topic-actions';

const TopicCreate = () => {
    let {
        value: valueTopic,
        isValidInput: isValidTopic,
        valueChangeHandler: topicChangeHandler,
        inputBlurHandler: topicBlurHandler,
        resetFn: resetTopic
    } = useInput(validateFn.isNotEmptyFn, 'Topic');

    let {
        value: valueDescription,
        isValidInput: isValidDescription,
        valueChangeHandler: descriptionChangeHandler,
        inputBlurHandler: descriptionBlurHandler,
        resetFn: resetDescription
    } = useInput(validateFn.isNotEmptyFn, 'Description');

    const dispatch = useDispatch();
    const isSubmit = isValidDescription & isValidTopic;
    const currentPage = useSelector((state) => state.topic.currentPage);
    const userInfo = useSelector((state) => state.auth.userInfo);

    const submitHandler = (ev) => {
        ev.preventDefault();
        if (isSubmit) {
            dispatch(addTopicToUser({
                title: valueTopic,
                text: valueDescription,
            }, currentPage, userInfo?.isAdmin));
            resetTopic();
            resetDescription();
        }
    }

    return <form className={classes.createForm} onSubmit={submitHandler}>
        <h2>Create Topic</h2>
        <Input inputClassName={classes.input} labelWidth={100} label='Title' value={valueTopic} onChange={topicChangeHandler} onBlur={topicBlurHandler}></Input>
        <Textarea label='Description' value={valueDescription} onChange={descriptionChangeHandler} onBlur={descriptionBlurHandler} ></Textarea>
        <div className={classes.buttonBox}>
            <Button padding='8px 30px' disabled={!isSubmit}>Create</Button>
        </div>
    </form>
}

export default TopicCreate;
