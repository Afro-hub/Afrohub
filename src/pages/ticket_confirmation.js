// pages/ticket_confirmation.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import styles from '../styles/TicketConfirmation.module.css';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function TicketConfirmation() {
  const router = useRouter();
  const [ticketData, setTicketData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (router.isReady) {
      const {
        eventId,
        ticketCount,
        buyerName,
        title,
        date,
        time,
        location,
        image,
        theme,
        pricePerUnit,
        confirmationNumber
      } = router.query;

      if (eventId && ticketCount && buyerName) {
        setTicketData({
          eventId,
          ticketCount: parseInt(ticketCount),
          buyerName: decodeURIComponent(buyerName),
          title: decodeURIComponent(title || ''),
          date,
          time,
          location: decodeURIComponent(location || ''),
          image,
          theme: decodeURIComponent(theme || ''),
          pricePerUnit: parseFloat(pricePerUnit || 0),
          confirmationNumber
        });
      }
      setLoading(false);
    }
  }, [router.isReady, router.query]);

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeStr) => {
    if (!timeStr) return '';
    const [hours, minutes] = timeStr.split(':');
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const totalAmount = ticketData ? ticketData.pricePerUnit : 0;

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
          <p>Loading your ticket confirmation...</p>
        </div>
      </Layout>
    );
  }

  if (!ticketData) {
    return (
      <Layout>
        <div className={styles.errorContainer}>
          <h1>Invalid Ticket Information</h1>
          <p>The ticket confirmation link appears to be invalid or incomplete.</p>
          <Link href="/">
            <a className={styles.homeButton}>Return Home</a>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className={styles.container}>
        {/* Success Header */}
        <motion.div
          className={styles.successHeader}
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div className={styles.successIcon} variants={fadeInUp}>
            ✅
          </motion.div>
          <motion.h1 variants={fadeInUp}>Ticket Confirmed!</motion.h1>
          <motion.p variants={fadeInUp}>
            Your tickets have been successfully purchased. Details have been sent to your email.
          </motion.p>
        </motion.div>

        {/* Main Ticket */}
        <motion.div
          className={styles.ticketContainer}
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ delay: 0.3 }}
        >
          <div className={styles.ticket}>
            {/* Ticket Header */}
            <div className={styles.ticketHeader}>
              <div className={styles.eventImage}>
                {ticketData.image ? (
                  <Image
                    src={ticketData.image}
                    alt={ticketData.title}
                    width={120}
                    height={120}
                    className={styles.eventImg}
                  />
                ) : (
                  <div className={styles.placeholderImage}>
                    🎉
                  </div>
                )}
              </div>
              <div className={styles.eventInfo}>
                <h2>{ticketData.title}</h2>
                {ticketData.theme && (
                  <span className={styles.theme}>{ticketData.theme} Theme</span>
                )}
              </div>
            </div>

            {/* Ticket Details */}
            <div className={styles.ticketDetails}>
              <div className={styles.detailsGrid}>
                <div className={styles.detailItem}>
                  <span className={styles.label}>Date</span>
                  <span className={styles.value}>{formatDate(ticketData.date)}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.label}>Time</span>
                  <span className={styles.value}>{formatTime(ticketData.time)}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.label}>Location</span>
                  <span className={styles.value}>{ticketData.location}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.label}>Attendee</span>
                  <span className={styles.value}>{ticketData.buyerName}</span>
                </div>
              </div>
            </div>

            {/* Ticket Bottom */}
            <div className={styles.ticketBottom}>
              <div className={styles.ticketCount}>
                <span className={styles.countLabel}>Tickets</span>
                <span className={styles.countValue}>{ticketData.ticketCount}</span>
              </div>
              <div className={styles.totalAmount}>
                <span className={styles.amountLabel}>Total</span>
                <span className={styles.amountValue}>₦{totalAmount.toLocaleString()}</span>
              </div>
            </div>

            {/* Perforated Line */}
            <div className={styles.perforation}></div>

            {/* Confirmation Number */}
            <div className={styles.confirmationSection}>
              <div className={styles.confirmationNumber}>
                <span className={styles.confirmationLabel}>Confirmation #</span>
                <span className={styles.confirmationValue}>
                  {ticketData.confirmationNumber}
                </span>
              </div>
              <div className={styles.qrCode}>
                <div className={styles.qrPlaceholder}>
                  <span>QR CODE</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className={styles.actionButtons}
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ delay: 0.5 }}
        >
          <button 
            className={styles.downloadButton}
            onClick={() => window.print()}
          >
            📄 Download/Print Ticket
          </button>
          <button 
            className={styles.shareButton}
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: `${ticketData.title} - Ticket Confirmation`,
                  text: `I'm going to ${ticketData.title}!`,
                  url: window.location.href
                });
              }
            }}
          >
            📱 Share
          </button>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          className={styles.additionalInfo}
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ delay: 0.7 }}
        >
          <h3>Important Information</h3>
          <ul>
            <li>Please arrive 30 minutes before the event starts</li>
            <li>Bring a valid ID along with your ticket</li>
            <li>This ticket is non-transferable and non-refundable</li>
            <li>Save this confirmation for your records</li>
          </ul>
        </motion.div>

        {/* Footer Actions */}
        <motion.div
          className={styles.footerActions}
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ delay: 0.9 }}
        >
          <Link href="/">
            <a className={styles.homeLink}>← Back to Home</a>
          </Link>
          <Link href="/events">
            <a className={styles.eventsLink}>Browse More Events →</a>
          </Link>
        </motion.div>
      </div>
    </Layout>
  );
}