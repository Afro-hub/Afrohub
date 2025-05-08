// pages/about.js
import { useEffect } from 'react';
import Layout from '../components/Layout';
import styles from '../styles/About.module.css';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function About() {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
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

  return (
    <Layout>
      <div className={styles.container}>
        {/* Hero Section */}
        <motion.div
          className={styles.aboutHero}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className={styles.heroOverlay}></div>
          <motion.div 
            className={styles.heroContent}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <h1 style={{ color: 'white' }}>Our Story</h1>
            <p>Connecting people through the power of Afro-culture</p>
          </motion.div>
        </motion.div>

        {/* Mission Section */}
        <motion.section 
          className={styles.missionSection}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.h2 variants={fadeIn}>Our Mission</motion.h2>
          
          <motion.div className={styles.missionContent} variants={fadeIn}>
            <div className={styles.missionText}>
              <p className={styles.leadText}>
                AfroHub is more than an app — it's a cultural movement dedicated to celebrating and elevating Afro-diaspora communities worldwide.
              </p>
              <p>
                Whether it's music, dance, fashion, art, or food — our platform brings authentic experiences straight to your pocket, connecting you with the vibrant pulse of African culture wherever you are.
              </p>
              <p>
                We believe in the power of community and representation. Through technology, we're building bridges between creators, artists, entrepreneurs, and enthusiasts across the global African diaspora.
              </p>
            </div>
            
            <div className={styles.missionImage}>
              <Image
                src="/african_party.jpg"
                alt="AfroHub Community Event"
                width={500}
                height={400}
                className={styles.roundedImage}
              />
            </div>
          </motion.div>
        </motion.section>

        {/* Values Section */}
        <motion.section 
          className={styles.valuesSection}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.h2 variants={fadeIn}>Our Values</motion.h2>
          
          <motion.div className={styles.valuesGrid} variants={fadeIn}>
            {[
              {
                icon: "✊🏿",
                title: "Representation",
                description: "Amplifying African voices and creating spaces where everyone feels seen and celebrated"
              },
              {
                icon: "🤝",
                title: "Community",
                description: "Fostering connections and building bridges between people who share a love for African culture"
              },
              {
                icon: "💡",
                title: "Innovation",
                description: "Using technology to solve problems and create new opportunities for cultural exchange"
              },
              {
                icon: "🌍",
                title: "Authenticity",
                description: "Staying true to the rich diversity and heritage of Africa and its diaspora"
              }
            ].map((value, index) => (
              <motion.div 
                key={index} 
                className={styles.valueCard}
                variants={fadeIn}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <div className={styles.valueIcon}>{value.icon}</div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Story Section */}
        <motion.section 
          className={styles.storySection}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.div className={styles.storyContent} variants={fadeIn}>
            <div className={styles.storyImage}>
              <Image
                src="/founder.jpeg"
                alt="AfroHub Founders"
                width={480}
                height={400}
                className={styles.roundedImage}
              />
            </div>
            
            <div className={styles.storyText}>
              <h2>The AfroHub Story</h2>
              <p>
                AfroHub began in 2024 when Francis Ebere Anyanka — found himselves constantly struggling to discover authentic African cultural events in his city.
              </p>
              <p>
                After missing yet another Afrobeats concert because he heard about it too late, he decided to create a solution. What started as a simple WhatsApp group sharing event information quickly evolved into the platform you see today.
              </p>
              <p>
                With backgrounds spanning technology, event planning, and community organizing, he built AfroHub to solve a real problem: connecting people with the events and experiences that celebrate African culture and heritage.
              </p>
            </div>
          </motion.div>
        </motion.section>

        {/* Impact Stats */}
        <motion.section 
          className={styles.impactSection}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.h2               style={{ color: 'white' }}
 variants={fadeIn}>Our Impact</motion.h2>
          
          <motion.div className={styles.impactStats} variants={fadeIn}>
            {[
              { number: "200+", label: "Event Organizers Supported" },
              { number: "$1.2M+", label: "Revenue Generated for Creators" },
              { number: "45K+", label: "Event Attendees" },
              { number: "15+", label: "Countries Reached" }
            ].map((stat, index) => (
              <motion.div 
                key={index} 
                className={styles.statBox}
                variants={fadeIn}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className={styles.statNumber}>{stat.number}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Team Section */}
        <motion.section 
          className={styles.teamSection}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.h2 variants={fadeIn}>Meet Our Team</motion.h2>
          <motion.p className={styles.teamSubtitle} variants={fadeIn}>
            The passionate individuals bringing AfroHub to life
          </motion.p>
          
          <motion.div className={styles.teamGrid} variants={fadeIn}>
            {[
              {
                name: "Francis Ebere Anyanka",
                role: "CEO & Founder",
                bio: "Former product manager with a passion for music and technology."
              },
              {
                name: "Nia Johnson",
                role: "COO & Co-Founder",
                bio: "Event planning expert with 8+ years of experience in the entertainment industry."
              },
              {
                name: "Emmanuel Muyiwa Oladoyin",
                role: "Head of Technology",
                bio: "Software engineer specializing in mobile applications and community platforms."
              }
            ].map((member, index) => (
              <motion.div 
                key={index} 
                className={styles.teamCard}
                variants={fadeIn}
                whileHover={{ y: -8 }}
              >
                <div className={styles.teamAvatar}>
                  <Image
                    src={`/team-${index + 1}.jpg`}
                    alt={member.name}
                    width={120}
                    height={120}
                    className={styles.avatarImage}
                  />
                </div>
                <h3>{member.name}</h3>
                <span className={styles.teamRole}>{member.role}</span>
                <p>{member.bio}</p>
                <div className={styles.socialIcons}>
                  <a href="#" aria-label="LinkedIn"><span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                                      <rect x="2" y="9" width="4" height="12"></rect>
                                      <circle cx="4" cy="4" r="2"></circle>
                                    </svg>
                  </span></a>
                  <a href="#" aria-label="Twitter"><span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                                    </svg>
                  </span></a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Partners Section */}
        {/* <motion.section
          className={styles.partnersSection}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.h2 variants={fadeIn}>Our Partners</motion.h2>
          <motion.p className={styles.partnersSubtitle} variants={fadeIn}>
            Collaborating with organizations who share our vision
          </motion.p>
          
          <motion.div className={styles.partnersGrid} variants={fadeIn}>
            {[1, 2, 3, 4, 5].map((index) => (
              <motion.div 
                key={index} 
                className={styles.partnerLogo}
                variants={fadeIn}
                whileHover={{ scale: 1.05 }}
              >
                <Image
                  src={`/partner-${index}.png`}
                  alt={`Partner ${index}`}
                  width={150}
                  height={80}
                  objectFit="contain"
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.section> */}

        {/* Join Us CTA */}
        <motion.section 
          className={styles.joinSection}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <div className={styles.joinContent}>
            <h2               style={{ color: 'white' }}
>Join the Movement</h2>
            <p>Be part of our mission to celebrate and elevate African culture worldwide.</p>
            
            <div className={styles.joinButtons}>
              <Link href="/download">
                <a className={styles.primaryButton}>Download the App</a>
              </Link>
              <Link href="/contact">
                <a className={styles.outlineButton}>Contact Us</a>
              </Link>
            </div>
          </div>
        </motion.section>
      </div>
    </Layout>
  );
}