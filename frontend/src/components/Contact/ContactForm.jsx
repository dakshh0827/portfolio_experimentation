import React, { useState, useRef, useEffect } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { fadeInUp } from '../../animations/gsapAnimations';

const ContactForm = () => {
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  useEffect(() => {
    if (formRef.current) {
      fadeInUp(formRef.current);
    }
  }, []);

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would typically send the data to your backend
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });

      console.log('Form submitted:', formData);
      
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);

    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div ref={formRef}>
      <form onSubmit={handleSubmit} className="glass p-8 rounded-xl space-y-6">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-white mb-2 font-medium">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-3 bg-dark-light border ${
              errors.name ? 'border-red-500' : 'border-white/10'
            } rounded-lg text-white placeholder-white/40 focus:border-primary-500 focus:outline-none transition-colors`}
            placeholder="John Doe"
            disabled={isSubmitting}
          />
          {errors.name && (
            <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
              <AlertCircle size={14} />
              {errors.name}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-white mb-2 font-medium">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-3 bg-dark-light border ${
              errors.email ? 'border-red-500' : 'border-white/10'
            } rounded-lg text-white placeholder-white/40 focus:border-primary-500 focus:outline-none transition-colors`}
            placeholder="john@example.com"
            disabled={isSubmitting}
          />
          {errors.email && (
            <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
              <AlertCircle size={14} />
              {errors.email}
            </p>
          )}
        </div>

        {/* Subject Field */}
        <div>
          <label htmlFor="subject" className="block text-white mb-2 font-medium">
            Subject <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className={`w-full px-4 py-3 bg-dark-light border ${
              errors.subject ? 'border-red-500' : 'border-white/10'
            } rounded-lg text-white placeholder-white/40 focus:border-primary-500 focus:outline-none transition-colors`}
            placeholder="Project Inquiry"
            disabled={isSubmitting}
          />
          {errors.subject && (
            <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
              <AlertCircle size={14} />
              {errors.subject}
            </p>
          )}
        </div>

        {/* Message Field */}
        <div>
          <label htmlFor="message" className="block text-white mb-2 font-medium">
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="5"
            className={`w-full px-4 py-3 bg-dark-light border ${
              errors.message ? 'border-red-500' : 'border-white/10'
            } rounded-lg text-white placeholder-white/40 focus:border-primary-500 focus:outline-none transition-colors resize-none`}
            placeholder="Tell me about your project..."
            disabled={isSubmitting}
          />
          {errors.message && (
            <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
              <AlertCircle size={14} />
              {errors.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-8 py-4 bg-primary-500 hover:bg-primary-600 disabled:bg-primary-500/50 disabled:cursor-not-allowed rounded-full text-white font-medium transition-all duration-300 interactive flex items-center justify-center gap-2 group"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send size={20} className="group-hover:translate-x-1 transition-transform" />
              Send Message
            </>
          )}
        </button>

        {/* Success Message */}
        {submitStatus === 'success' && (
          <div className="p-4 bg-green-500/10 border border-green-500/50 rounded-lg flex items-center gap-3 text-green-400">
            <CheckCircle size={20} />
            <p className="font-medium">Message sent successfully! I'll get back to you soon.</p>
          </div>
        )}

        {/* Error Message */}
        {submitStatus === 'error' && (
          <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg flex items-center gap-3 text-red-400">
            <AlertCircle size={20} />
            <p className="font-medium">Failed to send message. Please try again later.</p>
          </div>
        )}
      </form>

      {/* Additional Info */}
      <div className="mt-6 text-center text-white/60 text-sm">
        <p>
          All fields marked with <span className="text-red-500">*</span> are required
        </p>
      </div>
    </div>
  );
};

export default ContactForm;