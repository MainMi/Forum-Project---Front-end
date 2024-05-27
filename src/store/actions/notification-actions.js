import { delayHideNotification, notificationAction } from "../notification-slice"


export const createTempNotification = (notificationData, delayToHidden = 2000) => {
    return async (dispatch) => {
        dispatch(notificationAction.changeNotification(
            {isShow: true, ...notificationData}
        ))
        dispatch(delayHideNotification(delayToHidden))
    }
}