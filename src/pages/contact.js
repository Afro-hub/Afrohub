// pages/contact.js
import { useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import styles from '../styles/Contact.module.css';
import Image from 'next/image';

export default function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    submitted: false,
    loading: false,
    error: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Form validation
    if (!formState.name || !formState.email || !formState.message) {
      setFormState(prev => ({
        ...prev,
        error: 'Please fill out all required fields'
      }));
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formState.email)) {
      setFormState(prev => ({
        ...prev,
        error: 'Please enter a valid email address'
      }));
      return;
    }

    setFormState(prev => ({
      ...prev,
      loading: true,
      error: null
    }));

    // Simulate API call
    setTimeout(() => {
      setFormState(prev => ({
        ...prev,
        loading: false,
        submitted: true
      }));
    }, 1500);
  };

  const resetForm = () => {
    setFormState({
      name: '',
      email: '',
      subject: '',
      message: '',
      submitted: false,
      loading: false,
      error: null
    });
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <Layout>
      <div className={styles.contactContainer}>
        <motion.div 
          className={styles.contactHeader}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 style={{ paddingTop: 24 }}>Get in Touch</h1>
          <p>Have questions about AfroHub? Want to collaborate? We'd love to hear from you!</p>
        </motion.div>

        <div className={styles.contactContent}>
          <motion.div 
            className={styles.contactInfo}
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.2, delayChildren: 0.3 }}
          >
            <motion.div className={styles.infoCard} variants={fadeInUp}>
              <div className={styles.iconWrapper}>
                <span className={styles.icon}>📍</span>
              </div>
              <h3>Visit Us</h3>
              <p>16 Nandi lane Ranui,</p>
              <p>Auckland, New Zealand</p>
            </motion.div>

            <motion.div className={styles.infoCard} variants={fadeInUp}>
              <div className={styles.iconWrapper}>
                <span className={styles.icon}>📞</span>
              </div>
              <h3>Call Us</h3>
              <p>+64 22 124 2900</p>
              <p>Mon-Fri, 9am-6pm EST</p>
            </motion.div>

            <motion.div className={styles.infoCard} variants={fadeInUp}>
              <div className={styles.iconWrapper}>
                <span className={styles.icon}>✉️</span>
              </div>
              <h3>Email Us</h3>
              <p>info@afrohub.co</p>
              <p>support@afrohub.co</p>
            </motion.div>
            
            <motion.div className={styles.socialLinks} variants={fadeInUp}>
              <h3>Connect With Us</h3>
              <div className={styles.socialIcons}>
                <a href="https://twitter.com/afrohub" aria-label="Twitter" className={styles.socialIcon}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </a>
                <a href="https://instagram.com/afrohub" aria-label="Instagram" className={styles.socialIcon}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                <a href="https://facebook.com/afrohub" aria-label="Facebook" className={styles.socialIcon}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
                <a href="https://linkedin.com/company/afrohub" aria-label="LinkedIn" className={styles.socialIcon}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            className={styles.formWrapper}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {!formState.submitted ? (
              <form className={styles.contactForm} onSubmit={handleSubmit}>
                <h2>Send us a message</h2>
                
                {formState.error && (
                  <div className={styles.errorMessage}>
                    {formState.error}
                  </div>
                )}
                
                <div className={styles.formGroup}>
                  <label htmlFor="name">Name <span className={styles.required}>*</span></label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formState.name}
                    onChange={handleChange}
                    placeholder="Your name" 
                    required 
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="email">Email <span className={styles.required}>*</span></label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formState.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com" 
                    required 
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="subject">Subject</label>
                  <input 
                    type="text" 
                    id="subject" 
                    name="subject" 
                    value={formState.subject}
                    onChange={handleChange}
                    placeholder="What is this regarding?" 
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="message">Message <span className={styles.required}>*</span></label>
                  <textarea 
                    id="message" 
                    name="message" 
                    value={formState.message}
                    onChange={handleChange}
                    placeholder="How can we help you?" 
                    rows={6} 
                    required
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  className={styles.submitButton}
                  disabled={formState.loading}
                >
                  {formState.loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            ) : (
              <div className={styles.thankYouMessage}>
                <div className={styles.checkmarkIcon}>✓</div>
                <h2>Thank You!</h2>
                <p>Your message has been sent successfully. We'll get back to you as soon as possible.</p>
                <button 
                  onClick={resetForm} 
                  className={styles.resetButton}
                >
                  Send Another Message
                </button>
              </div>
            )}
          </motion.div>
        </div>

        <motion.div 
          className={styles.mapSection}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2>Find Us</h2>
          <div className={styles.mapContainer}>
            {/* Replace with your actual Google Maps embed or an image of a map */}
            <div className={styles.map}>
              <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3187.476802156153!2d174.76448827621793!3d-36.85233807228033!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6d0d47fb254457db%3A0x360c00d98b1f9a53!2sThe%20University%20of%20Auckland!5e0!3m2!1sen!2snz!4v1714214047337!5m2!1sen!2snz"
      width="100%"
      height="100%"
      style={{ border: 0 }}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
              <div className={styles.mapPin}>
                <span>📍</span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.section 
          className={styles.faqSection}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2>Frequently Asked Questions</h2>
          <div className={styles.faqGrid}>
            {[
              {
                question: "How do I list my event on AfroHub?",
                answer: "To list your event, create an organizer account and follow the event submission process. Our team will review your submission within 24-48 hours."
              },
              {
                question: "Is AfroHub available in my country?",
                answer: "AfroHub is currently available in the United States, Canada, United Kingdom, France, and Nigeria. We're expanding to more countries soon!"
              },
              {
                question: "How do ticket sales work?",
                answer: "We handle the ticket sales process through our secure platform. Event organizers receive payments within 3-5 business days after the event concludes."
              },
              {
                question: "I need help with a ticket I purchased",
                answer: "For issues with tickets, please contact our support team at support@afrohub.co with your order number and details about your issue."
              }
            ].map((faq, index) => (
              <motion.div 
                key={index} 
                className={styles.faqItem}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.div 
          className={styles.ctaSection}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className={styles.ctaContent}>
            <h2               style={{ color: 'white' }}
>Ready to Experience AfroHub?</h2>
            <p>Download the app today and start discovering amazing events near you.</p>
            <div className={styles.appBadges}>
              <a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer">
                <Image
                  src="/appstore-badge.svg"
                  alt="Download on the App Store"
                  width={150}
                  height={50}
                />
              </a>
              <a href="https://play.google.com" target="_blank" rel="noopener noreferrer">
                <Image
                  src="/google-play-badge.svg"
                  alt="Get it on Google Play"
                  width={150}
                  height={50}
                />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}