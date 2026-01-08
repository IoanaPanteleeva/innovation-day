import Badge from '../../common/Badge/Badge'

const STATUS_CONFIG = {
  pending: {
    label: 'Pending',
    variant: 'warning',
  },
  under_review: {
    label: 'Under Review',
    variant: 'info',
  },
  approved: {
    label: 'Approved',
    variant: 'success',
  },
  declined: {
    label: 'Declined',
    variant: 'danger',
  },
  needs_info: {
    label: 'Needs Info',
    variant: 'warning',
  },
}

const IdeaStatusBadge = ({ status, size = 'md' }) => {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.pending

  return (
    <Badge variant={config.variant} size={size}>
      {config.label}
    </Badge>
  )
}

export default IdeaStatusBadge
