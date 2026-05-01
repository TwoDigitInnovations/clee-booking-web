import { Api } from "../../services/service";

export const getCalendarSettings = () => async (dispatch) => {
  try {
   
    dispatch({ type: 'calendarSettings/getCalendarSettingsStart' });

    const res = await Api("get", "public/calendar-settings");
    
   

    if (res?.status) {
      console.log('[Calendar Settings] Success! Data:', JSON.stringify(res.data, null, 2));
      dispatch({
        type: 'calendarSettings/getCalendarSettingsSuccess',
        payload: res.data,
      });
      return { success: true, data: res.data };
    } else {
      console.log('❌ [Calendar Settings] Failed:', res.message);
      dispatch({
        type: 'calendarSettings/getCalendarSettingsFailure',
        payload: res.message || 'Failed to fetch calendar settings',
      });
      return { success: false, message: res.message };
    }
  } catch (error) {
    console.error('[Calendar Settings] Error:', error);
    console.error('[Calendar Settings] Error Message:', error.message);
    const errorMessage = error.message || 'Failed to fetch calendar settings';
    dispatch({
      type: 'calendarSettings/getCalendarSettingsFailure',
      payload: errorMessage,
    });
    return { success: false, message: errorMessage };
  }
};
