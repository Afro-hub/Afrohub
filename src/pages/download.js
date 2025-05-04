// pages/download.js
import { useState } from 'react';
import Image from 'next/image';
import Layout from '../components/Layout';
import styles from '../styles/Download.module.css';

export default function DownloadApp() {
  const [selectedPlatform, setSelectedPlatform] = useState('android');

  return (
    <Layout title="Download AfroHub | Connect with African Culture">
      <div className={styles.downloadContainer} style={{ paddingTop: 24 }}>
        <div className={styles.heroSection}           style={{ paddingTop: 24 }}
>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Download AfroHub</h1>
            <p className={styles.heroSubtitle}>
              Experience the full power of AfroHub on your device. Connect with African culture,
              community, and creativity wherever you go.
            </p>
          </div>
          <div className={styles.heroImage}>
            <div className={styles.appPreview}>
              <Image
                src="/onBoarding1.png"
                                width={600}

                className={styles.phoneImage}
              />
            </div>
          </div>
        </div>

        <div className={styles.platformSelector}>
          <div className={styles.platformTabs}>
            <button
              className={`${styles.platformTab} ${selectedPlatform === 'android' ? styles.activeTab : ''}`}
              onClick={() => setSelectedPlatform('android')}
            >
              <span className={styles.platformIcon}>
                {/* Add Android icon */}
                A
              </span>
              Android
            </button>
            <button
              className={`${styles.platformTab} ${selectedPlatform === 'ios' ? styles.activeTab : ''}`}
              onClick={() => setSelectedPlatform('ios')}
            >
              <span className={styles.platformIcon}>
                {/* Add iOS icon */}
                i
              </span>
              iOS
            </button>
          </div>

          <div className={styles.downloadContent}>
            {selectedPlatform === 'android' && (
              <div className={styles.platformContent}>
                <h2>Download for Android</h2>
                <p>Get the AfroHub app for your Android device.</p>
                <div className={styles.requirementsBox}>
                  <h3>System Requirements:</h3>
                  <ul>
                    <li>Android 8.0 (Oreo) or newer</li>
                    <li>At least 100MB of free space</li>
                    <li>Internet connection required</li>
                  </ul>
                </div>
                <div className={styles.downloadButtons}>
                  <a href="https://play.google.com/store/apps/details?id=com.afrohub"
                     target="_blank"
                     rel="noopener noreferrer">
                    <Image
                                      src="/google-play-badge.svg"
                                      alt="Get it on Google Play"
                                    width={192}
                                      height={88}
                                    />
                  </a>
                  <a href="/direct-download/afrohub-latest.apk"
                     className={styles.directDownloadButton}>
                    Direct Download APK (v1.5.3)
                  </a>
                </div>
              </div>
            )}

            {selectedPlatform === 'ios' && (
              <div className={styles.platformContent}>
                <h2>Download for iOS</h2>
                <p>Get the AfroHub app for your iPhone or iPad.</p>
                <div className={styles.requirementsBox}>
                  <h3>System Requirements:</h3>
                  <ul>
                    <li>iOS 13.0 or newer</li>
                    <li>Compatible with iPhone, iPad, and iPod touch</li>
                    <li>At least 120MB of free space</li>
                  </ul>
                </div>
                <div className={styles.downloadButtons}>
                  <a href="https://apps.apple.com/app/afrohub/id1234567890"
                     target="_blank"
                     rel="noopener noreferrer">
                    <Image
                                      src="/appstore-badge.svg"
                                      alt="Download on the App Store"
                                       width={180}
                                      height={80}
                                    />
                  </a>
                </div>
              </div>
            )}


          </div>
        </div>

        <div className={styles.featureSection}>
          <h2 className={styles.featureSectionTitle}>Why Download the App?</h2>
          <div className={styles.features}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🔔</div>
              <h3>Stay Connected</h3>
              <p>Get instant notifications and never miss updates from your network.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🎵</div>
              <h3>Offline Access</h3>
              <p>Save content for offline viewing when you're on the go.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>⚡</div>
              <h3>Enhanced Performance</h3>
              <p>Experience faster loading times and smoother navigation.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🔒</div>
              <h3>Secure Access</h3>
              <p>Additional security features to protect your account.</p>
            </div>
          </div>
        </div>

        <div className={styles.faqSection}>
          <h2 className={styles.faqTitle}>Frequently Asked Questions</h2>
          <div className={styles.faqList}>
            <div className={styles.faqItem}>
              <h3>Is the app free to download?</h3>
              <p>Yes, the AfroHub app is completely free to download on all platforms.</p>
            </div>
            <div className={styles.faqItem}>
              <h3>Will the app work on my older phone?</h3>
              <p>The app requires Android 8.0+ or iOS 13.0+. For older devices, you can access AfroHub through your web browser.</p>
            </div>
            <div className={styles.faqItem}>
              <h3>How often is the app updated?</h3>
              <p>We release updates every 2-4 weeks with new features, improvements, and bug fixes.</p>
            </div>
            <div className={styles.faqItem}>
              <h3>Can I use the same account across multiple devices?</h3>
              <p>Yes, you can log in to your AfroHub account on multiple devices simultaneously.</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}