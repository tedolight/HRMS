// Keep each card's native tag and page-specific layout classes.
export default function Card({ as: Tag = 'section', background = 'surface', className = '', ...props }) {
  return <Tag {...props} className={`card tw:card-surface:min-w-0 tw:card-surface:border tw:card-surface:border-solid tw:card-surface:border-border
          tw:card-surface:rounded-[var(--card-radius)] tw:card-surface:[box-shadow:var(--card-shadow)] ${background === "white" ? "tw:card-surface:bg-white" : "tw:card-surface:bg-surface"}  ${className}`} />
}
