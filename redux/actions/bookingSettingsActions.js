import { Api } from "../../services/service";

export const getBookingSettings = () => async (dispatch) => {
  try {
    
    dispatch({ type: 'bookingSettings/getBookingSettingsStart' });

    const res = await Api("get", "public/booking-settings");
    
   

    if (res?.status) {
   
      dispatch({
        type: 'bookingSettings/getBookingSettingsSuccess',
        payload: res.data,
      });
      return { success: true, data: res.data };
    } else {
      console.log('[Booking Settings] Failed:', res.message);
      dispatch({
        type: 'bookingSettings/getBookingSettingsFailure',
        payload: res.message || 'Failed to fetch booking settings',
      });
      return { success: false, message: res.message };
    }
  } catch (error) {
    console.error(' [Booking Settings] Error:', error);
    const errorMessage = error.message || 'Failed to fetch booking settings';
    dispatch({
      type: 'bookingSettings/getBookingSettingsFailure',
      payload: errorMessage,
    });
    return { success: false, message: errorMessage };
  }
};
