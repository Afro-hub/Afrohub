// pages/delete-account.js
import Layout from '../components/Layout';
import styles from '../styles/DeleteAccount.module.css';

export default function DeleteAccount() {
  return (
    <Layout title="Delete Your Account | AfroHub">
      <div className={styles.deleteContainer}>
        <div className={styles.warningSection} style={{ paddingTop: 64 }}>
          <div  width={40}
                                      height={40}>⚠️</div>
          <h1 className={styles.deleteTitle}>Delete Your AfroHub Account</h1>
          <p className={styles.deleteWarning}>
            Account deletion is permanent. All your content, data, and profile information will be permanently removed and cannot be recovered.
          </p>
        </div>

        <div className={styles.infoBox}>
          <h2>Before you delete your account:</h2>
          <ul className={styles.checkList}>
            <li>Understand that you'll lose access to all your connections and content</li>
            <li>Note that some information may remain in our backup systems for up to 30 days</li>
          </ul>
        </div>

        <div className={styles.deletionSteps}>
          <h2 className={styles.stepsSectionTitle}>How to Delete Your Account</h2>
          <p className={styles.stepsIntro}>
            Account deletion must be performed from within the AfroHub application. Please follow these steps:
          </p>

          <div className={styles.stepsContainer}>
            <div className={styles.stepCard}>
              <span className={styles.stepNumber}>1</span>
              <div className={styles.stepContent}>
                <h3>Open the AfroHub app</h3>
                <p>Launch the AfroHub application on your device and ensure you're signed in.</p>
                <div className={styles.stepImagePlaceholder}>
                  Step 1 Image
                </div>
              </div>
            </div>

            <div className={styles.stepCard}>
              <span className={styles.stepNumber}>2</span>
              <div className={styles.stepContent}>
                <h3>Navigate to Account Settings</h3>
                <p>Tap on your profile icon in the bottom navigation bar, then select "Settings" from the menu.</p>
                <div className={styles.stepImagePlaceholder}>
                  Step 2 Image
                </div>
              </div>
            </div>

            <div className={styles.stepCard}>
              <span className={styles.stepNumber}>3</span>
              <div className={styles.stepContent}>
                <h3>Select Account Management</h3>
                <p>Scroll down and tap on "Account Management" or "Account Options" (depending on your device).</p>
                <div className={styles.stepImagePlaceholder}>
                  Step 3 Image
                </div>
              </div>
            </div>

            <div className={styles.stepCard}>
              <span className={styles.stepNumber}>4</span>
              <div className={styles.stepContent}>
                <h3>Choose Delete Account</h3>
                <p>Tap on "Delete Account" at the bottom of the Account Management screen.</p>
                <div className={styles.stepImagePlaceholder}>
                  Step 4 Image
                </div>
              </div>
            </div>

            <div className={styles.stepCard}>
              <span className={styles.stepNumber}>5</span>
              <div className={styles.stepContent}>
                <h3>Confirm your decision</h3>
                <p>Review the information about what will be deleted. Enter your password when prompted and tap "Delete My Account" to confirm.</p>
                <div className={styles.stepImagePlaceholder}>
                  Step 5 Image
                </div>
              </div>
            </div>

            <div className={styles.stepCard}>
              <span className={styles.stepNumber}>6</span>
              <div className={styles.stepContent}>
                <h3>Complete verification</h3>
                <p>If you have two-factor authentication enabled, you'll need to enter the verification code sent to your device or email.</p>
                <div className={styles.stepImagePlaceholder}>
                  Step 6 Image
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.alternativeSection}>
          <h2>Alternative Deletion Methods</h2>

          <div className={styles.alternativeMethod}>
            <h3>Request Account Deletion via Email</h3>
            <p>
              If you're unable to access the app, you can request account deletion by sending an email from your registered email address to <a href="mailto:support@afrohub.co">support@afrohub.co</a> with the subject line "Account Deletion Request - [Your Username]".
            </p>
            <p>
              Please include the following information in your email:
            </p>
            <ul>
              <li>Your username</li>
              <li>The email address associated with your account</li>
              <li>Reason for account deletion (optional)</li>
            </ul>
            <p>
              Our support team will respond within 2 business days with further verification steps.
            </p>
          </div>

          <div className={styles.alternativeMethod}>
            <h3>Contact Customer Support</h3>
            <p>
              If you're experiencing technical difficulties with the deletion process, please contact our customer support team through the app's help center or via <a href="mailto:support@afrohub.co">support@afrohub.co</a>.
            </p>
          </div>
        </div>

        <div className={styles.faqSection}>
          <h2>Frequently Asked Questions About Account Deletion</h2>

          <div className={styles.faqItem}>
            <h3>What happens to my content when I delete my account?</h3>
            <p>
              All your personal content including posts, comments, and media uploads will be permanently deleted. Content you've shared in group conversations or collaborative projects may remain visible to other participants.
            </p>
          </div>

          <div className={styles.faqItem}>
            <h3>Can I recover my account after deletion?</h3>
            <p>
              No. Once your account is deleted, it cannot be recovered. All data associated with your account will be permanently removed from our systems.
            </p>
          </div>

          <div className={styles.faqItem}>
            <h3>How long does account deletion take?</h3>
            <p>
              While your account will be immediately inaccessible, it may take up to 30 days for all your information to be completely removed from our backup systems.
            </p>
          </div>

          <div className={styles.faqItem}>
            <h3>Will my subscription be automatically canceled?</h3>
            <p>
              Yes, any active subscriptions associated with your account will be canceled when your account is deleted. However, depending on your payment provider, you may need to cancel any recurring payments separately.
            </p>
          </div>
        </div>

        <div className={styles.supportMessage}>
          <h2>We're Sorry to See You Go</h2>
          <p>
            If there's anything we can do to improve your experience on AfroHub, please let us know by contacting <a href="mailto:support@afrohub.co">support@afrohub.co</a>.
          </p>
          <p>
            You can always create a new account in the future if you'd like to return to our community.
          </p>
        </div>
      </div>
    </Layout>
  );
}