// pages/index.js
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import styles from '../styles/Home.module.css';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  // Show CTA banner after scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 }
  };


  const [events, setEvents] = useState([]);
useEffect(() => {
  const fetchEvents = async () => {
    try {
      const res = await fetch("https://afrohub.onrender.com/api/events/featured");
      const data = await res.json();

      // Sort by date descending and take the latest 6
      const sortedEvents = data
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 6);

      setEvents(sortedEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };
  fetchEvents();
}, []);


  return (
    <Layout>
      <div className={styles.container}>
        {/* Hero Section */}
        <motion.div
          className={styles.hero}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className={styles.heroContent}>
            <motion.h1
              className={styles.title}
              style={{ color: 'white' }}

              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Find Your Rhythm with <span className={styles.highlight}>AfroHub</span>
            </motion.h1>

            <motion.p
              className={styles.subtitle}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Your gateway to authentic Afro-inspired events, music, and culture from around the world.
            </motion.p>


            <motion.div
              className={styles.badges}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
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
                  width={158}
                  height={50}
                />
              </a>
            </motion.div>
          </div>

          <motion.div
            className={styles.heroImage}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <div className={styles.phoneWrapper}>
              <Image
                src="/onBoarding1.png"
                width={400}
                height={500}
                className={styles.phoneImage}
              />
              <div className={styles.glowEffect}></div>
            </div>
          </motion.div>
        </motion.div>

        {/* Stats Section */}
        <motion.section
          className={styles.statsSection}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.2 }}
        >
          <div className={styles.statsContainer}>
            {[
              { number: '500+', label: 'Events Monthly' },
              { number: '50k+', label: 'Active Users' },
              { number: '120+', label: 'Cities Worldwide' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className={styles.statItem}
                variants={fadeInUp}
              >
                <span className={styles.statNumber}>{stat.number}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Features Section */}
        <section className={styles.features}>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            Why Choose AfroHub?
          </motion.h2>

          <div className={styles.featureGrid}>
            {[
              {
                icon: "🎵",
                title: "Discover Events",
                description: "From concerts to cultural festivals, find authentic Afro-inspired experiences near you."
              },
              {
                icon: "🎟️",
                title: "Instant Tickets",
                description: "Buy tickets easily and securely through our app with just a few taps — no hassle!"
              },
              {
                icon: "👥",
                title: "Support Creators",
                description: "Empower local African artists, vendors, and entrepreneurs through your attendance."
              },
              {
                icon: "🌍",
                title: "Global Community",
                description: "Connect with fellow enthusiasts who share your passion for African culture and music."
              },
              {
                icon: "📱",
                title: "Event Updates",
                description: "Get notified about upcoming events matching your preferences and location."
              },
              {
                icon: "💰",
                title: "Exclusive Deals",
                description: "Access special promotions and early-bird discounts only available on AfroHub."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className={styles.featureCard}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className={styles.featureIcon}>{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Events Preview Section */}
        <motion.section
              className={styles.eventsPreview}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.h2 variants={fadeInUp}>Trending Events</motion.h2>
              <motion.p className={styles.sectionSubtitle} variants={fadeInUp}>
                Discover what's happening around you
              </motion.p>

              <motion.div className={styles.eventCards} variants={fadeInUp}>
                {events.map((event) => (
                  <div key={event._id} className={styles.eventCard}>
                    <div className={styles.eventImageContainer}>
                      <Image
                        src={event.image}
                        alt={event.title}
                        layout="fill"
                        objectFit="cover"
                        className={styles.eventImage}
                      />
                      <div className={styles.eventDate}>
                        <span>{new Date(event.date).toLocaleString("default", { month: "short" }).toUpperCase()}</span>
                        <span>{new Date(event.date).getDate()}</span>
                      </div>
                    </div>
                    <div className={styles.eventInfo}>
                      <h3>{event.title}</h3>
                      <p className={styles.eventLocation}>
                        <span className={styles.locationIcon}>📍</span> {event.location}
                      </p>
                      <div className={styles.eventMeta}>
                        <span>{event.time}</span>
                        <span className={styles.eventPrice}>${event.price}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>

              <motion.div className={styles.viewAllContainer} variants={fadeInUp}>
                <Link href="/download" legacyBehavior>
                  <a className={styles.viewAllButton}>View All Events</a>
                </Link>
              </motion.div>
            </motion.section>

        {/* Testimonials Section */}
        <motion.section
          className={styles.testimonials}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2 variants={fadeInUp}>What Our Users Say</motion.h2>

          <motion.div
            className={styles.testimonialGrid}
            variants={fadeInUp}
          >
            {[
              {
                name: "Sarah K.",
                location: "London",
                text: "AfroHub completely changed how I discover events. Found an amazing Afrobeat concert last month that I would have missed otherwise!"
              },
              {
                name: "Michael J.",
                location: "Toronto",
                text: "As an event organizer, AfroHub has helped me reach a wider audience passionate about African culture. Ticket sales have doubled!"
              },
              {
                name: "Priya T.",
                location: "New York",
                text: "I love how easy it is to find authentic cultural experiences. The app UI is beautiful and the recommendations are spot on."
              }
            ].map((testimonial, index) => (
              <div key={index} className={styles.testimonialCard}>
                <div className={styles.quote}>"</div>
                <p>{testimonial.text}</p>
                <div className={styles.testimonialAuthor}>
                  <strong>{testimonial.name}</strong> • {testimonial.location}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.section>

        {/* Download CTA */}
        <motion.section
          className={styles.downloadCta}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div className={styles.downloadContent}  variants={fadeInUp}>
            <h2               style={{ color: 'white' }}
>Ready to explore?</h2>
            <p>Download the AfroHub app and start discovering amazing events today.</p>

            <div className={styles.downloadBadges}>
              <a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer">
                <Image
                  src="/appstore-badge.svg"
                  alt="Download on the App Store"
                  width={180}
                  height={60}
                />
              </a>
              <a href="https://play.google.com" target="_blank" rel="noopener noreferrer">
                <Image
                  src="/google-play-badge.svg"
                  alt="Get it on Google Play"
                  width={180}
                  height={60}
                />
              </a>
            </div>
          </motion.div>

          <motion.div className={styles.downloadImage} variants={fadeInUp}>
            <Image
              src="/onBoarding2.png"
              width={400}
              height={500}
            />
          </motion.div>
        </motion.section>
      </div>
    </Layout>
  );
}