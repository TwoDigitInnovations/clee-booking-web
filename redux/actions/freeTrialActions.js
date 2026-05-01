import { Api, ApiFormData } from "../../services/service";
import {
  setLoading,
  setError,
  setProfileData,
  addService,
  removeService as removeServiceFromStore,
  addStaff,
  removeStaff as removeStaffFromStore,
  setSchedulingData,
  setPlanData,
} from "../slices/freeTrialSlice";

export const saveProfileStep = (formData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));

    const payload = new FormData();
    payload.append("providerType", formData.providerType || "");
    payload.append("businessName", formData.businessName || "");
    payload.append("displayName", formData.displayName || "");
    payload.append("bio", formData.bio || "");
    payload.append("website", formData.website || "");
    payload.append("instagram", formData.instagram || "");

    if (formData.logo && formData.logo instanceof File) {
      payload.append("logo", formData.logo);
    }

    const res = await ApiFormData("post", "freetrial/step/profile", payload);
    dispatch(setLoading(false));

    if (res?.status) {
      dispatch(setProfileData(res.data?.data || res.data));
      return { success: true };
    }
    dispatch(setError(res?.message || "Failed to save profile"));
    return { success: false, message: res?.message };
  } catch (err) {
    dispatch(setLoading(false));
    dispatch(setError(err?.message || "Something went wrong"));
    return { success: false, message: err?.message };
  }
};

export const saveBrandingStep = (formData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));

    const res = await Api("post", "freetrial/step/branding", {
      primaryColor: formData.primaryColor,
      accentColor: formData.accentColor,
      streetAddress: formData.streetAddress,
      suburb: formData.suburb,
      state: formData.state,
      postcode: formData.postcode,
      businessPhone: formData.businessPhone,
      bookingEmail: formData.bookingEmail,
    });

    dispatch(setLoading(false));

    if (res?.status) {
      return { success: true };
    }
    dispatch(setError(res?.message || "Failed to save branding"));
    return { success: false, message: res?.message };
  } catch (err) {
    dispatch(setLoading(false));
    dispatch(setError(err?.message || "Something went wrong"));
    return { success: false, message: err?.message };
  }
};

export const createServiceAction = (serviceData) => (dispatch) => {
  const newService = {
    _id: `local_${Date.now()}`,
    name: serviceData.name,
    price: serviceData.price || 0,
    durationMins: serviceData.durationMins || 30,
    depositType: serviceData.depositType || "none",
    depositAmount: serviceData.depositAmount || "",
  };
  dispatch(addService(newService));
  return { success: true, data: newService };
};

export const deleteServiceAction = (id) => (dispatch) => {
  dispatch(removeServiceFromStore(id));
  return { success: true };
};

export const saveServicesStep = (services, serviceCategories, depositOption, depositAmount) => async (dispatch) => {
  try {
    dispatch(setLoading(true));

    const cleanServices = services.map(({ _id, ...s }) => s);

    const res = await Api("post", "freetrial/step/services", {
      serviceCategories,
      services: cleanServices,
      depositOption,
      depositAmount,
    });

    dispatch(setLoading(false));

    if (res?.status) {
      return { success: true };
    }
    dispatch(setError(res?.message || "Failed to save services"));
    return { success: false, message: res?.message };
  } catch (err) {
    dispatch(setLoading(false));
    dispatch(setError(err?.message || "Something went wrong"));
    return { success: false, message: err?.message };
  }
};

export const createStaffAction = (staffData) => (dispatch) => {
  const newStaff = {
    _id: `local_${Date.now()}`,
    name: staffData.name,
    fullname: staffData.name,
    email: staffData.email || "",
    phone: staffData.phone || "",
    role: staffData.role || "Lead Practitioner",
    specialty: staffData.specialty || "",
  };
  dispatch(addStaff(newStaff));
  return { success: true, data: newStaff };
};

export const deleteStaffAction = (id) => (dispatch) => {
  dispatch(removeStaffFromStore(id));
  return { success: true };
};

export const saveStaffStep = (staff) => async (dispatch) => {
  try {
    dispatch(setLoading(true));

    const cleanStaff = staff.map(({ _id, fullname, ...s }) => s);

    const res = await Api("post", "freetrial/step/staff", { staff: cleanStaff });

    dispatch(setLoading(false));

    if (res?.status) {
      return { success: true };
    }
    dispatch(setError(res?.message || "Failed to save staff"));
    return { success: false, message: res?.message };
  } catch (err) {
    dispatch(setLoading(false));
    dispatch(setError(err?.message || "Something went wrong"));
    return { success: false, message: err?.message };
  }
};

export const saveSchedulingStep = (openingHours, bookingSettings) => async (dispatch) => {
  try {
    dispatch(setLoading(true));

    const res = await Api("post", "freetrial/step/scheduling", {
      openingHours,
      bookingSettings,
    });

    dispatch(setLoading(false));

    if (res?.status) {
      dispatch(setSchedulingData({ openingHours, bookingSettings }));
      return { success: true };
    }
    dispatch(setError(res?.message || "Failed to save scheduling"));
    return { success: false, message: res?.message };
  } catch (err) {
    dispatch(setLoading(false));
    dispatch(setError(err?.message || "Something went wrong"));
    return { success: false, message: err?.message };
  }
};

export const savePlanStep = (planData, payoutAccount) => async (dispatch) => {
  try {
    dispatch(setLoading(true));

    const res = await Api("post", "freetrial/step/complete", {
      selectedPlan: planData,
      payoutAccountName: payoutAccount.accountName,
      payoutAbn: payoutAccount.abn,
      payoutBsb: payoutAccount.bsb,
      payoutAccountNumber: payoutAccount.accountNumber,
    });

    dispatch(setLoading(false));

    if (res?.status) {
      dispatch(setPlanData({ plan: planData, payoutAccount }));
      return { success: true };
    }
    dispatch(setError(res?.message || "Failed to complete setup"));
    return { success: false, message: res?.message };
  } catch (err) {
    dispatch(setLoading(false));
    dispatch(setError(err?.message || "Something went wrong"));
    return { success: false, message: err?.message };
  }
};
