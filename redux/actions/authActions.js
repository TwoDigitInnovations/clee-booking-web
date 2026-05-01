import { Api } from "../../services/service";
import { setLoading, loginSuccess, logout as logoutAction } from "../slices/authSlice";

export const login = (credentials) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const res = await Api("post", "auth/login", credentials);
    if (res?.status) {
      dispatch(loginSuccess({ user: res.data.user, token: res.data.token }));
      return { success: true, message: res.message || "Login successful" };
    }
    dispatch(setLoading(false));
    return { success: false, message: res.message || "Login failed" };
  } catch (err) {
    dispatch(setLoading(false));
    return { success: false, message: err.message || "Something went wrong" };
  }
};

export const signup = (userData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    // Map 'name' to 'fullname' for backend compatibility
    const payload = {
      fullname: userData.name || userData.fullname,
      email: userData.email,
      password: userData.password,
      phone: userData.phone,
      role: userData.role
    };
    const res = await Api("post", "auth/register", payload);
    dispatch(setLoading(false));
    if (res?.status) {
      // Don't auto-login, just return success
      return { success: true, message: res.message || "Account created successfully. Please login." };
    }
    return { success: false, message: res.message || "Signup failed" };
  } catch (err) {
    dispatch(setLoading(false));
    return { success: false, message: err.message || "Something went wrong" };
  }
};

export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const res = await Api("post", "auth/sendOTP", { email });
    dispatch(setLoading(false));
    if (res?.status) {
      return { success: true, message: res.message || "OTP sent to your email", token: res.data?.token };
    }
    return { success: false, message: res.message || "Failed to send OTP" };
  } catch (err) {
    dispatch(setLoading(false));
    return { success: false, message: err.message || "Something went wrong" };
  }
};

export const verifyOTP = (data) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const res = await Api("post", "auth/verifyOTP", data);
    dispatch(setLoading(false));
    if (res?.status) {
      return { success: true, message: res.message || "OTP verified", token: res.data?.token };
    }
    return { success: false, message: res.message || "Invalid OTP" };
  } catch (err) {
    dispatch(setLoading(false));
    return { success: false, message: err.message || "Something went wrong" };
  }
};

export const resetPassword = (data) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const res = await Api("post", "auth/changePassword", data);
    dispatch(setLoading(false));
    if (res?.status) {
      return { success: true, message: res.message || "Password reset successful" };
    }
    return { success: false, message: res.message || "Failed to reset password" };
  } catch (err) {
    dispatch(setLoading(false));
    return { success: false, message: err.message || "Something went wrong" };
  }
};

export const logout = () => (dispatch) => {
  dispatch(logoutAction());
};
