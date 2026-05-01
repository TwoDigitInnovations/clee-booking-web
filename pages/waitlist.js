import React, { useState } from "react";
import { useRouter } from "next/router";
import { Clock, Calendar, User, Mail, Phone, MessageSquare, ArrowLeft } from "lucide-react";
import { parsePhoneNumber, isValidPhoneNumber } from 'libphonenumber-js';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useAppDispatch } from "../redux/hooks";
import { createWaitlist } from "../redux/actions/waitlistActions";
import BookingLoader from "../components/BookingLoader";
import SuccessModal from "../components/SuccessModal";
import ErrorModal from "../components/ErrorModal";

export default function Waitlist() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { services, extras } = router.query;
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [emailError, setEmailError] = useState('');

  let selectedServices = [];
  let selectedExtras = [];

  try {
    selectedServices = services ? JSON.parse(decodeURIComponent(services)) : [];
    selectedExtras = extras ? JSON.parse(decodeURIComponent(extras)) : [];
    console.log('Parsed services:', selectedServices);
    console.log('Parsed extras:', selectedExtras);
  } catch (error) {
    console.error('Error parsing query params:', error);
  }

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    preferredDate: '',
    preferredTime: '',
    notes: '',
    urgent: false
  });

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
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.email || !formData.phone) {
      setErrorMessage('Please fill in all required fields');
      setShowErrorModal(true);
      return;
    }
    
    if (emailError) {
      setErrorMessage('Please enter a valid email address');
      setShowErrorModal(true);
      return;
    }
    
    if (phoneError) {
      setErrorMessage('Please enter a valid phone number');
      setShowErrorModal(true);
      return;
    }

    setIsSubmitting(true);

    try {
      const waitlistData = {
        customer: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone
        },
        service: selectedServices.map(s => s._id || s),
        notes: formData.notes || 'No specific preferences',
        urgent: formData.urgent,
        preferredDate: formData.preferredDate || null,
        preferredTime: formData.preferredTime || null
      };

      const result = await dispatch(createWaitlist(waitlistData));
      
      setIsSubmitting(false);
      
      if (result.success) {
        // Reset form after successful submission
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          preferredDate: '',
          preferredTime: '',
          notes: '',
          urgent: false
        });
        setShowSuccessModal(true);
      } else {
        setErrorMessage(result.message || 'Failed to join waitlist');
        setShowErrorModal(true);
      }
    } catch (error) {
      setIsSubmitting(false);
      console.error('Waitlist error:', error);
      setErrorMessage('An error occurred while joining the waitlist');
      setShowErrorModal(true);
    }
  };

  const getTotalDuration = () => {
    const servicesDuration = selectedServices
      .filter(service => service && service.duration > 0)
      .reduce((sum, service) => sum + (service?.duration || 0), 0);
    const extrasDuration = selectedExtras
      .filter(extra => extra && extra.duration > 0)
      .reduce((sum, extra) => sum + (extra?.duration || 0), 0);
    return servicesDuration + extrasDuration;
  };

  const getTotalPrice = () => {
    const servicesPrice = selectedServices
      .filter(service => service && service.price > 0)
      .reduce((sum, service) => sum + (service?.price || 0), 0);
    const extrasPrice = selectedExtras
      .filter(extra => extra && extra.price > 0)
      .reduce((sum, extra) => sum + (extra?.price || 0), 0);
    return servicesPrice + extrasPrice;
  };

  return (
    <div className="min-h-screen bg-[#F8F6F6] pt-20">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <button
          onClick={() => router.push('/booking')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition"
        >
          <ArrowLeft size={20} />
          <span>Back to booking</span>
        </button>

        <div className="bg-white shadow-xl overflow-hidden">
          <div className="bg-[#0A4D91] p-8 text-white">
            <h1 className="text-3xl font-bold mb-2">Join Our Waitlist</h1>
            <p className="text-blue-100">We'll notify you when a slot becomes available</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 p-8">
            <div className="md:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full text-gray-700 pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full text-gray-700 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 text-gray-700 border rounded-xl focus:ring-2 focus:border-transparent ${
                        emailError 
                          ? 'border-red-500 focus:ring-red-500' 
                          : 'border-gray-300 focus:ring-blue-500'
                      }`}
                      required
                    />
                  </div>
                  {emailError && (
                    <p className="mt-1 text-xs text-red-600">{emailError}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mobile phone <span className="text-red-500">*</span>
                  </label>
                  <PhoneInput
                    country={'au'}
                    value={formData.phone}
                    onChange={(value, country, e, formattedValue) => {
                      setFormData(prev => ({ ...prev, phone: formattedValue }));
                      
                     
                      setPhoneError('');
                      if (formattedValue.length > 1) {
                        try {
                          if (!isValidPhoneNumber(formattedValue)) {
                            setPhoneError('Please enter a valid phone number');
                          } else {
                            const phoneNumber = parsePhoneNumber(formattedValue);
                            const nationalNumber = phoneNumber.nationalNumber;
                            if (nationalNumber.length < 7) {
                              setPhoneError('Phone number is too short (minimum 7 digits)');
                            } else if (nationalNumber.length > 15) {
                              setPhoneError('Phone number is too long (maximum 15 digits)');
                            }
                          }
                        } catch (error) {
                          setPhoneError('Invalid phone number format');
                        }
                      }
                    }}
                    inputProps={{
                      name: 'phone',
                      required: true,
                      autoFocus: false
                    }}
                    containerStyle={{
                      width: '100%'
                    }}
                    inputStyle={{
                      width: '100%',
                      height: '48px',
                      fontSize: '16px',
                      paddingLeft: '48px',
                      borderRadius: '12px',
                      border: phoneError ? '1px solid #ef4444' : '1px solid #d1d5db',
                      backgroundColor: '#ffffff',
                      color: '#374151'
                    }}
                    buttonStyle={{
                      borderRadius: '12px 0 0 12px',
                      border: phoneError ? '1px solid #ef4444' : '1px solid #d1d5db',
                      backgroundColor: '#ffffff'
                    }}
                    dropdownStyle={{
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                    enableSearch={true}
                    searchPlaceholder="Search country..."
                  />
                  {phoneError && (
                    <p className="mt-1 text-xs text-red-600">{phoneError}</p>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred date (optional)
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="date"
                        name="preferredDate"
                        value={formData.preferredDate}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 text-gray-700 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred time (optional)
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="time"
                        name="preferredTime"
                        value={formData.preferredTime}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 text-gray-700 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional notes (optional)
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 text-gray-400" size={18} />
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      rows="4"
                      className="w-full pl-10 pr-4 py-3 text-gray-700 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      placeholder="Any specific preferences or requirements..."
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                  <input
                    type="checkbox"
                    name="urgent"
                    checked={formData.urgent}
                    onChange={handleInputChange}
                    className="w-5 h-5  text-gray-700 border-gray-300 rounded focus:ring-amber-500"
                  />
                  <label className="text-sm font-medium text-amber-900">
                    Mark as urgent - I need an appointment as soon as possible
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || emailError || phoneError || !formData.firstName || !formData.email || !formData.phone}
                  className={`w-full py-4 rounded-xl font-semibold text-lg transition-colors shadow-md ${
                    isSubmitting || emailError || phoneError || !formData.firstName || !formData.email || !formData.phone
                      ? 'bg-gray-400 cursor-not-allowed text-white'
                      : 'bg-[#0A4D91] text-white hover:bg-[#083d73]'
                  }`}
                >
                  {isSubmitting ? 'Joining waitlist...' : 'Join Waitlist'}
                </button>
              </form>
            </div>

            <div className="md:col-span-1">
              <div className="bg-gray-50 rounded-xl p-6 sticky top-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Selected Services</h3>
                
                {selectedServices.length > 0 ? (
                  <div className="space-y-3 mb-6">
                    {selectedServices.filter(service => service).map((service, index) => (
                      <div key={index} className="flex justify-between items-start p-3 bg-white rounded-xl shadow-sm">
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{service?.name || 'Service'}</p>
                          <p className="text-sm text-gray-500">{service?.duration || 0} mins</p>
                        </div>
                        <p className="font-semibold text-gray-900">${service?.price || 0}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm mb-6">No services selected</p>
                )}

                {selectedExtras.length > 0 && selectedExtras.filter(extra => extra && (extra.price > 0 || extra.duration > 0)).length > 0 && (
                  <>
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">Extras</h4>
                    <div className="space-y-3 mb-6">
                      {selectedExtras.filter(extra => extra && (extra.price > 0 || extra.duration > 0)).map((extra, index) => (
                        <div key={index} className="flex justify-between items-start p-3 bg-white rounded-xl shadow-sm">
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">{extra?.name || 'Extra'}</p>
                            <p className="text-sm text-gray-500">{extra?.duration || 0} mins</p>
                          </div>
                          <p className="font-semibold text-gray-900">${extra?.price || 0}</p>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Total duration</span>
                    <span className="font-semibold text-gray-900">{getTotalDuration()} mins</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold">
                    <span className="text-gray-900">Total price</span>
                    <span className="text-[#0A4D91]">${getTotalPrice()}</span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-xl">
                  <p className="text-xs text-blue-900 leading-relaxed">
                    We'll contact you as soon as a slot becomes available for your selected services. 
                    You'll receive a notification via email and SMS.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isSubmitting && <BookingLoader />}
      
      <SuccessModal 
        isOpen={showSuccessModal}
        title="Added to Waitlist!"
        message="You've been successfully added to our waitlist. We'll notify you via email and SMS as soon as a slot becomes available."
        onClose={() => {
          setShowSuccessModal(false);
          router.push('/');
        }} 
      />
      
      <ErrorModal 
        isOpen={showErrorModal} 
        onClose={() => setShowErrorModal(false)}
        message={errorMessage}
      />
    </div>
  );
}
