import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../contexts/AuthContext'
import { useCreateIdea } from '../../../hooks/useIdeas'
import { useTopics } from '../../../hooks/useTopics'
import Input, { Textarea } from '../../common/Input/Input'
import Button from '../../common/Button/Button'
import styles from './IdeaForm.module.css'

// Validation schema
const schema = yup.object().shape({
  topicId: yup.string().required('Please select a topic'),
  title: yup
    .string()
    .required('Title is required')
    .min(10, 'Title must be at least 10 characters')
    .max(100, 'Title must be less than 100 characters'),
  description: yup
    .string()
    .required('Description is required')
    .min(50, 'Description must be at least 50 characters')
    .max(1000, 'Description must be less than 1000 characters'),
  benefits: yup
    .string()
    .required('Benefits are required')
    .min(20, 'Benefits must be at least 20 characters')
    .max(500, 'Benefits must be less than 500 characters'),
  implementation: yup
    .string()
    .required('Implementation details are required')
    .min(20, 'Implementation details must be at least 20 characters')
    .max(500, 'Implementation details must be less than 500 characters'),
})

const IdeaForm = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const { data: topics, isLoading: topicsLoading } = useTopics()
  const createIdea = useCreateIdea()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data) => {
    try {
      await createIdea.mutateAsync({
        ...data,
        userId: user.id,
      })
      reset()
      navigate('/my-ideas')
    } catch (error) {
      console.error('Failed to submit idea:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.field}>
        <label htmlFor="topicId" className={styles.label}>
          Topic <span className={styles.required}>*</span>
        </label>
        <select
          id="topicId"
          {...register('topicId')}
          className={styles.select}
          disabled={topicsLoading}
        >
          <option value="">Select a topic</option>
          {topics?.map((topic) => (
            <option key={topic.id} value={topic.id}>
              {topic.title}
            </option>
          ))}
        </select>
        {errors.topicId && (
          <span className={styles.error}>{errors.topicId.message}</span>
        )}
      </div>

      <Input
        label="Title"
        placeholder="Enter a clear, concise title for your idea"
        {...register('title')}
        error={errors.title?.message}
        fullWidth
        required
      />

      <Textarea
        label="Description"
        placeholder="Describe your idea in detail. What problem does it solve? How would it work?"
        {...register('description')}
        error={errors.description?.message}
        fullWidth
        required
        rows={6}
      />

      <Textarea
        label="Benefits"
        placeholder="What are the benefits of implementing this idea? How will it improve the business, process, or product?"
        {...register('benefits')}
        error={errors.benefits?.message}
        fullWidth
        required
        rows={4}
      />

      <Textarea
        label="Implementation"
        placeholder="Provide details on how this could be implemented. What resources, tools, or steps would be needed?"
        {...register('implementation')}
        error={errors.implementation?.message}
        fullWidth
        required
        rows={4}
      />

      <div className={styles.actions}>
        <Button type="button" variant="ghost" onClick={() => navigate(-1)}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Idea'}
        </Button>
      </div>
    </form>
  )
}

export default IdeaForm
