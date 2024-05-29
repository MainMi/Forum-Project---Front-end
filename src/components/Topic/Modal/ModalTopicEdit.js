import { useDispatch, useSelector } from 'react-redux';
import classes from './ModalTopicEdit.module.scss'
import { editTopicToUser } from '../../../store/actions/topic-actions';
import Modal from '../../../UI/Modal';
import useInput from '../../../hook/useInput';
import validateFn from '../../../constant/validateFn.enum';
import Input from '../../../UI/Input';
import Textarea from '../../../UI/Textarea';
import Button from '../../../UI/Button';
import { uiAction, uiConstantIsVisible } from '../../../store/ui-slice';

const ModalTopicEdit = () => {
    const currentTopic = useSelector((state) => state.topic.currentTopic);
    const topics = useSelector((state) => state.topic.topics);
    const userInfo = useSelector((state) => state.auth.userInfo);

    let currentTopicInfo = null;
    for (let i = 0; i < topics.length; i++) {
        if (topics[i].topicId === currentTopic) {
            currentTopicInfo = topics[i];
        }
    }

    const { title, text: description } = currentTopicInfo;

    let {
        value: valueTopic,
        isValidInput: isValidTopic,
        valueChangeHandler: topicChangeHandler,
        inputBlurHandler: topicBlurHandler,
    } = useInput(validateFn.isNotEmptyFn, 'Topic', title);

    let {
        value: valueDescription,
        isValidInput: isValidDescription,
        valueChangeHandler: descriptionChangeHandler,
        inputBlurHandler: descriptionBlurHandler,
    } = useInput(validateFn.isNotEmptyFn, 'Description', description);

    const dispatch = useDispatch();
    const isSubmit = isValidDescription & isValidTopic;
    const currentPage = useSelector((state) => state.topic.currentPage);

    const submitHandler = (ev) => {
        ev.preventDefault();
        if (isSubmit) {
            dispatch(editTopicToUser({
                title: valueTopic,
                text: valueDescription
            }, currentTopic, currentPage, userInfo?.isAdmin));
            hiddenModal();
        }
    }

    const hiddenModal = () => {
        dispatch(uiAction.disabled(uiConstantIsVisible.modalTopicEdit));
    }

    return <Modal onHiddenCart={hiddenModal}>
        <div className={classes.content}>
            <form className={classes.createForm} onSubmit={submitHandler}>
                <h2>Edit Topic</h2>
                <Input inputClassName={classes.input} labelWidth={100} label='Title' onChange={topicChangeHandler} onBlur={topicBlurHandler} value={valueTopic}></Input>
                <Textarea label='Description' onChange={descriptionChangeHandler} onBlur={descriptionBlurHandler} value={valueDescription}></Textarea>
                <div className={classes.buttonBox}>
                    <Button padding='8px 30px' color="red" onClick={hiddenModal}>Cancel</Button>
                    <Button padding='8px 30px' disabled={!isSubmit}>Edit</Button>
                </div>
            </form>
        </div>
    </Modal>
}

export default ModalTopicEdit;
