import { Api } from "../../services/service";

export const fetchStaff = () => async (dispatch) => {
  try {
    console.log('🔵 [Staff] Fetching staff list...');
    dispatch({ type: 'staff/fetchStaffStart' });

    const res = await Api("get", "public/staff");
    
    console.log('🔵 [Staff] API Response:', res);

    if (res?.status) {
      const staffData = Array.isArray(res.data) ? res.data : res.data?.data || [];
      console.log('✅ [Staff] Success! Staff count:', staffData.length);
      
      dispatch({
        type: 'staff/fetchStaffSuccess',
        payload: staffData,
      });
      return { success: true, data: staffData };
    } else {
      console.log('❌ [Staff] Failed:', res.message);
      dispatch({
        type: 'staff/fetchStaffFailure',
        payload: res.message || 'Failed to fetch staff',
      });
      return { success: false, message: res.message };
    }
  } catch (error) {
    console.error('❌ [Staff] Error:', error);
    const errorMessage = error.message || 'Failed to fetch staff';
    dispatch({
      type: 'staff/fetchStaffFailure',
      payload: errorMessage,
    });
    return { success: false, message: errorMessage };
  }
};
