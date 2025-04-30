// pages/privacy.js
import Layout from '../components/Layout';
import styles from '../styles/Policy.module.css';

export default function PrivacyPolicy() {
  return (
    <Layout title="Privacy Policy | AfroHub">
      <div className={styles.policyContainer}>
        <h1 className={styles.policyTitle}           style={{ paddingTop: 64 }}
>Privacy Policy</h1>
        <p className={styles.lastUpdated}>Last Updated: April 30, 2025</p>

        <section className={styles.policySection}>
          <h2>Introduction</h2>
          <p>
            Welcome to AfroHub ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
          </p>
          <p>
            Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy, please do not access the site.
          </p>
        </section>

        <section className={styles.policySection}>
          <h2>Information We Collect</h2>
          <p>
            We collect personal information that you voluntarily provide to us when you register on our platform, express interest in obtaining information about us or our products and services, participate in activities on the platform, or otherwise contact us.
          </p>
          <h3>Personal Information</h3>
          <p>
            The personal information we collect may include:
          </p>
          <ul>
            <li>Name, email address, and contact information</li>
            <li>Profile information (username, profile picture, bio)</li>
            <li>Account preferences and settings</li>
            <li>Content you create, upload, or share on our platform</li>
            <li>Communications with us and other users</li>
          </ul>

          <h3>Automatically Collected Information</h3>
          <p>
            When you visit our website, we may automatically collect certain information about your device, including:
          </p>
          <ul>
            <li>IP address and geographic location</li>
            <li>Browser type and version</li>
            <li>Operating system</li>
            <li>Referring website</li>
            <li>Time spent on pages</li>
            <li>Unique device identifiers</li>
          </ul>
        </section>

        <section className={styles.policySection}>
          <h2>How We Use Your Information</h2>
          <p>
            We use the information we collect in the following ways:
          </p>
          <ul>
            <li>To provide, operate, and maintain our website and services</li>
            <li>To create and manage your account</li>
            <li>To process and complete transactions</li>
            <li>To send administrative information, updates, and security alerts</li>
            <li>To respond to your comments, questions, and requests</li>
            <li>To personalize your experience and deliver content relevant to your interests</li>
            <li>To improve our website, products, and services</li>
            <li>To protect our rights, property, or safety, and that of our users</li>
          </ul>
        </section>

        <section className={styles.policySection}>
          <h2>Sharing Your Information</h2>
          <p>
            We may share your information with third parties in the following situations:
          </p>
          <ul>
            <li><strong>Business Partners:</strong> We may share your information with our business partners to offer you certain products, services, or promotions.</li>
            <li><strong>Service Providers:</strong> We may share your information with service providers who perform services for us (e.g., payment processing, data analysis, email delivery).</li>
            <li><strong>Legal Requirements:</strong> We may disclose your information where required to do so by law or in response to valid requests by public authorities.</li>
            <li><strong>Business Transfers:</strong> We may share or transfer your information in connection with a merger, acquisition, or sale of all or a portion of our assets.</li>
          </ul>
        </section>

        <section className={styles.policySection}>
          <h2>Your Privacy Rights</h2>
          <p>
            Depending on your location, you may have certain rights regarding your personal information, including:
          </p>
          <ul>
            <li>The right to access personal information we hold about you</li>
            <li>The right to request correction of inaccurate personal information</li>
            <li>The right to request deletion of your personal information</li>
            <li>The right to opt-out of marketing communications</li>
            <li>The right to withdraw consent where we rely on consent to process your information</li>
          </ul>
          <p>
            To exercise these rights, please contact us using the information provided below.
          </p>
        </section>

        <section className={styles.policySection}>
          <h2>Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect the security of your personal information. However, please note that no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section className={styles.policySection}>
          <h2>Cookies and Tracking Technologies</h2>
          <p>
            We use cookies and similar tracking technologies to track activity on our website and store certain information. Cookies are files with a small amount of data that may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
          </p>
        </section>

        <section className={styles.policySection}>
          <h2>Third-Party Websites</h2>
          <p>
            Our website may contain links to third-party websites. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.
          </p>
        </section>

        <section className={styles.policySection}>
          <h2>Children's Privacy</h2>
          <p>
            Our services are not intended for individuals under the age of 16. We do not knowingly collect personal information from children under 16. If we learn we have collected personal information from a child under 16, we will delete that information as quickly as possible.
          </p>
        </section>

        <section className={styles.policySection}>
          <h2>Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
          </p>
        </section>

        <section className={styles.policySection}>
          <h2>Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          <p className={styles.contactInfo}>
            AfroHub<br />
            Email: privacy@afrohub.com<br />
            Address: 123 Main Street, Suite 100, City, Country
          </p>
        </section>
      </div>
    </Layout>
  );
}