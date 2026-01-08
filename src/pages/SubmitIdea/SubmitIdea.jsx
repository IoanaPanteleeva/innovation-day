import Card from '../../components/common/Card/Card'
import IdeaForm from '../../components/ideas/IdeaForm/IdeaForm'
import styles from './SubmitIdea.module.css'

const SubmitIdea = () => {
  return (
    <div className={styles.page}>
      <h1>Submit New Idea</h1>
      <p className={styles.subtitle}>
        Share your innovative ideas to help improve our products, processes, or workplace
      </p>

      <Card padding="lg" className={styles.card}>
        <IdeaForm />
      </Card>
    </div>
  )
}

export default SubmitIdea
