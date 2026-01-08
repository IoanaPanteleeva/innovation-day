import Card from '../../components/common/Card/Card'
import InvitationForm from '../../components/invitations/InvitationForm/InvitationForm'
import styles from './InviteEmployees.module.css'

const InviteEmployees = () => {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>Invite Employees</h1>
        <p className={styles.subtitle}>
          Invite employees to submit ideas for specific topics. Selected employees will be notified to contribute their ideas.
        </p>
      </div>

      <Card padding="lg" className={styles.card}>
        <div className={styles.info}>
          <h3 className={styles.infoTitle}>How Invitations Work</h3>
          <ul className={styles.infoList}>
            <li>Select a topic you want employees to contribute ideas to</li>
            <li>Choose which employees should receive the invitation</li>
            <li>Invited employees will be notified (in-app and via email)</li>
            <li>They can then submit their ideas for the selected topic</li>
          </ul>
        </div>
      </Card>

      <Card padding="lg" className={styles.card}>
        <h2 className={styles.formTitle}>Create Invitation</h2>
        <InvitationForm />
      </Card>
    </div>
  )
}

export default InviteEmployees
