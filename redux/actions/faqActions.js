import { Api } from "../../services/service";
import { setFaqPage, setConsultSection, setLoading } from "../slices/faqSlice";

export const fetchFaqPage = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const res = await Api("get", "faq/faq_page");
    console.log("[FAQ] faq_page response:", res);
    const categories = res?.data?.categories || res?.data?.data?.categories;
    if (categories) {
      const sorted = [...categories].sort((a, b) => (a.order || 0) - (b.order || 0));
      dispatch(setFaqPage(sorted));
    }
    dispatch(setLoading(false));
    return { success: true, data: res?.data };
  } catch (err) {
    console.error("[FAQ] fetchFaqPage error:", err);
    dispatch(setLoading(false));
    return { success: false };
  }
};

export const fetchConsultSection = () => async (dispatch) => {
  try {
    const res = await Api("get", "faq/consult_section");
    console.log("[FAQ] consult_section response:", res);
    const categories = res?.data?.categories || res?.data?.data?.categories;
    if (categories) {
      const allItems = categories.flatMap((cat) =>
        [...(cat.items || [])].sort((a, b) => (a.order || 0) - (b.order || 0))
      );
      dispatch(setConsultSection(allItems));
    }
    return { success: true, data: res?.data };
  } catch (err) {
    console.error("[FAQ] fetchConsultSection error:", err);
    return { success: false };
  }
};
