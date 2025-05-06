// pages/terms.js
import Layout from '../components/Layout';
import styles from '../styles/Policy.module.css';

export default function TermsOfService() {
  return (
    <Layout title="Terms of Service | AfroHub">
      <div className={styles.policyContainer}>
        <h1 className={styles.policyTitle}           style={{ paddingTop: 64 }}
>Terms of Service</h1>
        <p className={styles.lastUpdated}>Last Updated: April 30, 2025</p>

        <section className={styles.policySection}>
          <h2>Introduction</h2>
          <p>
            Welcome to AfroHub. These Terms of Service ("Terms") govern your access to and use of the AfroHub website, services, and applications (collectively, the "Services"). By accessing or using our Services, you agree to be bound by these Terms. If you do not agree to these Terms, you may not access or use the Services.
          </p>
        </section>

        <section className={styles.policySection}>
          <h2>Definitions</h2>
          <p>In these Terms:</p>
          <ul>
            <li>"AfroHub," "we," "us," and "our" refer to AfroHub and its subsidiaries or affiliates.</li>
            <li>"You" and "your" refer to the individual or entity using our Services.</li>
            <li>"Content" means text, graphics, images, music, software, audio, video, information, or other materials.</li>
            <li>"User Content" means Content that users submit, post, or transmit to, or through, the Services.</li>
          </ul>
        </section>

        <section className={styles.policySection}>
          <h2>Account Registration</h2>
          <p>
            To access certain features of our Services, you may be required to register for an account. When you register, you agree to provide accurate, current, and complete information and to update this information to maintain its accuracy. You are responsible for safeguarding your account credentials and for all activities that occur under your account.
          </p>
          <p>
            You must notify us immediately of any unauthorized use of your account or any other breach of security. We cannot and will not be liable for any loss or damage arising from your failure to comply with these requirements.
          </p>
        </section>

        <section className={styles.policySection}>
          <h2>User Content</h2>
          <p>
            Our Services allow you to create, upload, post, send, receive, and store Content. When you provide User Content, you grant us a non-exclusive, worldwide, royalty-free, sublicensable, and transferable license to use, reproduce, modify, distribute, and display such User Content in connection with operating and providing our Services.
          </p>
          <p>
            You represent and warrant that:
          </p>
          <ul>
            <li>You own or have the necessary rights to use and authorize the use of your User Content;</li>
            <li>Your User Content does not violate any third party's intellectual property rights, privacy rights, or other rights;</li>
            <li>Your User Content complies with these Terms and all applicable laws and regulations.</li>
          </ul>
        </section>

        <section className={styles.policySection}>
          <h2>Prohibited Conduct</h2>
          <p>
            You agree not to:
          </p>
          <ul>
            <li>Use the Services in any way that violates any applicable law or regulation;</li>
            <li>Impersonate any person or entity, or falsely state or misrepresent your affiliation with a person or entity;</li>
            <li>Engage in any harassing, abusive, or harmful behavior toward other users;</li>
            <li>Upload, post, or transmit any Content that is illegal, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, or invasive of another's privacy;</li>
            <li>Use the Services to distribute unsolicited promotional or commercial content, or to send spam, chain letters, or pyramid schemes;</li>
            <li>Attempt to gain unauthorized access to our systems or interfere with, disrupt, or create an undue burden on our Services;</li>
            <li>Introduce any viruses, trojan horses, worms, or other material that is malicious or technologically harmful;</li>
            <li>Collect or harvest any information about other users, including email addresses, without their consent;</li>
            <li>Use our Services for any illegal purpose.</li>
          </ul>
        </section>

        <section className={styles.policySection}>
          <h2>Intellectual Property Rights</h2>
          <p>
            The Services and all Content originating from AfroHub are the exclusive property of AfroHub and its licensors. The Services are protected by copyright, trademark, and other laws of both the United States and foreign countries.
          </p>
          <p>
            Subject to your compliance with these Terms, AfroHub grants you a limited, non-exclusive, non-transferable, non-sublicensable license to access and use the Services for your personal or internal business purposes.
          </p>
        </section>

        <section className={styles.policySection}>
          <h2>DMCA Notice and Procedure</h2>
          <p>
            If you believe that your copyrighted work has been copied in a way that constitutes copyright infringement, please provide our copyright agent with the following information:
          </p>
          <ol>
            <li>A physical or electronic signature of the copyright owner or a person authorized to act on their behalf;</li>
            <li>Identification of the copyrighted work claimed to have been infringed;</li>
            <li>Identification of the material that is claimed to be infringing or to be the subject of infringing activity and that is to be removed or access to which is to be disabled, and information reasonably sufficient to permit us to locate the material;</li>
            <li>Contact information, including your address, telephone number, and an email address;</li>
            <li>A statement that you have a good faith belief that use of the material in the manner complained of is not authorized by the copyright owner, its agent, or the law;</li>
            <li>A statement that the information in the notification is accurate, and, under penalty of perjury, that you are authorized to act on behalf of the copyright owner.</li>
          </ol>
          <p>
            Our designated copyright agent can be reached at: info@afrohub.co
          </p>
        </section>

        <section className={styles.policySection}>
          <h2>Termination</h2>
          <p>
            We may terminate or suspend your access to our Services immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms.
          </p>
          <p>
            All provisions of these Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
          </p>
        </section>

        <section className={styles.policySection}>
          <h2>Disclaimer of Warranties</h2>
          <p>
            THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
          </p>
          <p>
            WE DO NOT WARRANT THAT THE SERVICES WILL BE UNINTERRUPTED OR ERROR-FREE, THAT DEFECTS WILL BE CORRECTED, OR THAT THE SERVICES OR THE SERVERS THAT MAKE THEM AVAILABLE ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS.
          </p>
        </section>

        <section className={styles.policySection}>
          <h2>Limitation of Liability</h2>
          <p>
            TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL AFROHUB, ITS AFFILIATES, OR THEIR RESPECTIVE DIRECTORS, OFFICERS, EMPLOYEES, OR AGENTS BE LIABLE FOR ANY INDIRECT, PUNITIVE, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR EXEMPLARY DAMAGES, INCLUDING DAMAGES FOR LOSS OF PROFITS, GOODWILL, USE, DATA, OR OTHER INTANGIBLE LOSSES, ARISING OUT OF OR RELATING TO YOUR USE OF, OR INABILITY TO USE, THE SERVICES.
          </p>
        </section>

        <section className={styles.policySection}>
          <h2>Indemnification</h2>
          <p>
            You agree to defend, indemnify, and hold harmless AfroHub, its affiliates, and their respective directors, officers, employees, and agents from and against all claims, damages, obligations, losses, liabilities, costs, and expenses arising from: (a) your use of the Services; (b) your violation of these Terms; (c) your violation of any third-party right, including any intellectual property or privacy right; or (d) any claim that your User Content caused damage to a third party.
          </p>
        </section>

        <section className={styles.policySection}>
          <h2>Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of [Your Country/State], without regard to its conflict of law provisions.
          </p>
        </section>

        <section className={styles.policySection}>
          <h2>Changes to These Terms</h2>
          <p>
            We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
          </p>
          <p>
            By continuing to access or use our Services after revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, you must stop using the Services.
          </p>
        </section>

        <section className={styles.policySection}>
          <h2>Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at:
          </p>
          <p className={styles.contactInfo}>
            AfroHub<br />
            Email: support@afrohub.co<br />
            Address: 16 Nandi lane Ranui, Auckland, New Zealand
          </p>
        </section>
      </div>
    </Layout>
  );
}