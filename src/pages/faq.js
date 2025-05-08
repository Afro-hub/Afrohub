// pages/faq.js
import { useState } from 'react';
import Layout from '../components/Layout';
import styles from '../styles/FAQ.module.css';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function FAQ() {
  // State to track which FAQ items are expanded
  const [expandedItems, setExpandedItems] = useState({});
  
  // FAQ categories with their respective questions
  const faqCategories = [
    {
      title: "Using AfroHub",
      icon: "🎟️",
      questions: [
        {
          question: "How do I buy a ticket?",
          answer: "Download the AfroHub app from the App Store or Google Play, browse events, select your preferred event, and securely purchase your ticket in just a few taps. You'll receive an e-ticket that will be stored in the 'My Tickets' section of the app."
        },
        {
          question: "How do I find events near me?",
          answer: "The app uses your location to show nearby events by default. You can also search for events in specific cities or filter by event type, date, and price range to find exactly what you're looking for."
        },
        {
          question: "Can I get a refund if I can't attend an event?",
          answer: "Refund policies vary by event organizer. You can view the specific refund policy for each event on the event details page before purchasing your ticket. If eligible, you can request a refund through the 'My Tickets' section."
        },
        {
          question: "Is there a way to share events with friends?",
          answer: "Yes! On any event page, tap the 'Share' button to send the event details via text, email, or social media. You can also create group plans within the app to coordinate with friends."
        }
      ]
    },
    {
      title: "For Event Organizers",
      icon: "📋",
      questions: [
        {
          question: "Can I list my own event?",
          answer: "Absolutely! Tap 'Become a Vendor' in the app or on our website to start listing your events. You'll need to create an organizer account and provide some basic information about your event and organization."
        },
        {
          question: "What types of events can I list?",
          answer: "You can list any Afro-inspired or African cultural events including concerts, festivals, dance workshops, art exhibitions, networking events, food tastings, and more. All events undergo a brief review process to ensure they align with our community guidelines."
        },
        {
          question: "How much does it cost to list an event?",
          answer: "Basic listing is free. We operate on a commission-based model, taking a small percentage of each ticket sold through our platform. Premium listing options with enhanced visibility features are available starting at $19.99 per event."
        },
        {
          question: "How do I receive payments for ticket sales?",
          answer: "Funds are automatically transferred to your connected bank account or mobile money account within 7 days after your event concludes. You can track sales and projected payouts in real-time through your organizer dashboard."
        }
      ]
    },
    {
      title: "Payments & Security",
      icon: "🔒",
      questions: [
        {
          question: "Is payment secure?",
          answer: "Yes, we use Stripe and Paystack for secure and fast payments. Your payment information is encrypted and never stored on our servers. We comply with PCI DSS standards to ensure the highest level of transaction security."
        },
        {
          question: "What payment methods are accepted?",
          answer: "We accept major credit/debit cards, Apple Pay, Google Pay, PayPal, and mobile money services in select regions. Payment options may vary slightly depending on your location and the event's currency."
        },
        {
          question: "Are there any hidden fees?",
          answer: "All applicable fees are clearly displayed before you complete your purchase. These may include service fees and taxes, which vary by event and location."
        },
        {
          question: "Is my personal information safe?",
          answer: "We take data privacy seriously. We use industry-standard security measures to protect your personal information and only collect essential data needed to provide our services. For more details, please review our Privacy Policy."
        }
      ]
    },
    {
      title: "Technical Support",
      icon: "🛠️", 
      questions: [
        {
          question: "The app is not working properly. What should I do?",
          answer: "First, try updating the app to the latest version and restart your device. If issues persist, you can report the problem through the 'Help & Support' section in the app or contact our support team directly."
        },
        {
          question: "How do I update my profile or account details?",
          answer: "Go to the 'Profile' tab in the app, tap on 'Edit Profile' or 'Account Settings' to update your information including contact details, payment methods, and notification preferences."
        },
        {
          question: "Can I use AfroHub on my computer?",
          answer: "Yes! While our mobile app offers the best experience, you can access most features through our website at www.afrohub.co using any modern web browser."
        },
        {
          question: "How do I contact customer support?",
          answer: "You can reach our support team through the 'Help & Support' section in the app, via email at support@afrohub.co, or through our social media channels. Our support hours are 24/7 for urgent matters and 9 AM - 6 PM EST for general inquiries."
        }
      ]
    }
  ];
  
  // Toggle FAQ item expansion
  const toggleItem = (categoryIndex, questionIndex) => {
    const key = `${categoryIndex}-${questionIndex}`;
    setExpandedItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <Layout>
      <div className={styles.faqContainer}>
        <div className={styles.faqHeader}
          style={{ paddingTop: 24 }}
        >
          <motion.h1 
            className={styles.faqTitle}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Frequently Asked Questions
          </motion.h1>
          <motion.p 
            className={styles.faqSubtitle}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Find answers to common questions about using AfroHub
          </motion.p>
        </div>
        
        {/* <div className={styles.faqSearch}>
          <input 
            type="text" 
            placeholder="Search for answers..." 
            className={styles.searchInput}
          />
          <button className={styles.searchButton}>
            Search
          </button>
        </div> */}
        
        <div className={styles.faqContentWrapper}>
          <motion.div 
            className={styles.faqContent}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {faqCategories.map((category, categoryIndex) => (
              <motion.div 
                key={categoryIndex} 
                className={styles.faqCategory}
                variants={itemVariants}
              >
                <div className={styles.categoryHeader}>
                  <span className={styles.categoryIcon}>{category.icon}</span>
                  <h2 className={styles.categoryTitle}>{category.title}</h2>
                </div>
                
                <div className={styles.questionsList}>
                  {category.questions.map((item, questionIndex) => {
                    const isExpanded = expandedItems[`${categoryIndex}-${questionIndex}`];
                    return (
                      <div 
                        key={questionIndex} 
                        className={`${styles.faqItem} ${isExpanded ? styles.expanded : ''}`}
                        onClick={() => toggleItem(categoryIndex, questionIndex)}
                      >
                        <div className={styles.faqQuestion}>
                          <h3>{item.question}</h3>
                          <span className={styles.expandIcon}>
                            {isExpanded ? '−' : '+'}
                          </span>
                        </div>
                        
                        {isExpanded && (
                          <motion.div 
                            className={styles.faqAnswer}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            transition={{ duration: 0.3 }}
                          >
                            <p>{item.answer}</p>
                          </motion.div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <div className={styles.faqSidebar}>
            <div className={styles.contactCard}>
              <h3 style={{ color: 'white' }}>Still have questions?</h3>
              <p>Our support team is here to help you with any other questions you might have.</p>
              <Link href="/contact">
                <a className={styles.contactButton}>Contact Support</a>
              </Link>
            </div>
            
            <div className={styles.appPromo}>
              <div className={styles.appImage}>
                <Image 
                  src="/favicon.ico"
                  alt="AfroHub App" 
                  width={80} 
                  height={80}
                />
              </div>
              <div className={styles.appText}>
                <h3>Get the full experience</h3>
                <p>Download our app for the best event discovery experience</p>
                <div className={styles.appButtons}>
                  <a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer">
                    <Image
                      src="/appstore-badge.svg"
                      alt="Download on the App Store"
                      width={120}
                      height={40}
                    />
                  </a>
                  <a href="https://play.google.com" target="_blank" rel="noopener noreferrer">
                    <Image
                      src="/google-play-badge.svg"
                      alt="Get it on Google Play"
                      width={120}
                      height={44}
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}