// components/Layout.js
import { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import styles from '../styles/Layout.module.css';

export default function Layout({ children, title = 'AfroHub - Connect with African Culture' }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <meta name="description" content="AfroHub - Your gateway to African culture, community, and connections" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <div className={styles.headerContent}>
          <Link href="/" className={styles.logo}>
            <span className={styles.logoText}>AfroHub</span>
          </Link>
          
          <button 
            className={styles.menuButton} 
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation menu"
          >
            <span className={styles.hamburger}>
              <span className={styles.bar}></span>
              <span className={styles.bar}></span>
              <span className={styles.bar}></span>
            </span>
          </button>

          <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
            <Link href="/" className={styles.navLink}>Home</Link>
            <Link href="/about" className={styles.navLink}>About</Link>
            <Link href="/faq" className={styles.navLink}>FAQ</Link>
            <Link href="/contact" className={styles.navLink}>Contact</Link>
          </nav>
        </div>
      </header>

      <main className={styles.mainContent}>
        {children}
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerLinks}>
            <Link href="/privacy" className={styles.footerLink}>Privacy Policy</Link>
            <Link href="/terms" className={styles.footerLink}>Terms of Service</Link>
            <Link href="/delete-account" className={styles.footerLink}>Delete account</Link>
            <Link href="/contact" className={styles.footerLink}>Contact Us</Link>
          </div>
          <p className={styles.copyright}>&copy; {new Date().getFullYear()} AfroHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}