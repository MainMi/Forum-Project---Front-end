import { useSelector } from 'react-redux';
import Notification from '../../../UI/Notification'

const NotificationStatus = props => {

    const { status, message, title, isShow } = useSelector((state) => state.notification);
    return <Notification status={status} show={isShow}>
        <h3>{title}</h3>
        <p>{message}</p>
    </Notification>
}

export default NotificationStatus;