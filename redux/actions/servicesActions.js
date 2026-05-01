import { Api } from "../../services/service";
import { setServices, setLoading } from "../slices/servicesSlice";

export const fetchServices = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const res = await Api("get", "public/services");
    if (res?.status) {
      const servicesData = Array.isArray(res.data) ? res.data : res.data?.data || [];
      dispatch(setServices(servicesData));
    }
    dispatch(setLoading(false));
    return { success: true, data: res.data };
  } catch (err) {
    dispatch(setLoading(false));
    throw err;
  }
};

export const createService = (serviceData) => async (dispatch) => {
  try {
    const res = await Api("post", "services/create", serviceData);
    if (res?.status) {
      return { success: true, data: res.data, message: res.message };
    }
    return { success: false, message: res.message };
  } catch (err) {
    throw err;
  }
};

export const getServiceById = (id) => async (dispatch) => {
  try {
    const res = await Api("get", `services/${id}`);
    if (res?.status) {
      return { success: true, data: res.data };
    }
    return { success: false, message: res.message };
  } catch (err) {
    throw err;
  }
};

export const fetchMostPopularServices = () => async (dispatch) => {
  try {
    const res = await Api("get", "public/services");
    if (res?.status) {
      const all = res.data?.data || [];
      const popular = all.filter(s => s.pancakePricing?.some(p => p.mostPopular));
      return { success: true, data: popular };
    }
    return { success: false, data: [] };
  } catch (err) {
    console.error('Failed to fetch popular services:', err);
    return { success: false, data: [] };
  }
};
