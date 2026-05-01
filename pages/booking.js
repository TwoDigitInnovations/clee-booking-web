import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ChevronDown, ChevronUp, Info, MapPin, ChevronLeft, ChevronRight, Calendar, Clock, AlertCircle, CreditCard, CheckCircle, Lock, User } from "lucide-react";
import { parsePhoneNumber, isValidPhoneNumber } from 'libphonenumber-js';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { createBooking } from "../redux/actions/bookingActions";
import { fetchServices, fetchMostPopularServices } from "../redux/actions/servicesActions";
import { getCalendarSettings } from "../redux/actions/calendarSettingsActions";
import { getBookingSettings } from "../redux/actions/bookingSettingsActions";
import { fetchStaff } from "../redux/actions/staffActions";
import BookingLoader from "../components/BookingLoader";
import SuccessModal from "../components/SuccessModal";
import ErrorModal from "../components/ErrorModal";

export default function Booking() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { services: reduxServices, loading: servicesLoading } = useAppSelector(state => state.services);
  const { loading: bookingLoading } = useAppSelector(state => state.booking);
  const { settings: calendarSettings } = useAppSelector(state => state.calendarSettings);
  const { settings: bookingSettings } = useAppSelector(state => state.bookingSettings);
  const { staff: staffList, loading: staffLoading } = useAppSelector(state => state.staff);
  
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [activeTab, setActiveTab] = useState("select");
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedTimezone, setSelectedTimezone] = useState('(GMT+10:00) Canberra, Melbourne, Sydney');
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 3)); 
  const [expandedSections, setExpandedSections] = useState({});
  const [expandedPackages, setExpandedPackages] = useState({});
  const [categories, setCategories] = useState([]);
  const [popularServices, setPopularServices] = useState([]);
  

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobilePhone: '',
    otherPhone: '',
    comments: '',
    rememberDetails: false,
  });

 
  const [paymentData, setPaymentData] = useState({
    paymentMethod: 'card',
    cardNumber: '',
    expiry: '',
    cvc: '',
    nameOnCard: '',
  });

  const [bookingComplete, setBookingComplete] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [phoneErrors, setPhoneErrors] = useState({
    mobilePhone: '',
    otherPhone: ''
  });
  const [emailError, setEmailError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      console.log('🟢 [Booking Page] Starting data fetch...');
      
      await dispatch(fetchServices());
      
      console.log('🟢 [Booking Page] Fetching calendar settings...');
      const calendarResult = await dispatch(getCalendarSettings());
      console.log('🟢 [Booking Page] Calendar settings result:', calendarResult);
      
      console.log('🟢 [Booking Page] Fetching booking settings...');
      const bookingSettingsResult = await dispatch(getBookingSettings());
      console.log('🟢 [Booking Page] Booking settings result:', bookingSettingsResult);
      
      console.log('🟢 [Booking Page] Fetching staff list...');
      const staffResult = await dispatch(fetchStaff());
      console.log('🟢 [Booking Page] Staff result:', staffResult);
      
      const result = await dispatch(fetchMostPopularServices());
      if (result.success) {
        setPopularServices(result.data);
      }
    };
    
    fetchData();
    
    // Restore booking state from localStorage
    const savedState = localStorage.getItem('bookingState');
    if (savedState) {
      try {
        const state = JSON.parse(savedState);
        setSelectedServices(state.selectedServices || []);
        setSelectedExtras(state.selectedExtras || []);
        setSelectedStaff(state.selectedStaff || null);
        setSelectedDate(state.selectedDate || null);
        setSelectedTime(state.selectedTime || null);
        setFormData(state.formData || formData);
        setPaymentData(state.paymentData || paymentData);
        setCurrentStep(state.currentStep || 1);
        // Clear localStorage after restoring
        localStorage.removeItem('bookingState');
      } catch (error) {
        console.error('Error restoring booking state:', error);
      }
    }
  }, [dispatch]);

  useEffect(() => {
    if (reduxServices && reduxServices.length > 0) {
      const uniqueCategories = {};
      reduxServices.forEach(service => {
        if (service.category && service.category._id) {
          uniqueCategories[service.category._id] = service.category.name;
        }
      });
      
      const categoryList = Object.keys(uniqueCategories).map(id => ({
        id,
        name: uniqueCategories[id]
      }));
      
      setCategories(categoryList);
      
      const initialExpanded = {};
      categoryList.forEach(cat => {
        initialExpanded[cat.id] = true;
      });
      initialExpanded.staff = true; // Staff section by default open
      setExpandedSections(initialExpanded);
    }
  }, [reduxServices, selectedServices, popularServices]);

  // Auto-skip staff selection if disabled
  useEffect(() => {
    if (currentStep === 2 && bookingSettings?.data?.staffSelection !== 'Clients can choose any staff') {
      setCurrentStep(3); // Skip to calendar
    }
  }, [currentStep, bookingSettings]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Email validation
    if (name === 'email') {
      setEmailError('');
      if (value.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          setEmailError('Please enter a valid email address');
        }
      }
    }
    
    // Phone validation for mobilePhone and otherPhone
    if (name === 'mobilePhone' || name === 'otherPhone') {
      // Clear previous error
      setPhoneErrors(prev => ({ ...prev, [name]: '' }));
      
      // Only validate if value is not empty
      if (value.trim()) {
        try {
          // Check if valid phone number
          if (!isValidPhoneNumber(value)) {
            setPhoneErrors(prev => ({ 
              ...prev, 
              [name]: 'Please enter a valid phone number with country code (e.g., +61 4xx xxx xxx)' 
            }));
          } else {
            // Parse and validate length
            const phoneNumber = parsePhoneNumber(value);
            if (phoneNumber) {
              const nationalNumber = phoneNumber.nationalNumber;
              // Min 7 digits, Max 15 digits (international standard)
              if (nationalNumber.length < 7) {
                setPhoneErrors(prev => ({ 
                  ...prev, 
                  [name]: 'Phone number is too short (minimum 7 digits)' 
                }));
              } else if (nationalNumber.length > 15) {
                setPhoneErrors(prev => ({ 
                  ...prev, 
                  [name]: 'Phone number is too long (maximum 15 digits)' 
                }));
              }
            }
          }
        } catch (error) {
          setPhoneErrors(prev => ({ 
            ...prev, 
            [name]: 'Invalid phone number format. Please include country code (e.g., +61)' 
          }));
        }
      }
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBookingSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Get initial status from booking settings (guest mode safe)
      let initialStatus = bookingSettings?.data?.initialStatus || calendarSettings?.data?.appointmentSettings?.initialStatus || 'Confirmed';
      
      // Capitalize first letter to match enum values (Confirmed, Pending, Cancelled, Completed)
      if (initialStatus && typeof initialStatus === 'string') {
        initialStatus = initialStatus.charAt(0).toUpperCase() + initialStatus.slice(1).toLowerCase();
      }
      
      console.log('🟢 [Booking Submit] Initial Status:', initialStatus);
      
      const bookingData = {
        customer: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.mobilePhone,
          otherPhone: formData.otherPhone,
        },
        services: selectedServices.map(s => s._id || s),
        extras: selectedExtras.map(e => e._id || e),
        staff: selectedStaff?._id || null,
        date: selectedDate,
        time: selectedTime,
        comments: formData.comments,
        paymentMethod: paymentData.paymentMethod,
        depositAmount: 99,
        totalAmount: getTotal(),
        status: initialStatus,
      };

      const result = await dispatch(createBooking(bookingData));
      
      setIsSubmitting(false);
      
      if (result.success) {
        setShowSuccessModal(true);
        setBookingComplete(true);
      } else {
        setErrorMessage(result.message || 'Booking failed. Please try again.');
        setShowErrorModal(true);
      }
    } catch (error) {
      setIsSubmitting(false);
      console.error('Booking error:', error);
      setErrorMessage('An error occurred while creating your booking.');
      setShowErrorModal(true);
    }
  };

  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    });
  };

  const togglePackage = (packageId) => {
    setExpandedPackages({
      ...expandedPackages,
      [packageId]: !expandedPackages[packageId],
    });
  };

  const toggleService = (service) => {
    const serviceId = service._id || service;
    const existingIndex = selectedServices.findIndex(s => (s._id || s) === serviceId);
    
    if (existingIndex !== -1) {
      setSelectedServices(selectedServices.filter((s, idx) => idx !== existingIndex));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const toggleExtra = (extra) => {
    const extraId = extra._id || extra;
    const existingIndex = selectedExtras.findIndex(e => (e._id || e) === extraId);
    
    if (existingIndex !== -1) {
      setSelectedExtras(selectedExtras.filter((e, idx) => idx !== existingIndex));
    } else {
      setSelectedExtras([...selectedExtras, extra]);
    }
  };

  const getServicesByCategory = (categoryId) => {
    return reduxServices.filter(service => service.category?._id === categoryId);
  };

  const getAllAddons = () => {
    const addons = [];
    reduxServices.forEach(service => {
      if (service.availableAddons && service.availableAddons.length > 0) {
        service.availableAddons.forEach(addon => {
          addons.push({
            ...addon,
            serviceId: service._id,
            serviceName: service.name
          });
        });
      }
    });
    return addons;
  };

  const getTotal = () => {
    let total = 0;
    
    selectedServices.forEach((service) => {
      if (service && typeof service === 'object') {
        total += service.price || 0;
      } else {
        // Fallback for old ID-based system
        const serviceObj = reduxServices.find((s) => s._id === service);
        if (serviceObj) total += serviceObj.price || 0;
      }
    });
    
    selectedExtras.forEach((extra) => {
      if (extra && typeof extra === 'object') {
        total += parseFloat(extraObj.price) || 0;
      } else {
        // Fallback for old ID-based system
        const allAddons = getAllAddons();
        const addon = allAddons.find(a => a._id === extra);
        if (addon) total += parseFloat(addon.price) || 0;
      }
    });
    
    return total;
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    return { daysInMonth, startingDayOfWeek };
  };

  const formatMonthYear = (date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const changeMonth = (direction) => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + direction, 1));
  };

  // Generate dynamic time slots based on calendar settings
  const generateTimeSlots = () => {
    console.log('🟡 [Time Slots] Generating time slots...');
    console.log('🟡 [Time Slots] Calendar Settings:', calendarSettings);
    
    if (!calendarSettings || !calendarSettings.data) {
      console.log('⚠️ [Time Slots] No calendar settings found, using fallback');
      // Fallback to hardcoded slots if settings not loaded
      return {
        morning: ['10:00am', '11:00am'],
        afternoon: ['1:00pm', '2:30pm', '3:00pm'],
      };
    }

    const settings = calendarSettings.data;
    const startTime = settings.displaySettings?.calendarStartTime || '9:00';
    const increment = settings.displaySettings?.timeIncrement || '15 minutes';
    
    console.log('🟡 [Time Slots] Start Time:', startTime);
    console.log('🟡 [Time Slots] Time Increment:', increment);
    
    // Parse increment to minutes
    const incrementMinutes = parseInt(increment.split(' ')[0]);
    
    // Parse start time
    const [startHour] = startTime.split(':').map(Number);
    
    const slots = { morning: [], afternoon: [] };
    
    // Generate slots from start time to 9 PM (21:00)
    for (let hour = startHour; hour < 21; hour++) {
      for (let min = 0; min < 60; min += incrementMinutes) {
        const timeStr = `${hour > 12 ? hour - 12 : hour}:${min.toString().padStart(2, '0')}${hour >= 12 ? 'pm' : 'am'}`;
        
        if (hour < 12) {
          slots.morning.push(timeStr);
        } else {
          slots.afternoon.push(timeStr);
        }
      }
    }
    
    console.log('🟡 [Time Slots] Generated Morning Slots:', slots.morning);
    console.log('🟡 [Time Slots] Generated Afternoon Slots:', slots.afternoon);
    
    return slots;
  };

  const timeSlots = generateTimeSlots();

  // Get week days based on calendar settings
  const getWeekDays = () => {
    const startOfWeek = calendarSettings?.data?.displaySettings?.startOfWeek || 'Monday';
    
    console.log('🟣 [Week Days] Start of Week:', startOfWeek);
    
    if (startOfWeek === 'Sunday') {
      console.log('🟣 [Week Days] Using Sunday start');
      return ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    }
    console.log('🟣 [Week Days] Using Monday start');
    return ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  };

  return (
    <div className="min-h-screen bg-[#F8F6F6] pt-16 md:pt-20">
      {/* Check if bookings are disabled */}
      {bookingSettings?.data?.bookingsOn === false ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <AlertCircle className="w-16 h-16 text-amber-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Online Bookings Currently Unavailable</h2>
            <p className="text-gray-600 mb-6">
              We're not accepting online bookings at the moment. Please contact us directly to schedule your appointment.
            </p>
            <p className="text-sm text-gray-500">
              For assistance, please call us or visit our location.
            </p>
          </div>
        </div>
      ) : (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">{/* Opening bracket added */}
       
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full ${currentStep >= 1 ? 'bg-[#0A4D91] text-white' : 'bg-gray-200 text-gray-500'} flex items-center justify-center text-sm font-semibold`}>
                1
              </div>
              <span className={`text-sm font-medium ${currentStep >= 1 ? 'text-gray-900' : 'text-gray-500'} hidden sm:inline`}>Services</span>
            </div>
            <div className="flex-1 h-0.5 bg-gray-200 mx-4"></div>
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full ${currentStep >= 3 ? 'bg-[#0A4D91] text-white' : 'bg-gray-200 text-gray-500'} flex items-center justify-center text-sm font-semibold`}>
                2
              </div>
              <span className={`text-sm font-medium ${currentStep >= 3 ? 'text-gray-900' : 'text-gray-500'} hidden sm:inline`}>
                Date & time
              </span>
            </div>
            <div className="flex-1 h-0.5 bg-gray-200 mx-4"></div>
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full ${currentStep >= 4 ? 'bg-[#0A4D91] text-white' : 'bg-gray-200 text-gray-500'} flex items-center justify-center text-sm font-semibold`}>
                3
              </div>
              <span className={`text-sm font-medium ${currentStep >= 4 ? 'text-gray-900' : 'text-gray-500'} hidden sm:inline`}>
                Your details
              </span>
            </div>
            <div className="flex-1 h-0.5 bg-gray-200 mx-4"></div>
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full ${currentStep >= 5 ? 'bg-[#0A4D91] text-white' : 'bg-gray-200 text-gray-500'} flex items-center justify-center text-sm font-semibold`}>
                4
              </div>
              <span className={`text-sm font-medium ${currentStep >= 5 ? 'text-gray-900' : 'text-gray-500'} hidden sm:inline`}>
                Payment
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
          <div className="lg:col-span-2 space-y-4">
            {currentStep === 1 ? (
              <>
               
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-start gap-3">
              <Info className="w-5 h-5 text-[#0A4D91] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Been here before?</span>{" "}
                  <a href="#" className="text-[#0A4D91] underline">
                    Quickly rebook your previous appointments
                  </a>
                </p>
              </div>
            </div>

       
            <div className="bg-white rounded-lg shadow-sm">
              <div
                className="p-4 flex items-center justify-between cursor-pointer border-b"
                onClick={() => toggleSection("services")}
              >
                <h2 className="text-lg font-semibold text-gray-900">Services</h2>
                {expandedSections.services ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </div>

            
              <div className="flex border-b">
                <button
                  className={`flex-1 py-3 text-sm font-medium transition-colors ${
                    activeTab === "select"
                      ? "text-white bg-[#0A4D91]"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                  onClick={() => setActiveTab("select")}
                >
                  Select services
                </button>
                <button
                  className={`flex-1 py-3 text-sm font-medium transition-colors ${
                    activeTab === "popular"
                      ? "text-white bg-[#0A4D91]"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                  onClick={() => setActiveTab("popular")}
                >
                  Most popular ⭐
                </button>
              </div>

              <div className="p-4 space-y-6">
                {activeTab === "select" ? (
                  <>
                    {categories.map((category) => {
                      const categoryServices = getServicesByCategory(category.id);
                      if (categoryServices.length === 0) return null;
                      
                      return (
                        <div key={category.id} className="mb-6">
                          <div
                            className="flex items-center justify-between cursor-pointer mb-4"
                            onClick={() => toggleSection(category.id)}
                          >
                            <h3 className="text-sm font-bold text-[#0A4D91] uppercase tracking-wide">
                              {category.name}
                            </h3>
                            {expandedSections[category.id] ? (
                              <ChevronUp className="w-4 h-4 text-gray-400" />
                            ) : (
                              <ChevronDown className="w-4 h-4 text-gray-400" />
                            )}
                          </div>

                          {expandedSections[category.id] && (
                            <div className="space-y-4">
                              {categoryServices.map((service) => (
                                <div
                                  key={service._id}
                                  className={`border-2 rounded-lg p-4 transition-colors cursor-pointer ${
                                    selectedServices.some(s => (s._id || s) === service._id)
                                      ? "border-[#0A4D91] bg-blue-50"
                                      : "border-gray-200 hover:border-[#0A4D91]"
                                  }`}
                                  onClick={() => toggleService(service)}
                                >
                                  <div className="flex items-start gap-3">
                                    <div className="flex items-center justify-center flex-shrink-0 mt-1">
                                      <input
                                        type="radio"
                                        checked={selectedServices.some(s => (s._id || s) === service._id)}
                                        onChange={() => toggleService(service)}
                                        className="w-5 h-5 text-[#0A4D91] border-gray-300 focus:ring-[#0A4D91] cursor-pointer"
                                        onClick={(e) => e.stopPropagation()}
                                      />
                                    </div>
                                    <div className="flex-1">
                                      <div className="flex justify-between items-start mb-2">
                                        <div className="flex-1">
                                          <h4 className="font-semibold text-gray-900 mb-1">
                                            {service.name}
                                          </h4>
                                          <p className="text-sm text-gray-500">{service.duration} min</p>
                                        </div>
                                        <div className="text-right">
                                          <p className="text-lg font-bold text-gray-900">
                                            ${service.price}
                                          </p>
                                        </div>
                                      </div>

                                      {service.description && (
                                        <p className="text-xs text-gray-600 mb-2">{service.description}</p>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </>
                ) : (
                  <>
                   
                    <div className="space-y-6">
                      {popularServices && popularServices.length > 0 ? popularServices.map((pkg) => (
                        <div key={pkg._id} className="border-l-4 border-[#0A4D91] bg-gray-50 rounded-lg overflow-hidden">
                          <div className="p-4">
                            <div className="flex justify-between items-start mb-2">
                              <div className="flex-1">
                                <h3 className="text-lg font-bold text-gray-900 mb-1">{pkg.name}</h3>
                                <p className="text-sm text-gray-500 mt-1">
                                  {pkg.duration} min
                                </p>
                              </div>
                              <div className="text-right">
                                {pkg.originalPrice && (
                                  <p className="text-sm text-gray-400 line-through">${pkg.originalPrice}</p>
                                )}
                                <p className="text-2xl font-bold text-gray-900">${pkg.price}</p>
                              </div>
                            </div>

                         
                            <div className="flex gap-4 mt-4 mb-3">
                              {pkg.pancakePricing && pkg.pancakePricing.length > 0 && pkg.pancakePricing.map((combo, idx) => (
                                <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                                  <div className="w-2 h-2 rounded-full bg-[#0A4D91]"></div>
                                  <span>{combo.name}</span>
                                  <span className="text-gray-400">${combo.combinedPrice}</span>
                                </div>
                              ))}
                            </div>

                          
                            {expandedPackages[pkg.id] && pkg.description && (
                              <div className="mt-4 pt-4 border-t border-gray-200">
                                <h4 className="text-sm font-semibold text-gray-700 mb-2">
                                  WHAT DOES THIS INCLUDE?
                                </h4>
                                <p className="text-sm text-gray-600 mb-4">{pkg.description}</p>
                                
                                {pkg.benefits && (
                                  <div className="space-y-2">
                                    {pkg.benefits.map((benefit, idx) => (
                                      <div key={idx} className="flex items-center gap-2">
                                        <svg className="w-5 h-5 text-[#0A4D91]" fill="currentColor" viewBox="0 0 20 20">
                                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-sm text-gray-700">{benefit}</span>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            )}

                         
                            <div className="flex items-center justify-between mt-4">
                              {pkg.description && (
                                <button
                                  onClick={() => togglePackage(pkg.id)}
                                  className="text-sm text-[#0A4D91] hover:underline flex items-center gap-1"
                                >
                                  {expandedPackages[pkg.id] ? (
                                    <>
                                      <ChevronUp className="w-4 h-4" />
                                      Hide details
                                    </>
                                  ) : (
                                    <>
                                      <ChevronDown className="w-4 h-4" />
                                      What does this include?
                                    </>
                                  )}
                                </button>
                              )}
                              <button
                                onClick={() => toggleService(pkg)}
                                className={`ml-auto px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                  selectedServices.some(s => (s._id || s) === pkg._id)
                                    ? "bg-green-100 text-green-700 border border-green-300"
                                    : "bg-blue-50 text-[#0A4D91] border border-[#0A4D91] hover:bg-[#0A4D91] hover:text-white"
                                }`}
                              >
                                {selectedServices.some(s => (s._id || s) === pkg._id) ? "Added to booking" : "Add to booking"}
                              </button>
                            </div>
                          </div>
                        </div>
                      )) : (
                        <div className="text-center py-8 text-gray-400">
                          <p>No popular services available yet</p>
                        </div>
                      )}

                      {popularServices && popularServices.length > 0 && (
                        <div className="mt-8">
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Add-ons</h3>
                          <div className="space-y-3">
                            {getAllAddons().map((addition) => (
                              <div
                                key={addition._id}
                                className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:border-[#0A4D91] transition-colors"
                              >
                                <div className="flex items-center gap-3">
                                  <div>
                                    <h4 className="font-medium text-gray-900">{addition.name}</h4>
                                    <p className="text-sm text-gray-500">{addition.duration} • ${addition.price}</p>
                                  </div>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                  <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    checked={selectedExtras.includes(addition._id)}
                                    onChange={() => toggleExtra(addition._id)}
                                  />
                                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0A4D91]"></div>
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>

          
            <div className="bg-white rounded-lg shadow-sm">
              <div
                className="p-4 flex items-center justify-between cursor-pointer border-b"
                onClick={() => toggleSection("extras")}
              >
                <h2 className="text-lg font-semibold text-gray-900">Extras</h2>
                {expandedSections.extras ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </div>

              {expandedSections.extras && (
                <div className="p-4 space-y-3">
                  {getAllAddons().map((extra) => (
                    <div
                      key={extra._id}
                      className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-[#0A4D91] transition-colors"
                    >
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 mb-1">{extra.name}</h4>
                        <p className="text-sm text-gray-500">{extra.description}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <p className="text-lg font-bold text-gray-900">+${extra.price}</p>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={selectedExtras.includes(extra._id)}
                            onChange={() => toggleExtra(extra._id)}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0A4D91]"></div>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
              </>
            ) : currentStep === 2 ? (
              <>
                {/* Step 2: Staff Selection (Conditional) */}
                {bookingSettings?.data?.staffSelection === 'Clients can choose any staff' ? (
                  <>
                    <button
                      onClick={() => setCurrentStep(1)}
                      className="flex items-center gap-2 text-[#0A4D91] hover:underline mb-4"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Back to services
                    </button>

                    <div className="bg-white rounded-lg shadow-sm p-6">
                      <h2 className="text-2xl font-bold text-[#0A4D91] mb-6">Select Staff Member</h2>
                      
                      <div className="space-y-3">
                        {staffLoading ? (
                          <div className="text-center py-8">
                            <p className="text-gray-400">Loading staff...</p>
                          </div>
                        ) : staffList && staffList.length > 0 ? (
                          <>
                            {/* No Preference Option */}
                            <div
                              className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                                selectedStaff === null
                                  ? 'border-[#0A4D91] bg-blue-50'
                                  : 'border-gray-200 hover:border-[#0A4D91]'
                              }`}
                              onClick={() => setSelectedStaff(null)}
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                                  <User className="w-6 h-6 text-gray-400" />
                                </div>
                                <div>
                                  <h4 className="font-medium text-gray-900">No preference</h4>
                                  <p className="text-sm text-gray-500">Any available staff member</p>
                                </div>
                              </div>
                              <input
                                type="radio"
                                checked={selectedStaff === null}
                                onChange={() => setSelectedStaff(null)}
                                className="w-5 h-5 text-[#0A4D91] border-gray-300 focus:ring-[#0A4D91]"
                                onClick={(e) => e.stopPropagation()}
                              />
                            </div>

                            {/* Staff Members */}
                            {staffList.map((staff) => {
                              const firstName = staff.firstName || staff.fullname?.split(' ')[0] || '';
                              const lastName = staff.lastName || staff.fullname?.split(' ').slice(1).join(' ') || '';
                              
                              return (
                              <div
                                key={staff._id}
                                className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                                  selectedStaff?._id === staff._id
                                    ? 'border-[#0A4D91] bg-blue-50'
                                    : 'border-gray-200 hover:border-[#0A4D91]'
                                }`}
                                onClick={() => setSelectedStaff(staff)}
                              >
                                <div className="flex items-center gap-3">
                                  <div className="w-12 h-12 rounded-full bg-[#0A4D91] flex items-center justify-center text-white font-semibold">
                                    {firstName?.[0]}{lastName?.[0]}
                                  </div>
                                  <div>
                                    <h4 className="font-medium text-gray-900">
                                      {firstName} {lastName}
                                    </h4>
                                    {staff.email && (
                                      <p className="text-sm text-gray-500">{staff.email}</p>
                                    )}
                                  </div>
                                </div>
                                <input
                                  type="radio"
                                  checked={selectedStaff?._id === staff._id}
                                  onChange={() => setSelectedStaff(staff)}
                                  className="w-5 h-5 text-[#0A4D91] border-gray-300 focus:ring-[#0A4D91]"
                                  onClick={(e) => e.stopPropagation()}
                                />
                              </div>
                              );
                            })}
                          </>
                        ) : (
                          <div className="text-center py-8">
                            <p className="text-gray-400">No staff members available</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                ) : null}
              </>
            ) : currentStep === 3 ? (
              <>
                {/* Step 3: Date & Time (Calendar) */}
                <button
                  onClick={() => {
                    // Go back to staff selection if enabled, otherwise services
                    if (bookingSettings?.data?.staffSelection === 'Clients can choose any staff') {
                      setCurrentStep(2);
                    } else {
                      setCurrentStep(1);
                    }
                  }}
                  className="flex items-center gap-2 text-[#0A4D91] hover:underline mb-4"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back to {bookingSettings?.data?.staffSelection === 'Clients can choose any staff' ? 'staff selection' : 'services'}
                </button>

                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-2xl font-bold text-[#0A4D91] mb-6">Select Date & Time</h2>

              
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      LOCAL TIMEZONE
                    </label>
                    <div className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg bg-white">
                      <MapPin className="w-5 h-5 text-[#0A4D91]" />
                      <select 
                        className="flex-1 bg-transparent border-none outline-none text-gray-700 cursor-pointer"
                        value={selectedTimezone}
                        onChange={(e) => setSelectedTimezone(e.target.value)}
                      >
                        <option>(GMT-12:00) International Date Line West</option>
                        <option>(GMT-11:00) Midway Island, Samoa</option>
                        <option>(GMT-10:00) Hawaii</option>
                        <option>(GMT-09:00) Alaska</option>
                        <option>(GMT-08:00) Pacific Time (US & Canada)</option>
                        <option>(GMT-08:00) Tijuana, Baja California</option>
                        <option>(GMT-07:00) Arizona</option>
                        <option>(GMT-07:00) Mountain Time (US & Canada)</option>
                        <option>(GMT-07:00) Chihuahua, La Paz, Mazatlan</option>
                        <option>(GMT-06:00) Central Time (US & Canada)</option>
                        <option>(GMT-06:00) Saskatchewan</option>
                        <option>(GMT-06:00) Guadalajara, Mexico City, Monterrey</option>
                        <option>(GMT-06:00) Central America</option>
                        <option>(GMT-05:00) Eastern Time (US & Canada)</option>
                        <option>(GMT-05:00) Indiana (East)</option>
                        <option>(GMT-05:00) Bogota, Lima, Quito</option>
                        <option>(GMT-04:00) Atlantic Time (Canada)</option>
                        <option>(GMT-04:00) Caracas, La Paz</option>
                        <option>(GMT-04:00) Santiago</option>
                        <option>(GMT-03:30) Newfoundland</option>
                        <option>(GMT-03:00) Brasilia</option>
                        <option>(GMT-03:00) Buenos Aires, Georgetown</option>
                        <option>(GMT-03:00) Greenland</option>
                        <option>(GMT-02:00) Mid-Atlantic</option>
                        <option>(GMT-01:00) Azores</option>
                        <option>(GMT-01:00) Cape Verde Is.</option>
                        <option>(GMT+00:00) Dublin, Edinburgh, Lisbon, London</option>
                        <option>(GMT+00:00) Casablanca, Monrovia</option>
                        <option>(GMT+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague</option>
                        <option>(GMT+01:00) Sarajevo, Skopje, Warsaw, Zagreb</option>
                        <option>(GMT+01:00) Brussels, Copenhagen, Madrid, Paris</option>
                        <option>(GMT+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna</option>
                        <option>(GMT+01:00) West Central Africa</option>
                        <option>(GMT+02:00) Amman</option>
                        <option>(GMT+02:00) Athens, Bucharest, Istanbul</option>
                        <option>(GMT+02:00) Beirut</option>
                        <option>(GMT+02:00) Cairo</option>
                        <option>(GMT+02:00) Harare, Pretoria</option>
                        <option>(GMT+02:00) Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius</option>
                        <option>(GMT+02:00) Jerusalem</option>
                        <option>(GMT+02:00) Minsk</option>
                        <option>(GMT+02:00) Windhoek</option>
                        <option>(GMT+03:00) Kuwait, Riyadh</option>
                        <option>(GMT+03:00) Baghdad</option>
                        <option>(GMT+03:00) Nairobi</option>
                        <option>(GMT+03:00) Moscow, St. Petersburg, Volgograd</option>
                        <option>(GMT+03:30) Tehran</option>
                        <option>(GMT+04:00) Abu Dhabi, Muscat</option>
                        <option>(GMT+04:00) Baku</option>
                        <option>(GMT+04:00) Yerevan</option>
                        <option>(GMT+04:30) Kabul</option>
                        <option>(GMT+05:00) Ekaterinburg</option>
                        <option>(GMT+05:00) Islamabad, Karachi, Tashkent</option>
                        <option>(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi</option>
                        <option>(GMT+05:30) Sri Jayawardenepura</option>
                        <option>(GMT+05:45) Kathmandu</option>
                        <option>(GMT+06:00) Almaty, Novosibirsk</option>
                        <option>(GMT+06:00) Astana, Dhaka</option>
                        <option>(GMT+06:30) Yangon (Rangoon)</option>
                        <option>(GMT+07:00) Bangkok, Hanoi, Jakarta</option>
                        <option>(GMT+07:00) Krasnoyarsk</option>
                        <option>(GMT+08:00) Beijing, Chongqing, Hong Kong, Urumqi</option>
                        <option>(GMT+08:00) Kuala Lumpur, Singapore</option>
                        <option>(GMT+08:00) Irkutsk, Ulaan Bataar</option>
                        <option>(GMT+08:00) Perth</option>
                        <option>(GMT+08:00) Taipei</option>
                        <option>(GMT+09:00) Osaka, Sapporo, Tokyo</option>
                        <option>(GMT+09:00) Seoul</option>
                        <option>(GMT+09:00) Yakutsk</option>
                        <option>(GMT+09:30) Adelaide</option>
                        <option>(GMT+09:30) Darwin</option>
                        <option>(GMT+10:00) Brisbane</option>
                        <option>(GMT+10:00) Canberra, Melbourne, Sydney</option>
                        <option>(GMT+10:00) Hobart</option>
                        <option>(GMT+10:00) Guam, Port Moresby</option>
                        <option>(GMT+10:00) Vladivostok</option>
                        <option>(GMT+11:00) Magadan, Solomon Is., New Caledonia</option>
                        <option>(GMT+12:00) Auckland, Wellington</option>
                        <option>(GMT+12:00) Fiji, Kamchatka, Marshall Is.</option>
                        <option>(GMT+13:00) Nuku'alofa</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                 
                    <div>
                      <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {formatMonthYear(currentMonth)}
                          </h3>
                          <div className="flex gap-2">
                            <button
                              onClick={() => changeMonth(-1)}
                              className="p-1 hover:bg-gray-100 rounded"
                            >
                              <ChevronLeft className="w-5 h-5 text-gray-600" />
                            </button>
                            <button
                              onClick={() => changeMonth(1)}
                              className="p-1 hover:bg-gray-100 rounded"
                            >
                              <ChevronRight className="w-5 h-5 text-gray-600" />
                            </button>
                          </div>
                        </div>

                       
                        <div className="grid grid-cols-7 gap-1">
                          {getWeekDays().map((day) => (
                            <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
                              {day}
                            </div>
                          ))}
                          
                          {(() => {
                            const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentMonth);
                            const days = [];
                            
                            // Adjust starting day based on calendar settings
                            const startOfWeek = calendarSettings?.data?.displaySettings?.startOfWeek || 'Monday';
                            let adjustedStart;
                            
                            if (startOfWeek === 'Sunday') {
                              // Sunday = 0, so no adjustment needed
                              adjustedStart = startingDayOfWeek;
                            } else {
                              // Monday = 1, adjust by subtracting 1 (Sunday becomes 6)
                              adjustedStart = startingDayOfWeek === 0 ? 6 : startingDayOfWeek - 1;
                            }
                            
                          
                            for (let i = 0; i < adjustedStart; i++) {
                              days.push(
                                <div key={`empty-${i}`} className="aspect-square"></div>
                              );
                            }
                            
                          
                            for (let day = 1; day <= daysInMonth; day++) {
                              const dateStr = `${currentMonth.getFullYear()}-${currentMonth.getMonth() + 1}-${day}`;
                              const isSelected = selectedDate === dateStr;
                              const isToday = day === 11; 
                              
                              days.push(
                                <button
                                  key={day}
                                  onClick={() => setSelectedDate(dateStr)}
                                  className={`aspect-square flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                                    isSelected
                                      ? 'bg-[#0A4D91] text-white'
                                      : isToday
                                      ? 'bg-blue-100 text-[#0A4D91] hover:bg-blue-200'
                                      : 'hover:bg-gray-100 text-gray-700'
                                  }`}
                                >
                                  {day}
                                </button>
                              );
                            }
                            
                            return days;
                          })()}
                        </div>
                      </div>
                    </div>

                
                    <div>
                      {selectedDate ? (
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            Select a time for Sat, 11 Apr
                          </h3>
                          
                    
                          <div className="mb-6">
                            <h4 className="text-sm font-semibold text-gray-500 uppercase mb-3">
                              MORNING
                            </h4>
                            <div className="grid grid-cols-2 gap-3">
                              {timeSlots.morning.map((time) => (
                                <button
                                  key={time}
                                  onClick={() => setSelectedTime(time)}
                                  className={`py-3 px-4 rounded-lg border-2 font-medium transition-colors ${
                                    selectedTime === time
                                      ? 'border-[#0A4D91] bg-blue-50 text-[#0A4D91]'
                                      : 'border-gray-200 hover:border-[#0A4D91] text-gray-700'
                                  }`}
                                >
                                  {time}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Afternoon */}
                          <div>
                            <h4 className="text-sm font-semibold text-gray-500 uppercase mb-3">
                              AFTERNOON
                            </h4>
                            <div className="grid grid-cols-2 gap-3">
                              {timeSlots.afternoon.map((time) => (
                                <button
                                  key={time}
                                  onClick={() => setSelectedTime(time)}
                                  className={`py-3 px-4 rounded-lg border-2 font-medium transition-colors ${
                                    selectedTime === time
                                      ? 'border-[#0A4D91] bg-blue-50 text-[#0A4D91]'
                                      : 'border-gray-200 hover:border-[#0A4D91] text-gray-700'
                                  }`}
                                >
                                  {time}
                                </button>
                              ))}
                            </div>
                          </div>

                       
                          <button 
                            onClick={() => {
                             
                              localStorage.setItem('bookingState', JSON.stringify({
                                selectedServices,
                                selectedExtras,
                                selectedStaff,
                                selectedDate,
                                selectedTime,
                                formData,
                                paymentData,
                                currentStep
                              }));
                              
                              const servicesData = encodeURIComponent(JSON.stringify(selectedServices));
                              const extrasData = encodeURIComponent(JSON.stringify(selectedExtras));
                              router.push(`/waitlist?services=${servicesData}&extras=${extrasData}`);
                            }}
                            className="w-full mt-6 py-3 border-2 border-dashed border-gray-300 rounded-lg text-[#0A4D91] font-medium hover:border-[#0A4D91] hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
                          >
                            <Calendar className="w-5 h-5" />
                            Join our waitlist
                          </button>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full text-center p-8">
                          <Calendar className="w-16 h-16 text-gray-300 mb-4" />
                          <p className="text-gray-500">Please select a date to view available times</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Premium Banner */}
                <div className="relative overflow-hidden rounded-lg h-48 bg-gradient-to-r from-gray-800 to-gray-600">
                  <div className="absolute inset-0 bg-black opacity-40"></div>
                  <div className="relative z-10 p-8 h-full flex flex-col justify-center">
                    <p className="text-sm text-gray-300 mb-2 uppercase tracking-wide">MEMBER EXCLUSIVE</p>
                    <h3 className="text-3xl font-bold text-white">Premium Tranquility Awaits</h3>
                  </div>
                </div>
              </>
            ) : currentStep === 4 ? (
              <>
                {/* Step 4: Your Details Form */}
                <button
                  onClick={() => setCurrentStep(3)}
                  className="flex items-center gap-2 text-[#0A4D91] hover:underline mb-4"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back to date & time
                </button>

                <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-[#0A4D91] mb-8">Your details</h2>

                  <form className="space-y-6">
                    {/* First Name & Last Name */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">
                          FIRST NAME
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          placeholder="Sarah"
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A4D91] focus:border-transparent text-gray-900"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">
                          LAST NAME
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          placeholder="Johnson"
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A4D91] focus:border-transparent text-gray-900"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">
                        EMAIL
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="sarah@email.com"
                        className={`w-full px-4 py-3 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent text-gray-900 ${
                          emailError 
                            ? 'border-red-500 focus:ring-red-500' 
                            : 'border-gray-200 focus:ring-[#0A4D91]'
                        }`}
                      />
                      {emailError && (
                        <p className="mt-1 text-xs text-red-600">{emailError}</p>
                      )}
                    </div>

                    {/* Mobile Phone & Other Phone */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">
                          MOBILE PHONE
                        </label>
                        <PhoneInput
                          country={'au'}
                          value={formData.mobilePhone}
                          onChange={(phone, country) => {
                            const fullPhone = phone.startsWith('+') ? phone : `+${phone}`;
                            setFormData(prev => ({ ...prev, mobilePhone: fullPhone }));
                            
                            // Validate phone
                            setPhoneErrors(prev => ({ ...prev, mobilePhone: '' }));
                            if (fullPhone.length > 1) {
                              try {
                                if (!isValidPhoneNumber(fullPhone)) {
                                  setPhoneErrors(prev => ({ 
                                    ...prev, 
                                    mobilePhone: 'Please enter a valid phone number' 
                                  }));
                                } else {
                                  const phoneNumber = parsePhoneNumber(fullPhone);
                                  if (phoneNumber) {
                                    const nationalNumber = phoneNumber.nationalNumber;
                                    if (nationalNumber.length < 7) {
                                      setPhoneErrors(prev => ({ 
                                        ...prev, 
                                        mobilePhone: 'Phone number is too short (minimum 7 digits)' 
                                      }));
                                    } else if (nationalNumber.length > 15) {
                                      setPhoneErrors(prev => ({ 
                                        ...prev, 
                                        mobilePhone: 'Phone number is too long (maximum 15 digits)' 
                                      }));
                                    }
                                  }
                                }
                              } catch (error) {
                                setPhoneErrors(prev => ({ 
                                  ...prev, 
                                  mobilePhone: 'Invalid phone number format' 
                                }));
                              }
                            }
                          }}
                          inputStyle={{
                            width: '100%',
                            height: '48px',
                            fontSize: '16px',
                            paddingLeft: '48px',
                            borderRadius: '8px',
                            border: phoneErrors.mobilePhone ? '1px solid #ef4444' : '1px solid #e5e7eb',
                            backgroundColor: '#f9fafb',
                            color: '#374151'
                          }}
                          buttonStyle={{
                            borderRadius: '8px 0 0 8px',
                            border: phoneErrors.mobilePhone ? '1px solid #ef4444' : '1px solid #e5e7eb',
                            backgroundColor: '#f9fafb'
                          }}
                          dropdownStyle={{
                            color: '#374151'
                          }}
                          containerClass="phone-input-container"
                          dropdownClass="phone-dropdown"
                          searchClass="phone-search"
                          enableSearch={true}
                          searchPlaceholder="Search country..."
                        />
                        {phoneErrors.mobilePhone && (
                          <p className="mt-1 text-xs text-red-600">{phoneErrors.mobilePhone}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">
                          OTHER PHONE (OPTIONAL)
                        </label>
                        <PhoneInput
                          country={'au'}
                          value={formData.otherPhone}
                          onChange={(phone, country) => {
                            const fullPhone = phone.startsWith('+') ? phone : `+${phone}`;
                            setFormData(prev => ({ ...prev, otherPhone: fullPhone }));
                            
                            // Validate phone only if not empty
                            setPhoneErrors(prev => ({ ...prev, otherPhone: '' }));
                            if (fullPhone.length > 1) {
                              try {
                                if (!isValidPhoneNumber(fullPhone)) {
                                  setPhoneErrors(prev => ({ 
                                    ...prev, 
                                    otherPhone: 'Please enter a valid phone number' 
                                  }));
                                } else {
                                  const phoneNumber = parsePhoneNumber(fullPhone);
                                  if (phoneNumber) {
                                    const nationalNumber = phoneNumber.nationalNumber;
                                    if (nationalNumber.length < 7) {
                                      setPhoneErrors(prev => ({ 
                                        ...prev, 
                                        otherPhone: 'Phone number is too short (minimum 7 digits)' 
                                      }));
                                    } else if (nationalNumber.length > 15) {
                                      setPhoneErrors(prev => ({ 
                                        ...prev, 
                                        otherPhone: 'Phone number is too long (maximum 15 digits)' 
                                      }));
                                    }
                                  }
                                }
                              } catch (error) {
                                setPhoneErrors(prev => ({ 
                                  ...prev, 
                                  otherPhone: 'Invalid phone number format' 
                                }));
                              }
                            }
                          }}
                          inputStyle={{
                            width: '100%',
                            height: '48px',
                            fontSize: '16px',
                            paddingLeft: '48px',
                            borderRadius: '8px',
                            border: phoneErrors.otherPhone ? '1px solid #ef4444' : '1px solid #e5e7eb',
                            backgroundColor: '#f9fafb',
                            color: '#374151'
                          }}
                          buttonStyle={{
                            borderRadius: '8px 0 0 8px',
                            border: phoneErrors.otherPhone ? '1px solid #ef4444' : '1px solid #e5e7eb',
                            backgroundColor: '#f9fafb'
                          }}
                          dropdownStyle={{
                            color: '#374151'
                          }}
                          containerClass="phone-input-container"
                          dropdownClass="phone-dropdown"
                          searchClass="phone-search"
                          enableSearch={true}
                          searchPlaceholder="Search country..."
                        />
                        {phoneErrors.otherPhone && (
                          <p className="mt-1 text-xs text-red-600">{phoneErrors.otherPhone}</p>
                        )}
                      </div>
                    </div>

                    {/* Comments */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">
                        COMMENTS
                      </label>
                      <textarea
                        name="comments"
                        value={formData.comments}
                        onChange={handleInputChange}
                        placeholder="Any specific requirements or skin concerns?"
                        rows="4"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A4D91] focus:border-transparent text-gray-900 resize-none"
                      />
                    </div>

                    {/* Remember Details Checkbox */}
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        name="rememberDetails"
                        id="rememberDetails"
                        checked={formData.rememberDetails}
                        onChange={handleInputChange}
                        className="mt-1 w-4 h-4 text-[#0A4D91] border-gray-300 rounded focus:ring-[#0A4D91]"
                      />
                      <label htmlFor="rememberDetails" className="text-sm text-gray-700 cursor-pointer">
                        Remember my details for next time
                      </label>
                    </div>
                  </form>
                </div>

                {/* Cancellation Policy */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 md:p-6 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-[#0A4D91] flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Cancellation policy</h3>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Please provide at least 24 hours notice if you need to cancel or reschedule your appointment. Cancellations within 24 hours may incur a 50% service fee. No-shows will be charged at the full rate.
                    </p>
                  </div>
                </div>
              </>
            ) : currentStep === 5 && !bookingComplete ? (
              <>
                {/* Step 5: Payment Method */}
                <button
                  onClick={() => setCurrentStep(4)}
                  className="flex items-center gap-2 text-[#0A4D91] hover:underline mb-4"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back to your details
                </button>

                <div className="space-y-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-[#0A4D91]">Payment method</h2>

                  {/* Deposit Info */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-gray-700">
                      A deposit is required to secure your booking. The remaining balance is payable on the day of your appointment.
                    </p>
                  </div>

                  {/* Credit/Debit Card */}
                  <div className="bg-white border-2 border-[#0A4D91] rounded-lg p-6">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="card"
                          checked={paymentData.paymentMethod === 'card'}
                          onChange={handlePaymentChange}
                          className="w-5 h-5 text-[#0A4D91] border-gray-300 focus:ring-[#0A4D91]"
                        />
                        <div>
                          <h3 className="font-semibold text-gray-900">Credit or debit card</h3>
                          <p className="text-sm text-gray-500">Visa, Mastercard, Amex accepted</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-xs text-gray-400 border border-gray-300 px-2 py-1 rounded">VISA</span>
                        <span className="text-xs text-gray-400 border border-gray-300 px-2 py-1 rounded">MC</span>
                        <span className="text-xs text-gray-400 border border-gray-300 px-2 py-1 rounded">AMEX</span>
                      </div>
                    </div>

                    {paymentData.paymentMethod === 'card' && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-2">Card number</label>
                          <input
                            type="text"
                            name="cardNumber"
                            value={paymentData.cardNumber}
                            onChange={handlePaymentChange}
                            placeholder="1234 5678 9012 3456"
                            className="w-full px-4 text-gray-700 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A4D91] focus:border-transparent"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-2">Expiry</label>
                            <input
                              type="text"
                              name="expiry"
                              value={paymentData.expiry}
                              onChange={handlePaymentChange}
                              placeholder="MM / YY"
                              className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A4D91] focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-2">CVC</label>
                            <input
                              type="text"
                              name="cvc"
                              value={paymentData.cvc}
                              onChange={handlePaymentChange}
                              placeholder="123"
                              className="w-full text-gray-700 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A4D91] focus:border-transparent"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-2">Name on card</label>
                          <input
                            type="text"
                            name="nameOnCard"
                            value={paymentData.nameOnCard}
                            onChange={handlePaymentChange}
                            placeholder="Sarah Johnson"
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0A4D91] focus:border-transparent"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Apple Pay */}
                  <div className="bg-white border border-gray-200 rounded-lg p-6 hover:border-[#0A4D91] transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="apple"
                        checked={paymentData.paymentMethod === 'apple'}
                        onChange={handlePaymentChange}
                        className="w-5 h-5 text-[#0A4D91] border-gray-300 focus:ring-[#0A4D91]"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-900">Apple Pay</h3>
                        <p className="text-sm text-gray-500">Pay with Touch ID or Face ID</p>
                      </div>
                    </div>
                  </div>

                  {/* Google Pay */}
                  <div className="bg-white border border-gray-200 rounded-lg p-6 hover:border-[#0A4D91] transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="google"
                        checked={paymentData.paymentMethod === 'google'}
                        onChange={handlePaymentChange}
                        className="w-5 h-5 text-[#0A4D91] border-gray-300 focus:ring-[#0A4D91]"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-900">Google Pay</h3>
                        <p className="text-sm text-gray-500">Pay with your Google account</p>
                      </div>
                    </div>
                  </div>

                  {/* Security Note */}
                  <p className="text-xs text-gray-500">
                    Your payment is encrypted and processed securely. We never store your full card details.
                  </p>
                </div>
              </>
            ) : currentStep === 5 && bookingComplete ? (
              <>
                {/* Booking Confirmation */}
                <div className="space-y-6">
                  {/* Success Message */}
                  <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-12 h-12 text-[#0A4D91]" />
                    </div>
                    <h2 className="text-3xl font-bold text-[#0A4D91] mb-3">You're all booked!</h2>
                    <p className="text-gray-600">
                      A confirmation has been sent to <span className="font-medium">{formData.email}</span>
                    </p>
                  </div>

                  {/* Booking Details */}
                  <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
                    {/* Service & Date */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase mb-2">SERVICE</p>
                        <p className="text-gray-900 font-medium">
                          {selectedServices.map(id => {
                            const service = reduxServices.find(s => s._id === id);
                            return service?.name;
                          }).filter(Boolean).join(', ')}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase mb-2">DATE</p>
                        <p className="text-gray-900 font-medium">Saturday, 11 April 2026</p>
                      </div>
                    </div>

                    {/* Time & Location */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase mb-2">TIME</p>
                        <p className="text-gray-900 font-medium">{selectedTime}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase mb-2">LOCATION</p>
                        <p className="text-gray-900 font-medium">Clee Beauty, 59 Montgomery St, Surry Hills</p>
                      </div>
                    </div>

                    {/* Payment Summary */}
                    <div className="border-t pt-6">
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="bg-blue-50 border-l-4 border-[#0A4D91] p-4">
                          <p className="text-xs font-semibold text-gray-500 uppercase mb-1">DEPOSIT PAID</p>
                          <p className="text-2xl font-bold text-[#0A4D91]">$99</p>
                        </div>
                        <div className="bg-gray-50 border-l-4 border-gray-300 p-4">
                          <p className="text-xs font-semibold text-gray-500 uppercase mb-1">BALANCE ON THE DAY</p>
                          <p className="text-2xl font-bold text-gray-900">$156</p>
                        </div>
                      </div>
                    </div>

                    {/* Add to Calendar Button */}
                    <button className="w-full bg-[#0A4D91] text-white py-4 rounded-lg font-semibold text-lg hover:bg-[#083d73] transition-colors flex items-center justify-center gap-2">
                      <Calendar className="w-5 h-5" />
                      Add to calendar
                    </button>
                  </div>

                  {/* Location Card with Image */}
                  <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="relative h-48 bg-gradient-to-r from-gray-700 to-gray-500">
                      <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm font-medium">Surry Hills, NSW</span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Clee Beauty</h3>
                      <p className="text-gray-600">59 Montgomery St, Surry Hills</p>
                    </div>
                  </div>
                </div>
              </>
            ) : currentStep === 5 ? (
              <>
                {/* Step 5: Payment Section */}
                <button
                  onClick={() => setCurrentStep(4)}
                  className="flex items-center gap-2 text-[#0A4D91] hover:underline mb-4"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back to your details
                </button>

                <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-[#0A4D91] mb-8">Payment</h2>

                  <form className="space-y-6">
                    {/* Payment Method */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-3">
                        PAYMENT METHOD
                      </label>
                      <div className="space-y-3">
                        <label className="flex items-center gap-3 p-4 border-2 border-[#0A4D91] bg-blue-50 rounded-lg cursor-pointer">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="card"
                            checked={paymentData.paymentMethod === 'card'}
                            onChange={handlePaymentChange}
                            className="w-5 h-5 text-[#0A4D91]"
                          />
                          <div className="flex items-center gap-2">
                            <CreditCard className="w-5 h-5 text-[#0A4D91]" />
                            <span className="font-medium text-gray-900">Credit / Debit Card</span>
                          </div>
                        </label>
                        <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-[#0A4D91]">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="paypal"
                            checked={paymentData.paymentMethod === 'paypal'}
                            onChange={handlePaymentChange}
                            className="w-5 h-5 text-[#0A4D91]"
                          />
                          <span className="font-medium text-gray-900">PayPal</span>
                        </label>
                      </div>
                    </div>

                    {/* Card Details */}
                    {paymentData.paymentMethod === 'card' && (
                      <>
                        {/* Card Number */}
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">
                            CARD NUMBER
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              name="cardNumber"
                              value={paymentData.cardNumber}
                              onChange={handlePaymentChange}
                              placeholder="1234 5678 9012 3456"
                              maxLength="19"
                              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A4D91] focus:border-transparent text-gray-900"
                            />
                            <CreditCard className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          </div>
                        </div>

                        {/* Expiry & CVV */}
                        <div className="grid grid-cols-2 gap-4 md:gap-6">
                          <div>
                            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">
                              EXPIRY DATE
                            </label>
                            <input
                              type="text"
                              name="expiryDate"
                              value={paymentData.expiryDate}
                              onChange={handlePaymentChange}
                              placeholder="MM/YY"
                              maxLength="5"
                              className="w-full text-gray-700 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A4D91] focus:border-transparent text-gray-900"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">
                              CVV
                            </label>
                            <input
                              type="text"
                              name="cvv"
                              value={paymentData.cvv}
                              onChange={handlePaymentChange}
                              placeholder="123"
                              maxLength="4"
                              className="w-full text-gray-700 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A4D91] focus:border-transparent text-gray-900"
                            />
                          </div>
                        </div>

                        {/* Cardholder Name */}
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">
                            CARDHOLDER NAME
                          </label>
                          <input
                            type="text"
                            name="cardholderName"
                            value={paymentData.cardholderName}
                            onChange={handlePaymentChange}
                            placeholder="Name on card"
                            className="w-full px-4 text-gray-700 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A4D91] focus:border-transparent text-gray-900"
                          />
                        </div>
                      </>
                    )}

                    {/* Billing Address */}
                    <div className="pt-4 border-t">
                      <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-4">
                        BILLING ADDRESS
                      </h3>
                      
                      <div className="space-y-4">
                        <div>
                          <input
                            type="text"
                            name="billingAddress"
                            value={paymentData.billingAddress}
                            onChange={handlePaymentChange}
                            placeholder="Street address"
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A4D91] focus:border-transparent text-gray-900"
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <input
                            type="text"
                            name="billingCity"
                            value={paymentData.billingCity}
                            onChange={handlePaymentChange}
                            placeholder="City"
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A4D91] focus:border-transparent text-gray-900"
                          />
                          <input
                            type="text"
                            name="billingPostcode"
                            value={paymentData.billingPostcode}
                            onChange={handlePaymentChange}
                            placeholder="Postcode"
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A4D91] focus:border-transparent text-gray-900"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Terms & Conditions */}
                    <div className="flex items-start gap-3 pt-4">
                      <input
                        type="checkbox"
                        name="acceptTerms"
                        id="acceptTerms"
                        checked={paymentData.acceptTerms}
                        onChange={handlePaymentChange}
                        className="mt-1 w-4 h-4 text-[#0A4D91] border-gray-300 rounded focus:ring-[#0A4D91]"
                      />
                      <label htmlFor="acceptTerms" className="text-sm text-gray-700 cursor-pointer">
                        I agree to the{' '}
                        <a href="#" className="text-[#0A4D91] underline">terms and conditions</a>
                        {' '}and{' '}
                        <a href="#" className="text-[#0A4D91] underline">cancellation policy</a>
                      </label>
                    </div>
                  </form>
                </div>

                {/* Security Notice */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 md:p-6 flex items-start gap-3">
                  <Lock className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Secure Payment</h3>
                    <p className="text-sm text-gray-700">
                      Your payment information is encrypted and secure. We never store your card details.
                    </p>
                  </div>
                </div>
              </>
            ) : currentStep === 5 && !bookingComplete ? (
              <>
                {/* Step 5: Payment Section */}
                <button
                  onClick={() => setCurrentStep(4)}
                  className="flex items-center gap-2 text-[#0A4D91] hover:underline mb-4"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back to your details
                </button>

                <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-[#0A4D91] mb-2">Payment method</h2>

                  {/* Deposit Info */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
                    <p className="text-sm text-gray-700">
                      A deposit is required to secure your booking. The remaining balance is payable on the day of your appointment.
                    </p>
                  </div>

                  {/* Payment Methods */}
                  <div className="space-y-4">
                    {/* Credit/Debit Card */}
                    <div className={`border-2 rounded-lg p-6 cursor-pointer transition-colors ${
                      paymentData.paymentMethod === 'card' ? 'border-[#0A4D91] bg-blue-50' : 'border-gray-200'
                    }`}
                    onClick={() => setPaymentData(prev => ({ ...prev, paymentMethod: 'card' }))}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="paymentMethod"
                            checked={paymentData.paymentMethod === 'card'}
                            onChange={() => setPaymentData(prev => ({ ...prev, paymentMethod: 'card' }))}
                            className="w-5 h-5 text-[#0A4D91]"
                          />
                          <div>
                            <h3 className="font-semibold text-gray-900">Credit or debit card</h3>
                            <p className="text-sm text-gray-500">Visa, Mastercard, Amex accepted</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <span className="text-xs text-gray-400 border border-gray-300 px-2 py-1 rounded">VISA</span>
                          <span className="text-xs text-gray-400 border border-gray-300 px-2 py-1 rounded">MC</span>
                          <span className="text-xs text-gray-400 border border-gray-300 px-2 py-1 rounded">AMEX</span>
                        </div>
                      </div>

                      {paymentData.paymentMethod === 'card' && (
                        <div className="space-y-4 mt-6 pt-6 border-t">
                          {/* Card Number */}
                          <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-2">
                              Card number
                            </label>
                            <input
                              type="text"
                              name="cardNumber"
                              value={paymentData.cardNumber}
                              onChange={handlePaymentChange}
                              placeholder="1234 5678 9012 3456"
                              maxLength="19"
                              className="w-full text-gray-700 px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A4D91] focus:border-transparent text-gray-900"
                            />
                          </div>

                          {/* Expiry & CVC */}
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs font-semibold text-gray-700 mb-2">
                                Expiry
                              </label>
                              <input
                                type="text"
                                name="expiry"
                                value={paymentData.expiry}
                                onChange={handlePaymentChange}
                                placeholder="MM / YY"
                                maxLength="7"
                                className="w-full text-gray-700 px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A4D91] focus:border-transparent text-gray-900"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-semibold text-gray-700 mb-2">
                                CVC
                              </label>
                              <input
                                type="text"
                                name="cvc"
                                value={paymentData.cvc}
                                onChange={handlePaymentChange}
                                placeholder="123"
                                maxLength="4"
                                className="w-full text-gray-700 px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A4D91] focus:border-transparent text-gray-900"
                              />
                            </div>
                          </div>

                          {/* Name on Card */}
                          <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-2">
                              Name on card
                            </label>
                            <input
                              type="text"
                              name="nameOnCard"
                              value={paymentData.nameOnCard}
                              onChange={handlePaymentChange}
                              placeholder="Sarah Johnson"
                              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A4D91] focus:border-transparent text-gray-700"
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Apple Pay */}
                    <div className={`border-2 rounded-lg p-6 cursor-pointer transition-colors ${
                      paymentData.paymentMethod === 'apple' ? 'border-[#0A4D91] bg-blue-50' : 'border-gray-200'
                    }`}
                    onClick={() => setPaymentData(prev => ({ ...prev, paymentMethod: 'apple' }))}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="paymentMethod"
                          checked={paymentData.paymentMethod === 'apple'}
                          onChange={() => setPaymentData(prev => ({ ...prev, paymentMethod: 'apple' }))}
                          className="w-5 h-5 text-[#0A4D91]"
                        />
                        <div>
                          <h3 className="font-semibold text-gray-900">Apple Pay</h3>
                          <p className="text-sm text-gray-500">Pay with Touch ID or Face ID</p>
                        </div>
                      </div>
                    </div>

                    {/* Google Pay */}
                    <div className={`border-2 rounded-lg p-6 cursor-pointer transition-colors ${
                      paymentData.paymentMethod === 'google' ? 'border-[#0A4D91] bg-blue-50' : 'border-gray-200'
                    }`}
                    onClick={() => setPaymentData(prev => ({ ...prev, paymentMethod: 'google' }))}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="paymentMethod"
                          checked={paymentData.paymentMethod === 'google'}
                          onChange={() => setPaymentData(prev => ({ ...prev, paymentMethod: 'google' }))}
                          className="w-5 h-5 text-[#0A4D91]"
                        />
                        <div>
                          <h3 className="font-semibold text-gray-900">Google Pay</h3>
                          <p className="text-sm text-gray-500">Pay with your Google account</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Security Note */}
                  <p className="text-xs text-gray-500 mt-6">
                    Your payment is encrypted and processed securely. We never store your full card details.
                  </p>
                </div>
              </>
            ) : currentStep === 5 && bookingComplete ? (
              <>
                {/* Success Page */}
                <div className="space-y-6">
                  {/* Success Message */}
                  <div className="bg-white rounded-lg shadow-sm p-8 md:p-12 text-center">
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-12 h-12 text-[#0A4D91]" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-[#0A4D91] mb-4">
                      You're all booked!
                    </h2>
                    <p className="text-gray-600">
                      A confirmation has been sent to {formData.email || 'sarah@email.com'}
                    </p>
                  </div>

                  {/* Booking Details */}
                  <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Service */}
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase mb-2">SERVICE</p>
                        <p className="text-gray-900 font-medium">Hydrafacial, Microdermabrasion</p>
                      </div>

                      {/* Date */}
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase mb-2">DATE</p>
                        <p className="text-gray-900 font-medium">Saturday, 11 April 2026</p>
                      </div>

                      {/* Time */}
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase mb-2">TIME</p>
                        <p className="text-gray-900 font-medium">{selectedTime || '11:00am'}</p>
                      </div>

                      {/* Location */}
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase mb-2">LOCATION</p>
                        <p className="text-gray-900 font-medium">Clee Beauty, 59 Montgomery St, Surry Hills</p>
                      </div>
                    </div>

                    {/* Payment Summary */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 pt-8 border-t">
                      <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-[#0A4D91]">
                        <p className="text-xs font-semibold text-gray-500 uppercase mb-1">DEPOSIT PAID</p>
                        <p className="text-2xl font-bold text-gray-900">$99</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-xs font-semibold text-gray-500 uppercase mb-1">BALANCE ON THE DAY</p>
                        <p className="text-2xl font-bold text-gray-900">$371</p>
                      </div>
                    </div>

                    {/* Add to Calendar Button */}
                    <button className="w-full mt-6 bg-[#0A4D91] text-white py-4 rounded-lg font-semibold text-lg hover:bg-[#083d73] transition-colors flex items-center justify-center gap-2">
                      <Calendar className="w-5 h-5" />
                      Add to calendar
                    </button>
                  </div>
                </div>
              </>
            ) : null}
          </div>

          {/* Right Section - Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-8 sticky top-24">
              {/* Your Booking Header */}
              <h3 className="text-sm font-bold text-[#0A4D91] uppercase tracking-wider mb-6">
                YOUR BOOKING
              </h3>

              {/* Services List */}
              <div className="space-y-4 mb-6">
                {/* Selected Services */}
                {selectedServices.map((service, index) => {
                  const serviceObj = typeof service === 'object' ? service : reduxServices.find((s) => s._id === service);
                  return serviceObj ? (
                    <div key={serviceObj._id || index} className="flex justify-between items-start">
                      <span className="text-gray-800 font-medium text-base">{serviceObj.name}</span>
                      <span className="text-gray-800 font-semibold text-base">${serviceObj.price}</span>
                    </div>
                  ) : null;
                })}
                
                {/* Selected Extras */}
                {selectedExtras.map((extra, index) => {
                  const extraObj = typeof extra === 'object' ? extra : (() => {
                    const allAddons = getAllAddons();
                    return allAddons.find((a) => a._id === extra);
                  })();
                  if (!extraObj) return null;
                  
                  
                  const isDiscounted = extraObj.name === "Collagen booster serum";
                  
                  return (
                    <div key={extraObj._id || index} className="flex justify-between items-start">
                      <span className={`font-medium text-base ${isDiscounted ? 'text-[#0A4D91]' : 'text-gray-800'}`}>
                        {extraObj.name}
                        {isDiscounted && <span className="block text-xs text-gray-500 mt-1">Coö bo uswng</span>}
                      </span>
                      <span className={`font-semibold text-base ${isDiscounted ? 'text-[#0A4D91]' : 'text-gray-800'}`}>
                        {isDiscounted ? '-$20' : `+$${extraObj.price}`}
                      </span>
                    </div>
                  );
                })}
                
                {/* Show message if nothing selected */}
                {selectedServices.length === 0 && selectedExtras.length === 0 && (
                  <p className="text-sm text-gray-400 italic">No services selected yet</p>
                )}
              </div>

              {/* Selected Date & Time */}
              {currentStep >= 3 && selectedDate && selectedTime && (
                <div className="space-y-3 mb-8 pb-6 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-[#0A4D91]" />
                    <span className="text-gray-600 text-base">Sat, 11 Apr</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-[#0A4D91]" />
                    <span className="text-gray-600 text-base">{selectedTime}</span>
                  </div>
                  {selectedStaff && (
                    <div className="flex items-center gap-3">
                      <User className="w-5 h-5 text-[#0A4D91]" />
                      <span className="text-gray-600 text-base">
                        {selectedStaff.firstName && selectedStaff.lastName 
                          ? `${selectedStaff.firstName} ${selectedStaff.lastName}`
                          : selectedStaff.fullname || 'Staff Member'}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Total */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-gray-500 font-medium text-lg uppercase tracking-wide">TOTAL</span>
                  <span className="text-[#0A4D91] font-bold text-4xl">${getTotal()}</span>
                </div>
              </div>

              {/* Continue Button */}
              <button 
                onClick={() => {
                  if (currentStep === 1) {
                    // Check if staff selection is enabled
                    if (bookingSettings?.data?.staffSelection === 'Clients can choose any staff') {
                      setCurrentStep(2); // Go to staff selection
                    } else {
                      setCurrentStep(3); // Skip to calendar
                    }
                  } else if (currentStep === 2) {
                    // From staff selection to calendar
                    setCurrentStep(3);
                  } else if (currentStep === 3 && selectedDate && selectedTime) {
                    // From calendar to your details
                    setCurrentStep(4);
                  } else if (currentStep === 4) {
                    // From your details to payment
                    if (!formData.firstName || !formData.lastName || !formData.email || !formData.mobilePhone) {
                      alert('Please fill in all required fields');
                    } else if (emailError) {
                      alert('Please enter a valid email address');
                    } else if (phoneErrors.mobilePhone || phoneErrors.otherPhone) {
                      alert('Please fix phone number errors before continuing');
                    } else {
                      setCurrentStep(5);
                    }
                  } else if (currentStep === 5 && !bookingComplete) {
                    // Submit booking
                    if (paymentData.paymentMethod === 'card' && (!paymentData.cardNumber || !paymentData.expiry || !paymentData.cvc || !paymentData.nameOnCard)) {
                      alert('Please fill in all card details');
                    } else {
                      handleBookingSubmit();
                    }
                  }
                }}
                disabled={
                  (currentStep === 3 && (!selectedDate || !selectedTime)) ||
                  (currentStep === 4 && (!formData.firstName || !formData.lastName || !formData.email || !formData.mobilePhone || emailError || phoneErrors.mobilePhone || phoneErrors.otherPhone)) ||
                  (currentStep === 5 && bookingComplete) ||
                  isSubmitting
                }
                className={`w-full py-4 rounded-lg font-semibold text-lg transition-colors shadow-md ${
                  bookingComplete 
                    ? 'hidden' 
                    : isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed text-white'
                    : 'bg-[#0A4D91] text-white hover:bg-[#083d73] disabled:bg-gray-300 disabled:cursor-not-allowed'
                }`}
              >
                {isSubmitting ? 'Processing...' : currentStep === 5 ? 'Pay deposit & confirm' : 'Continue'}
              </button>

              {currentStep === 3 && selectedDate && selectedTime && (
                <p className="text-xs text-gray-400 text-center mt-4 leading-relaxed">
                  By continuing you agree to our 24-hour cancellation policy and terms of service.
                </p>
              )}

              {currentStep === 4 && (
                <p className="text-xs text-gray-400 text-center mt-4 leading-relaxed">
                  By continuing you agree to our 24-hour cancellation policy and terms of service.
                </p>
              )}

              {currentStep === 5 && !bookingComplete && (
                <>
                  <div className="mt-4 pt-4 border-t space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Deposit due now</span>
                      <span className="font-semibold text-gray-900">$99</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Balance on the day</span>
                      <span className="font-semibold text-gray-900">$156</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      
      {isSubmitting && <BookingLoader />}
      
      <SuccessModal 
        isOpen={showSuccessModal} 
        onClose={() => {
          setShowSuccessModal(false);
         
          setSelectedServices([]);
          setSelectedExtras([]);
          setSelectedStaff(null);
          setSelectedDate(null);
          setSelectedTime(null);
          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            mobilePhone: '',
            otherPhone: '',
            comments: '',
            rememberDetails: false,
          });
          setPaymentData({
            paymentMethod: 'card',
            cardNumber: '',
            expiry: '',
            cvc: '',
            nameOnCard: '',
          });
          setBookingComplete(false);
         
        }} 
      />
      
      <ErrorModal 
        isOpen={showErrorModal} 
        onClose={() => setShowErrorModal(false)}
        message={errorMessage}
      />
      </div>
      )}
    </div>
  );
}

