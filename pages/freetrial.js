import { useState, useEffect } from "react";
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import {
  Building2,
  User,
  Sparkles,
  Scissors,
  Smile,
  MoreHorizontal,
  Upload,
  CheckCircle2,
  Plus,
  X,
  CloudUpload,
  Info,
  CreditCard,
} from "lucide-react";
import {
  saveProfileStep,
  saveBrandingStep,
  createServiceAction,
  deleteServiceAction,
  saveServicesStep,
  createStaffAction,
  deleteStaffAction,
  saveStaffStep,
  saveSchedulingStep,
  savePlanStep,
} from "../redux/actions/freeTrialActions";

export default function FreeTrial() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading } = useSelector((s) => s.freeTrial);

  const [authChecked, setAuthChecked] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedType, setSelectedType] = useState("");
  const [formData, setFormData] = useState({
    businessName: "",
    displayName: "",
    bio: "",
    website: "",
    instagram: "",
    logo: null,
    coverPhoto: null,
    primaryColor: "#006874",
    accentColor: "#26CCDA",
    streetAddress: "",
    suburb: "",
    state: "",
    postcode: "",
    businessPhone: "",
    bookingEmail: "",
  });

  const [selectedPrimaryColor, setSelectedPrimaryColor] = useState("#006874");
  const [selectedAccentColor, setSelectedAccentColor] = useState("#26CCDA");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [showAddService, setShowAddService] = useState(false);
  const [newService, setNewService] = useState({ name: "", durationMins: 30, price: "", category: "", depositType: "none", depositAmount: "" });
  const [depositOption, setDepositOption] = useState("fixed");
  const [depositAmount, setDepositAmount] = useState("50");
  const [teamMembers, setTeamMembers] = useState([]);
  const [showAddStaff, setShowAddStaff] = useState(false);
  const [newStaff, setNewStaff] = useState({ name: "", email: "", phone: "", role: "Lead Practitioner", specialty: "" });
  const [openingHours, setOpeningHours] = useState({
    Monday: { enabled: true, from: "09:00 AM", until: "06:00 PM" },
    Tuesday: { enabled: true, from: "09:00 AM", until: "06:00 PM" },
    Wednesday: { enabled: true, from: "09:00 AM", until: "06:00 PM" },
    Thursday: { enabled: true, from: "09:00 AM", until: "06:00 PM" },
    Friday: { enabled: true, from: "09:00 AM", until: "06:00 PM" },
    Saturday: { enabled: false, from: "Clinic is closed", until: "" },
    Sunday: { enabled: false, from: "Clinic is closed", until: "" },
  });
  const [bookingSettings, setBookingSettings] = useState({
    minNotice: "24 hours",
    advanceBooking: "3 months",
    cancellationPolicy: "48 hours notice required",
  });
  const [selectedPlan, setSelectedPlan] = useState("growth");
  const [payoutAccount, setPayoutAccount] = useState({
    accountName: "",
    abn: "",
    bsb: "",
    accountNumber: "",
  });
  const [stepError, setStepError] = useState("");
  const [csvFile, setCsvFile] = useState(null);
  const [csvPreview, setCsvPreview] = useState([]);

  const primaryColors = ["#006874", "#0A4D91", "#1E5A5A", "#000000", "#8B4513"];
  const accentColors = ["#FF8C69", "#FFB69E", "#0A4D91", "#87CEEB", "#E0E0E0"];

  const serviceCategories = [
    "Facials & skin","Laser & IPL","Brows & lashes","Massage","Nails",
    "Hair","Injectables","Body treatments","Waxing","Yoga & pilates","Nutrition","Other",
  ];

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const providerTypes = [
    { id: "clinic", label: "Clinic", icon: Building2 },
    { id: "solo", label: "Solo practitioner", icon: User },
    { id: "wellness", label: "Wellness studio", icon: Sparkles },
    { id: "salon", label: "Beauty salon", icon: Scissors },
    { id: "skincare", label: "Skincare specialist", icon: Smile },
    { id: "other", label: "Other wellness", icon: MoreHorizontal },
  ];

  const steps = [
    { num: 1, label: "Profile" },
    { num: 2, label: "Branding" },
    { num: 3, label: "Services" },
    { num: 4, label: "Staff" },
    { num: 5, label: "Scheduling" },
    { num: 6, label: "Plan" },
  ];

  const setupSteps = [
    { label: "Profile", completed: currentStep > 1 },
    { label: "Branding", completed: currentStep > 2 },
    { label: "Services", completed: currentStep > 3 },
    { label: "Staff & clients", completed: currentStep > 4 },
    { label: "Scheduling", completed: currentStep > 5 },
    { label: "Plan", completed: currentStep > 6 },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCsvFile = (file) => {
    if (file.size > 10 * 1024 * 1024) {
      setStepError("File size exceeds 10MB limit");
      return;
    }
    setCsvFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const lines = text.split("\n").filter((l) => l.trim());
      if (lines.length < 2) return;
      const headers = lines[0].split(",").map((h) => h.trim().replace(/"/g, ""));
      const rows = lines.slice(1, 4).map((line) => {
        const vals = line.split(",").map((v) => v.trim().replace(/"/g, ""));
        return headers.reduce((obj, h, i) => ({ ...obj, [h]: vals[i] || "" }), {});
      });
      setCsvPreview(rows);
    };
    reader.readAsText(file);
  };

  const handleStep1Continue = async () => {
    setStepError("");
    if (!formData.businessName.trim()) {
      setStepError("Business name is required");
      return;
    }
    const res = await dispatch(
      saveProfileStep({ ...formData, providerType: selectedType })
    );
    if (res?.success) setCurrentStep(2);
    else setStepError(res?.message || "Failed to save profile");
  };

  const handleStep2Continue = async () => {
    setStepError("");
    const res = await dispatch(
      saveBrandingStep({
        ...formData,
        primaryColor: selectedPrimaryColor,
        accentColor: selectedAccentColor,
      })
    );
    if (res?.success) setCurrentStep(3);
    else setStepError(res?.message || "Failed to save branding");
  };

  const handleAddService = async () => {
    if (!newService.name.trim()) return;
    const payload = {
      ...newService,
      depositType: depositOption,
      depositAmount: depositOption === "fixed" ? depositAmount : "",
    };
    const res = await dispatch(createServiceAction(payload));
    if (res?.success) {
      setServices((prev) => [...prev, res.data]);
      setNewService({ name: "", durationMins: 30, price: "", category: "", depositType: "none", depositAmount: "" });
      setShowAddService(false);
    } else {
      setStepError(res?.message || "Failed to add service");
    }
  };

  const handleRemoveService = async (id) => {
    await dispatch(deleteServiceAction(id));
    setServices((prev) => prev.filter((s) => s._id !== id));
  };

  const handleAddStaff = async () => {
    if (!newStaff.name.trim()) return;
    const res = await dispatch(createStaffAction(newStaff));
    if (res?.success) {
      setTeamMembers((prev) => [...prev, res.data]);
      setNewStaff({ name: "", email: "", phone: "", role: "Lead Practitioner", specialty: "" });
      setShowAddStaff(false);
    } else {
      setStepError(res?.message || "Failed to add staff");
    }
  };

  const handleRemoveStaff = async (id) => {
    await dispatch(deleteStaffAction(id));
    setTeamMembers((prev) => prev.filter((s) => s._id !== id));
  };

  const handleStep5Continue = async () => {
    setStepError("");
    const res = await dispatch(saveSchedulingStep(openingHours, bookingSettings));
    if (res?.success) setCurrentStep(6);
    else setStepError(res?.message || "Failed to save scheduling");
  };

  const handleStep3Continue = async () => {
    setStepError("");
    const res = await dispatch(saveServicesStep(services, selectedCategories, depositOption, depositAmount));
    if (res?.success) setCurrentStep(4);
    else setStepError(res?.message || "Failed to save services");
  };

  const handleStep4Continue = async () => {
    setStepError("");
    const res = await dispatch(saveStaffStep(teamMembers));
    if (res?.success) setCurrentStep(5);
    else setStepError(res?.message || "Failed to save staff");
  };

  const handleFinish = async () => {
    setStepError("");
    try {
      const res = await dispatch(savePlanStep(selectedPlan, payoutAccount));
      if (res?.success) {
        router.push("/setup-complete");
      } else {
        setStepError(res?.message || "Failed to save plan. Please try again.");
      }
    } catch (err) {
      setStepError("Something went wrong. Please try again.");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace(`/auth/login?redirect=${encodeURIComponent("/freetrial")}`);
    } else {
      setAuthChecked(true);
    }
  }, []);

  if (!authChecked) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#0A4D91] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Free Trial Setup | Clee</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-white overflow-x-hidden">
        <div className="bg-white border-b border-gray-200 px-4 py-4">
          <div className="max-w-7xl mx-auto">
            <img src="/lgo.png" alt="Clee" className="h-8" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-4 sm:py-8">
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 w-full max-w-full">
            <div className="lg:col-span-2">
              <div className="hidden sm:flex items-center justify-between mb-8 overflow-x-auto pb-2">
                {steps.map((step, index) => (
                  <div key={step.num} className="flex items-center flex-shrink-0">
                    <div className="flex flex-col items-center min-w-[70px]">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold mb-2 text-sm ${
                        currentStep > step.num ? "bg-[#0A4D91] text-white" : currentStep === step.num ? "bg-[#0A4D91] text-white" : "bg-gray-200 text-gray-400"
                      }`}>
                        {currentStep > step.num ? <CheckCircle2 className="w-5 h-5" /> : step.num}
                      </div>
                      <span className={`text-xs whitespace-nowrap ${currentStep >= step.num ? "text-gray-900 font-medium" : "text-gray-400"}`}>
                        {step.label}
                      </span>
                    </div>
                    {index < steps.length - 1 && (
                      <div className="w-8 sm:w-12 h-0.5 bg-gray-200 mx-1 sm:mx-2 mt-[-20px] flex-shrink-0" />
                    )}
                  </div>
                ))}
              </div>

              <div className="sm:hidden mb-6 px-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-900">Step {currentStep} of 6</span>
                  <span className="text-sm font-medium text-gray-500">{Math.round((currentStep / 6) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                  <div className="bg-[#0A4D91] h-2.5 rounded-full transition-all duration-300" style={{ width: `${(currentStep / 6) * 100}%` }} />
                </div>
                <p className="text-xs text-gray-600 font-medium">{steps[currentStep - 1]?.label}</p>
              </div>

              {stepError && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                  {stepError}
                </div>
              )}

              {/* STEP 1 */}
              {currentStep === 1 && (
                <>
                  <div className="mb-6">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">What type of provider are you?</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                      {providerTypes.map((type) => {
                        const Icon = type.icon;
                        return (
                          <button key={type.id} onClick={() => setSelectedType(type.id)}
                            className={`p-4 sm:p-6 rounded-lg border-2 transition-all hover:border-[#0A4D91] bg-white ${selectedType === type.id ? "border-[#0A4D91] shadow-sm" : "border-gray-200"}`}>
                            <Icon className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 sm:mb-3 text-gray-700" />
                            <p className="text-xs sm:text-sm font-medium text-gray-900">{type.label}</p>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Business profile</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Business name</label>
                        <input type="text" name="businessName" value={formData.businessName} onChange={handleChange}
                          placeholder="e.g. Lumina Clinical Wellness"
                          className="w-full px-4 py-2.5 bg-[#F3F4F5] border-0 rounded-lg focus:ring-2 focus:ring-[#0A4D91] outline-none text-gray-900 placeholder-gray-400" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Display name</label>
                        <input type="text" name="displayName" value={formData.displayName} onChange={handleChange}
                          placeholder="How clients see you"
                          className="w-full px-4 py-2.5 bg-[#F3F4F5] border-0 rounded-lg focus:ring-2 focus:ring-[#0A4D91] outline-none text-gray-900 placeholder-gray-400" />
                      </div>
                    </div>
                    <div className="mb-3 sm:mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                      <textarea name="bio" value={formData.bio} onChange={handleChange}
                        placeholder="Tell us about your clinic..." rows="4"
                        className="w-full px-4 py-2.5 bg-[#F3F4F5] border-0 rounded-lg focus:ring-2 focus:ring-[#0A4D91] outline-none resize-none text-gray-900 placeholder-gray-400" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                        <input type="url" name="website" value={formData.website} onChange={handleChange}
                          placeholder="https://yourdomain.com"
                          className="w-full px-4 py-2.5 bg-[#F3F4F5] border-0 rounded-lg focus:ring-2 focus:ring-[#0A4D91] outline-none text-gray-900 placeholder-gray-400" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Instagram</label>
                        <input type="text" name="instagram" value={formData.instagram} onChange={handleChange}
                          placeholder="@handle"
                          className="w-full px-4 py-2.5 bg-[#F3F4F5] border-0 rounded-lg focus:ring-2 focus:ring-[#0A4D91] outline-none text-gray-900 placeholder-gray-400" />
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Logo & cover photo</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">Logo</label>
                        <label className="border-2 border-dashed border-gray-300 rounded-lg p-6 sm:p-8 text-center hover:border-[#0A4D91] transition-colors cursor-pointer bg-white flex flex-col items-center">
                          <Upload className="w-6 h-6 sm:w-8 sm:h-8 mb-2 text-gray-400" />
                          <p className="text-xs text-gray-400 font-medium">{formData.logo ? formData.logo.name : "UPLOAD LOGO"}</p>
                          <input type="file" accept="image/*" className="hidden" onChange={(e) => setFormData({ ...formData, logo: e.target.files[0] })} />
                        </label>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">Cover photo</label>
                        <label className="border-2 border-dashed border-gray-300 rounded-lg p-8 sm:p-12 text-center hover:border-[#0A4D91] transition-colors cursor-pointer bg-white flex flex-col items-center">
                          <Upload className="w-6 h-6 sm:w-8 sm:h-8 mb-2 text-gray-400" />
                          <p className="text-xs text-gray-400 font-medium">{formData.coverPhoto ? formData.coverPhoto.name : "UPLOAD COVER"}</p>
                          <input type="file" accept="image/*" className="hidden" onChange={(e) => setFormData({ ...formData, coverPhoto: e.target.files[0] })} />
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button onClick={handleStep1Continue} disabled={loading}
                      className="bg-[#0A4D91] text-white px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-[#083d73] transition-colors w-full sm:w-auto disabled:opacity-60">
                      {loading ? "Saving..." : "Continue"}
                    </button>
                  </div>
                </>
              )}

              {/* STEP 2 */}
              {currentStep === 2 && (
                <>
                  <div className="mb-6">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Brand colours</h2>
                    <div className="mb-6">
                      <label className="block text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wide">Primary Colour</label>
                      <div className="flex items-center gap-2 sm:gap-3 mb-3">
                        {primaryColors.map((color) => (
                          <button key={color} onClick={() => { setSelectedPrimaryColor(color); setFormData({ ...formData, primaryColor: color }); }}
                            className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full transition-all ${selectedPrimaryColor === color ? "ring-4 ring-[#0A4D91] ring-offset-2" : "hover:scale-110"}`}
                            style={{ backgroundColor: color }} />
                        ))}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500 text-sm">#</span>
                        <input type="text" value={selectedPrimaryColor.replace("#", "")}
                          onChange={(e) => setSelectedPrimaryColor(`#${e.target.value}`)}
                          className="flex-1 px-4 py-2.5 bg-[#F3F4F5] border-0 rounded-lg focus:ring-2 focus:ring-[#0A4D91] outline-none text-gray-900" maxLength="6" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wide">Accent Colour</label>
                      <div className="flex items-center gap-2 sm:gap-3 mb-3">
                        {accentColors.map((color) => (
                          <button key={color} onClick={() => { setSelectedAccentColor(color); setFormData({ ...formData, accentColor: color }); }}
                            className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full transition-all ${selectedAccentColor === color ? "ring-4 ring-[#0A4D91] ring-offset-2" : "hover:scale-110"}`}
                            style={{ backgroundColor: color }} />
                        ))}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500 text-sm">#</span>
                        <input type="text" value={selectedAccentColor.replace("#", "")}
                          onChange={(e) => setSelectedAccentColor(`#${e.target.value}`)}
                          className="flex-1 px-4 py-2.5 bg-[#F3F4F5] border-0 rounded-lg focus:ring-2 focus:ring-[#0A4D91] outline-none text-gray-900" maxLength="6" />
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Location & contact</h2>
                    <div className="space-y-3 sm:space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Street address</label>
                        <input type="text" name="streetAddress" value={formData.streetAddress} onChange={handleChange}
                          placeholder="123 Clinical Way"
                          className="w-full px-4 py-2.5 bg-[#F3F4F5] border-0 rounded-lg focus:ring-2 focus:ring-[#0A4D91] outline-none text-gray-900 placeholder-gray-400" />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Suburb</label>
                          <input type="text" name="suburb" value={formData.suburb} onChange={handleChange}
                            placeholder="Wellness District"
                            className="w-full px-4 py-2.5 bg-[#F3F4F5] border-0 rounded-lg focus:ring-2 focus:ring-[#0A4D91] outline-none text-gray-900 placeholder-gray-400" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                          <select name="state" value={formData.state} onChange={handleChange}
                            className="w-full px-4 py-2.5 bg-[#F3F4F5] border-0 rounded-lg focus:ring-2 focus:ring-[#0A4D91] outline-none text-gray-900">
                            <option value="">Select</option>
                            <option value="NSW">NSW</option>
                            <option value="VIC">VIC</option>
                            <option value="QLD">QLD</option>
                            <option value="WA">WA</option>
                            <option value="SA">SA</option>
                            <option value="TAS">TAS</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Postcode</label>
                          <input type="text" name="postcode" value={formData.postcode} onChange={handleChange}
                            placeholder="3000"
                            className="w-full px-4 py-2.5 bg-[#F3F4F5] border-0 rounded-lg focus:ring-2 focus:ring-[#0A4D91] outline-none text-gray-900 placeholder-gray-400" />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Business phone</label>
                          <input type="tel" name="businessPhone" value={formData.businessPhone} onChange={handleChange}
                            placeholder="+61 400 000 000"
                            className="w-full px-4 py-2.5 bg-[#F3F4F5] border-0 rounded-lg focus:ring-2 focus:ring-[#0A4D91] outline-none text-gray-900 placeholder-gray-400" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Booking email</label>
                          <input type="email" name="bookingEmail" value={formData.bookingEmail} onChange={handleChange}
                            placeholder="bookings@cleebeauty.com"
                            className="w-full px-4 py-2.5 bg-[#F3F4F5] border-0 rounded-lg focus:ring-2 focus:ring-[#0A4D91] outline-none text-gray-900 placeholder-gray-400" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between gap-3">
                    <button onClick={() => setCurrentStep(1)}
                      className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 order-2 sm:order-1">
                      Back
                    </button>
                    <button onClick={handleStep2Continue} disabled={loading}
                      className="bg-[#0A4D91] text-white px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-[#083d73] transition-colors order-1 sm:order-2 disabled:opacity-60">
                      {loading ? "Saving..." : "Continue"}
                    </button>
                  </div>
                </>
              )}

              {/* STEP 3 */}
              {currentStep === 3 && (
                <>
                  <div className="mb-6">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Service categories</h2>
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      {serviceCategories.map((category) => (
                        <button key={category} onClick={() => toggleCategory(category)}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategories.includes(category) ? "bg-[#0A4D91] text-white" : "bg-blue-50 text-[#0A4D91] hover:bg-blue-100"}`}>
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Services & pricing</h2>
                    <div className="hidden sm:grid bg-[#F3F4F5] rounded-t-lg px-4 py-3 grid-cols-12 gap-4 text-xs font-semibold text-gray-500 uppercase">
                      <div className="col-span-5">Name</div>
                      <div className="col-span-3">Duration</div>
                      <div className="col-span-3">Price</div>
                      <div className="col-span-1"></div>
                    </div>
                    <div className="border border-gray-200 rounded-lg sm:rounded-t-none">
                      {services.length === 0 && (
                        <div className="px-4 py-6 text-center text-gray-400 text-sm">No services added yet</div>
                      )}
                      {services.map((service, index) => (
                        <div key={service._id || index} className={`px-4 py-4 ${index !== services.length - 1 ? "border-b border-gray-200" : ""}`}>
                          <div className="sm:hidden">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <div className="font-medium text-gray-900">{service.name}</div>
                                <div className="text-sm text-gray-600 mt-1">{service.duration || service.durationMins} min</div>
                              </div>
                              <button onClick={() => handleRemoveService(service._id)} className="text-[#0A4D91] hover:text-[#083d73]">
                                <X className="w-5 h-5" />
                              </button>
                            </div>
                            <div className="text-lg font-semibold text-gray-900">$ {service.price}</div>
                          </div>
                          <div className="hidden sm:grid grid-cols-12 gap-4 items-center">
                            <div className="col-span-5 text-gray-900">{service.name}</div>
                            <div className="col-span-3 text-gray-600">{service.duration || service.durationMins} min</div>
                            <div className="col-span-3 text-gray-900 font-medium">$ {service.price}</div>
                            <div className="col-span-1 flex justify-end">
                              <button onClick={() => handleRemoveService(service._id)} className="text-[#0A4D91] hover:text-[#083d73]">
                                <X className="w-5 h-5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                      <button onClick={() => setShowAddService(true)} className="w-full px-4 py-4 text-[#0A4D91] font-medium flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors">
                        <Plus className="w-5 h-5" /> Add service
                      </button>
                    </div>

                    {showAddService && (
                      <div className="mt-4 p-4 border border-gray-200 rounded-lg bg-[#F3F4F5] space-y-3">
                        <h3 className="font-semibold text-gray-900">New Service</h3>
                        <input type="text" placeholder="Service name" value={newService.name}
                          onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                          className="w-full px-4 py-2.5 bg-white border-0 rounded-lg focus:ring-2 focus:ring-[#0A4D91] outline-none text-gray-900 placeholder-gray-400" />
                        <div className="grid grid-cols-2 gap-3">
                          <input type="number" placeholder="Price ($)" value={newService.price}
                            onChange={(e) => setNewService({ ...newService, price: e.target.value })}
                            className="w-full px-4 py-2.5 bg-white border-0 rounded-lg focus:ring-2 focus:ring-[#0A4D91] outline-none text-gray-900 placeholder-gray-400" />
                          <input type="number" placeholder="Duration (mins)" value={newService.durationMins}
                            onChange={(e) => setNewService({ ...newService, durationMins: Number(e.target.value) })}
                            className="w-full px-4 py-2.5 bg-white border-0 rounded-lg focus:ring-2 focus:ring-[#0A4D91] outline-none text-gray-900 placeholder-gray-400" />
                        </div>
                        <div className="flex gap-2">
                          <button onClick={handleAddService} disabled={loading}
                            className="bg-[#0A4D91] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#083d73] transition-colors disabled:opacity-60">
                            {loading ? "Adding..." : "Add"}
                          </button>
                          <button onClick={() => setShowAddService(false)}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors">
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mb-6">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Deposit amount</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
                      {[
                        { val: "none", title: "No deposit", sub: "Collect payment at clinic" },
                        { val: "fixed", title: "Fixed amount", sub: "Charge a set booking fee" },
                        { val: "percentage", title: "Percentage of service", sub: "Calculate per service price" },
                        { val: "full", title: "Full payment upfront", sub: "Charge 100% of price" },
                      ].map((opt) => (
                        <button key={opt.val} onClick={() => setDepositOption(opt.val)}
                          className={`p-4 rounded-lg border-2 text-left transition-all ${depositOption === opt.val ? "border-[#0A4D91] bg-blue-50" : "border-gray-200 bg-[#F3F4F5] hover:border-gray-300"}`}>
                          <div className="flex items-center gap-3">
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${depositOption === opt.val ? "border-[#0A4D91]" : "border-gray-300"}`}>
                              {depositOption === opt.val && <div className="w-3 h-3 rounded-full bg-[#0A4D91]" />}
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">{opt.title}</p>
                              <p className="text-sm text-gray-500">{opt.sub}</p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                    {depositOption === "fixed" && (
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase">Amount for booking</label>
                        <input type="text" value={depositAmount} onChange={(e) => setDepositAmount(e.target.value)}
                          className="w-full max-w-xs px-4 py-2.5 bg-[#F3F4F5] border-0 rounded-lg focus:ring-2 focus:ring-[#0A4D91] outline-none text-gray-900" />
                        <p className="text-xs text-gray-500 mt-2">Charged at time of booking to secure the appointment.</p>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between gap-3">
                    <button onClick={() => setCurrentStep(2)}
                      className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 order-2 sm:order-1">
                      Back
                    </button>
                    <button onClick={handleStep3Continue} disabled={loading}
                      className="bg-[#0A4D91] text-white px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-[#083d73] transition-colors order-1 sm:order-2 disabled:opacity-60">
                      {loading ? "Saving..." : "Continue"}
                    </button>
                  </div>
                </>
              )}

              {/* STEP 4 */}
              {currentStep === 4 && (
                <>
                  <div className="mb-6">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Your team</h2>
                    <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">Manage practitioners and support staff.</p>
                    <div className="space-y-3 sm:space-y-4 mb-4">
                      {teamMembers.map((member) => {
                        const initials = member.fullname ? member.fullname.split(" ").map((n) => n[0]).join("").toUpperCase().substring(0, 2) : member.name?.substring(0, 2).toUpperCase() || "??";
                        return (
                          <div key={member._id} className="flex items-center justify-between p-3 sm:p-4 bg-[#F3F4F5] rounded-lg">
                            <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white font-bold text-base sm:text-lg flex-shrink-0 bg-[#0A4D91]">
                                {initials}
                              </div>
                              <div className="min-w-0 flex-1">
                                <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">{member.fullname || member.name}</h3>
                                <p className="text-xs sm:text-sm text-gray-600 truncate">{member.role} {member.specialty ? `• ${member.specialty}` : ""}</p>
                              </div>
                            </div>
                            <button onClick={() => handleRemoveStaff(member._id)} className="p-1.5 sm:p-2 hover:bg-gray-200 rounded-lg transition-colors">
                              <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                    <button onClick={() => setShowAddStaff(true)} className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-[#0A4D91] font-medium flex items-center justify-center gap-2 hover:border-[#0A4D91] hover:bg-blue-50 transition-colors">
                      <Plus className="w-5 h-5" /> Add team member
                    </button>

                    {showAddStaff && (
                      <div className="mt-4 p-4 border border-gray-200 rounded-lg bg-[#F3F4F5] space-y-3">
                        <h3 className="font-semibold text-gray-900">New Team Member</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <input type="text" placeholder="Full name *" value={newStaff.name}
                            onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
                            className="w-full px-4 py-2.5 bg-white border-0 rounded-lg focus:ring-2 focus:ring-[#0A4D91] outline-none text-gray-900 placeholder-gray-400" />
                          <input type="email" placeholder="Email" value={newStaff.email}
                            onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
                            className="w-full px-4 py-2.5 bg-white border-0 rounded-lg focus:ring-2 focus:ring-[#0A4D91] outline-none text-gray-900 placeholder-gray-400" />
                          <input type="tel" placeholder="Phone" value={newStaff.phone}
                            onChange={(e) => setNewStaff({ ...newStaff, phone: e.target.value })}
                            className="w-full px-4 py-2.5 bg-white border-0 rounded-lg focus:ring-2 focus:ring-[#0A4D91] outline-none text-gray-900 placeholder-gray-400" />
                          <input type="text" placeholder="Specialty" value={newStaff.specialty}
                            onChange={(e) => setNewStaff({ ...newStaff, specialty: e.target.value })}
                            className="w-full px-4 py-2.5 bg-white border-0 rounded-lg focus:ring-2 focus:ring-[#0A4D91] outline-none text-gray-900 placeholder-gray-400" />
                        </div>
                        <div className="flex gap-2">
                          <button onClick={handleAddStaff} disabled={loading}
                            className="bg-[#0A4D91] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#083d73] transition-colors disabled:opacity-60">
                            {loading ? "Adding..." : "Add"}
                          </button>
                          <button onClick={() => setShowAddStaff(false)}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors">
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mb-6">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Import your existing clients</h2>
                    <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">Upload your patient database to get started instantly.</p>

                    <label
                      htmlFor="csv-upload"
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => {
                        e.preventDefault();
                        const file = e.dataTransfer.files[0];
                        if (file) handleCsvFile(file);
                      }}
                      className="border-2 border-dashed border-gray-300 rounded-lg p-8 sm:p-12 text-center bg-[#F3F4F5] hover:border-[#0A4D91] transition-colors cursor-pointer flex flex-col items-center"
                    >
                      <CloudUpload className="w-10 h-10 sm:w-12 sm:h-12 mb-3 sm:mb-4 text-gray-400" />
                      {csvFile ? (
                        <p className="text-sm sm:text-base text-[#0A4D91] font-semibold mb-1">{csvFile.name}</p>
                      ) : (
                        <p className="text-sm sm:text-base text-gray-900 font-medium mb-2">Drop your CSV or XLSX file here</p>
                      )}
                      <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">Max file size: 10MB</p>
                      <span className="px-4 sm:px-6 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors text-sm sm:text-base">
                        {csvFile ? "Change File" : "Select File"}
                      </span>
                      <input
                        id="csv-upload"
                        type="file"
                        accept=".csv,.xlsx,.xls"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) handleCsvFile(file);
                        }}
                      />
                    </label>

                    {csvPreview.length > 0 && (
                      <div className="mt-4">
                        <h3 className="text-sm font-semibold text-gray-500 mb-3 uppercase">Preview ({csvPreview.length} rows)</h3>
                        <div className="w-full overflow-x-auto">
                          <table className="w-full border border-gray-200 rounded-lg">
                            <thead className="bg-[#F3F4F5]">
                              <tr>
                                {Object.keys(csvPreview[0]).map((col) => (
                                  <th key={col} className="px-3 py-2 text-left text-xs font-semibold text-gray-500 uppercase whitespace-nowrap">{col}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {csvPreview.map((row, i) => (
                                <tr key={i} className={i !== csvPreview.length - 1 ? "border-b border-gray-200" : ""}>
                                  {Object.values(row).map((val, j) => (
                                    <td key={j} className="px-3 py-2 text-xs sm:text-sm text-gray-700 whitespace-nowrap">{val}</td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between gap-3">
                    <button onClick={() => setCurrentStep(3)}
                      className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 order-2 sm:order-1">
                      Back
                    </button>
                    <button onClick={handleStep4Continue} disabled={loading}
                      className="bg-[#0A4D91] text-white px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-[#083d73] transition-colors order-1 sm:order-2 disabled:opacity-60">
                      {loading ? "Saving..." : "Continue"}
                    </button>
                  </div>
                </>
              )}

              {/* STEP 5 */}
              {currentStep === 5 && (
                <>
                  <div className="mb-6">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Scheduling Setup</h2>
                    <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">Define when your clinic is open and how patients interact with your calendar.</p>

                    <div className="mb-6">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Opening hours</h3>
                      <div className="space-y-3 sm:space-y-4">
                        {Object.entries(openingHours).map(([day, hours]) => (
                          <div key={day} className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4">
                            <div className="flex items-center justify-between mb-3 sm:mb-0">
                              <span className="text-sm font-medium text-gray-700 min-w-[80px]">{day}</span>
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" checked={hours.enabled}
                                  onChange={(e) => setOpeningHours({ ...openingHours, [day]: { ...hours, enabled: e.target.checked, from: e.target.checked ? "09:00 AM" : "Clinic is closed", until: e.target.checked ? "06:00 PM" : "" } })}
                                  className="sr-only peer" />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0A4D91]"></div>
                              </label>
                            </div>
                            {hours.enabled ? (
                              <div className="grid grid-cols-2 gap-2 sm:gap-3 mt-3 sm:mt-0 sm:flex sm:items-center sm:justify-end sm:gap-2">
                                <select value={hours.from} onChange={(e) => setOpeningHours({ ...openingHours, [day]: { ...hours, from: e.target.value } })}
                                  className="w-full px-3 text-gray-700 py-2 bg-[#F3F4F5] border-0 rounded-lg text-sm focus:ring-2 focus:ring-[#0A4D91] outline-none">
                                  <option>08:00 AM</option>
                                  <option>09:00 AM</option>
                                  <option>10:00 AM</option>
                                </select>
                                <div className="hidden sm:block text-xs text-gray-500">to</div>
                                <select value={hours.until} onChange={(e) => setOpeningHours({ ...openingHours, [day]: { ...hours, until: e.target.value } })}
                                  className="w-full px-3 py-2 bg-[#F3F4F5] border-0 rounded-lg text-sm focus:ring-2 text-gray-700 focus:ring-[#0A4D91] outline-none">
                                  <option>05:00 PM</option>
                                  <option>06:00 PM</option>
                                  <option>07:00 PM</option>
                                </select>
                              </div>
                            ) : (
                              <div className="mt-3 sm:mt-0">
                                <div className="px-3 py-2 bg-[#F3F4F5] rounded-lg text-sm text-gray-400 text-center">Clinic is closed</div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4">Booking settings</h3>
                      <div className="space-y-3 sm:space-y-4">
                        <div>
                          <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase">Minimum notice to book</label>
                          <select value={bookingSettings.minNotice} onChange={(e) => setBookingSettings({ ...bookingSettings, minNotice: e.target.value })}
                            className="w-full px-4 py-2.5 bg-[#F3F4F5] border-0 rounded-lg focus:ring-2 focus:ring-[#0A4D91] outline-none text-gray-900">
                            <option>24 hours</option>
                            <option>48 hours</option>
                            <option>1 week</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase">How far in advance can clients book?</label>
                          <select value={bookingSettings.advanceBooking} onChange={(e) => setBookingSettings({ ...bookingSettings, advanceBooking: e.target.value })}
                            className="w-full px-4 py-2.5 bg-[#F3F4F5] border-0 rounded-lg focus:ring-2 focus:ring-[#0A4D91] outline-none text-gray-900">
                            <option>1 month</option>
                            <option>3 months</option>
                            <option>6 months</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase">Cancellation policy</label>
                          <input type="text" value={bookingSettings.cancellationPolicy}
                            onChange={(e) => setBookingSettings({ ...bookingSettings, cancellationPolicy: e.target.value })}
                            className="w-full px-4 py-2.5 bg-[#F3F4F5] border-0 rounded-lg focus:ring-2 focus:ring-[#0A4D91] outline-none text-gray-900" />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 sm:p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <Info className="w-5 h-5 text-[#0A4D91] flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs sm:text-sm font-semibold text-[#0A4D91] mb-1">Need to set individual staff schedules?</p>
                        <p className="text-xs sm:text-sm text-gray-700">You can customize these settings in the dashboard or take a deep-dive in settings.</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between gap-3">
                    <button onClick={() => setCurrentStep(4)}
                      className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 order-2 sm:order-1">
                      Back
                    </button>
                    <button onClick={handleStep5Continue} disabled={loading}
                      className="bg-[#0A4D91] text-white px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-[#083d73] transition-colors order-1 sm:order-2 disabled:opacity-60">
                      {loading ? "Saving..." : "Continue"}
                    </button>
                  </div>
                </>
              )}

              {/* STEP 6 */}
              {currentStep === 6 && (
                <>
                  <div className="mb-6 sm:mb-8">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Choose your Clee plan</h2>
                    <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">Simple pricing. No lock-in contracts. Upgrade or change anytime.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
                      {[
                        { id: "starter", name: "Starter", desc: "Perfect for new providers getting started", price: "$89" },
                        { id: "growth", name: "Growth", desc: "For established clinics scaling fast bookings", price: "$179", recommended: true },
                        { id: "pro", name: "Pro", desc: "Full-scale for high-volume clinics and multi-location businesses", price: "$299" },
                        { id: "enterprise", name: "Enterprise", desc: "Custom pricing, bespoke features, dedicated onboarding + 24/7 support", price: "Contact us" },
                      ].map((plan) => (
                        <div key={plan.id} className={`border-${plan.recommended ? "4" : "2"} border-${plan.recommended ? "[#0A4D91]" : "gray-200"} rounded-lg p-4 sm:p-6 bg-white relative`}>
                          {plan.recommended && (
                            <div className="absolute -top-3 right-4 sm:right-6 bg-[#0A4D91] text-white px-3 sm:px-4 py-1 rounded-full text-xs font-semibold">Recommended</div>
                          )}
                          <div className="mb-4">
                            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1">{plan.name}</h3>
                            <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">{plan.desc}</p>
                            <div className="flex items-baseline gap-1">
                              <span className="text-3xl sm:text-4xl font-bold text-gray-900">{plan.price}</span>
                              {plan.id !== "enterprise" && <span className="text-gray-500">/mo</span>}
                            </div>
                          </div>
                          <button onClick={() => setSelectedPlan(plan.id)}
                            className={`w-full py-2.5 sm:py-3 ${selectedPlan === plan.id ? "bg-[#0A4D91] text-white" : plan.id === "enterprise" ? "border-2 border-gray-300 text-gray-700" : "bg-gray-100 text-gray-700"} font-semibold rounded-lg hover:opacity-90 transition-colors text-sm sm:text-base`}>
                            {selectedPlan === plan.id ? "Current Selection" : plan.id === "enterprise" ? "Talk to Sales" : `Select ${plan.name}`}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6 sm:mb-8 bg-[#F3F4F5] rounded-lg p-4 sm:p-6">
                    <div className="flex items-center gap-3 mb-4 sm:mb-6">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 text-[#0A4D91]" />
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-gray-900">Payout account</h3>
                        <p className="text-xs sm:text-sm text-gray-600">Where Clee deposits your earnings</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase">Account Name</label>
                        <input type="text" placeholder="e.g. Clee Medical Services" value={payoutAccount.accountName}
                          onChange={(e) => setPayoutAccount({ ...payoutAccount, accountName: e.target.value })}
                          className="w-full px-4 py-2.5 bg-white border-0 rounded-lg focus:ring-2 focus:ring-[#0A4D91] outline-none text-gray-900 placeholder-gray-400" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase">ABN</label>
                        <input type="text" placeholder="12 123 123 123" value={payoutAccount.abn}
                          onChange={(e) => setPayoutAccount({ ...payoutAccount, abn: e.target.value })}
                          className="w-full px-4 py-2.5 bg-white border-0 rounded-lg focus:ring-2 focus:ring-[#0A4D91] outline-none text-gray-900 placeholder-gray-400" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase">BSB</label>
                        <input type="text" placeholder="123-456" value={payoutAccount.bsb}
                          onChange={(e) => setPayoutAccount({ ...payoutAccount, bsb: e.target.value })}
                          className="w-full px-4 py-2.5 bg-white border-0 rounded-lg focus:ring-2 focus:ring-[#0A4D91] outline-none text-gray-900 placeholder-gray-400" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase">Account Number</label>
                        <input type="text" placeholder="12345678" value={payoutAccount.accountNumber}
                          onChange={(e) => setPayoutAccount({ ...payoutAccount, accountNumber: e.target.value })}
                          className="w-full px-4 py-2.5 bg-white border-0 rounded-lg focus:ring-2 focus:ring-[#0A4D91] outline-none text-gray-900 placeholder-gray-400" />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between gap-3">
                    <button onClick={() => setCurrentStep(5)}
                      className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 order-2 sm:order-1">
                      Back
                    </button>
                    <button onClick={handleFinish} disabled={loading}
                      className="bg-[#0A4D91] text-white px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-[#083d73] transition-colors order-1 sm:order-2 disabled:opacity-60">
                      {loading ? "Finishing..." : "Complete Setup"}
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Sidebar */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="bg-white rounded-lg p-6 sticky top-8">
                <h3 className="text-sm font-semibold text-gray-500 mb-4">YOUR SETUP</h3>
                <div className="mb-6">
                  <div className="relative w-20 h-20 mx-auto mb-3">
                    <svg className="w-20 h-20 transform -rotate-90">
                      <circle cx="40" cy="40" r="36" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                      <circle cx="40" cy="40" r="36" stroke="#0A4D91" strokeWidth="8" fill="none" strokeDasharray={`${(currentStep / 6) * 226} 226`} />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xl font-bold text-[#0A4D91]">{Math.round((currentStep / 6) * 100)}%</span>
                    </div>
                  </div>
                  <p className="text-center font-semibold text-gray-900">Step {currentStep} of 6</p>
                  <p className="text-center text-sm text-gray-500">Profile Setup</p>
                </div>
                <div className="space-y-3 mb-6">
                  {setupSteps.map((step, index) => (
                    <div key={index} className="flex items-center gap-3">
                      {step.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-[#0A4D91]" />
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                      )}
                      <span className={`text-sm ${step.completed ? "text-gray-900 font-medium" : "text-gray-500"}`}>
                        {step.label}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mb-6 p-4 bg-[#E2E8F0] rounded-lg">
                  <p className="text-lg font-semibold text-[#0A4D91] mb-1">PRO TIP</p>
                  <p className="text-sm text-[#0A4D91]">
                    Adding a high-quality cover photo increases client trust by up to 40%.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
