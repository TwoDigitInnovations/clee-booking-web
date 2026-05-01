import { Api } from "../../services/service";
import { setBookings, setUpcomingBookings, setLoading, addBooking } from "../slices/bookingSlice";

export const fetchBookings = (date) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const dateStr = date ? date.toISOString().split('T')[0] : '';
    const res = await Api("get", `booking/getAll${dateStr ? `?date=${dateStr}` : ''}`);
    if (res?.status) {
      const bookingsData = Array.isArray(res.data) ? res.data : res.data?.data || [];
      dispatch(setBookings(bookingsData));
    }
    dispatch(setLoading(false));
    return { success: true, data: res.data };
  } catch (err) {
    dispatch(setLoading(false));
    throw err;
  }
};

export const fetchUpcomingBookings = () => async (dispatch) => {
  try {
    const res = await Api("get", "booking/upcoming");
    if (res?.status) {
      const upcomingData = Array.isArray(res.data) ? res.data : res.data?.data || [];
      dispatch(setUpcomingBookings(upcomingData));
    }
    return { success: true, data: res.data };
  } catch (err) {
    throw err;
  }
};

export const createBooking = (bookingData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const res = await Api("post", "public/booking/create", bookingData);
    if (res?.status) {
      dispatch(addBooking(res.data));
      dispatch(setLoading(false));
      return { success: true, data: res.data, message: res.message };
    }
    dispatch(setLoading(false));
    return { success: false, message: res.message };
  } catch (err) {
    dispatch(setLoading(false));
    throw err;
  }
};

export const updateBooking = (id, bookingData) => async (dispatch) => {
  try {
    const res = await Api("put", `booking/update/${id}`, bookingData);
    if (res?.status) {
      return { success: true, data: res.data, message: res.message };
    }
    return { success: false, message: res.message };
  } catch (err) {
    throw err;
  }
};

export const deleteBooking = (id) => async (dispatch) => {
  try {
    const res = await Api("delete", `booking/delete/${id}`);
    if (res?.status) {
      return { success: true, message: res.message };
    }
    return { success: false, message: res.message };
  } catch (err) {
    throw err;
  }
};

export const getAvailableTimeSlots = (date, serviceIds) => async (dispatch) => {
  try {
    const res = await Api("get", `booking/available-slots?date=${date}&services=${serviceIds.join(',')}`);
    if (res?.status) {
      return { success: true, data: res.data };
    }
    return { success: false, data: [] };
  } catch (err) {
    return { success: false, data: [] };
  }
};
