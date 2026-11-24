import Icon from './Icon.jsx'

export default function Pagination({
  page,
  pageSize,
  total,
  onPageChange,
  onPageSizeChange,
  itemLabel = 'employees',
}) {
  const pages = Math.max(1, Math.ceil(total / pageSize))
  const first = Math.max(1, Math.min(page - 2, pages - 4))
  const visiblePages = Array.from(
    { length: Math.min(5, pages) },
    (_, index) => first + index,
  )
  return (
    <div className="directory-pagination tw:pagination:flex tw:pagination:justify-between tw:pagination:items-center
           tw:pagination:gap-[12px] tw:pagination:flex-wrap tw:pagination:min-h-[63px] tw:pagination:p-[15px_2px]
           tw:pagination:border-t tw:pagination:border-t-[var(--divider)] tw:pagination:text-[var(--text-muted)]
           tw:pagination:text-[10px]">
      <span role="status">
        Showing {total ? (page - 1) * pageSize + 1 : 0}–
        {Math.min(page * pageSize, total)} of {total} {itemLabel}
      </span>
      <div className="pagination-controls tw:flex tw:items-center tw:gap-[7px] tw:max-[380px]:flex-wrap">
        <label className="tw:flex tw:items-center tw:gap-[7px] tw:mr-[8px] tw:text-[10px]">
          Rows{' '}
          <select
            className="tw:p-[5px] tw:[border:1px_solid_var(--border)] tw:rounded-[5px] tw:bg-white tw:text-text-secondary tw:text-[10px]"
            aria-label="Rows per page"
            value={pageSize}
            onChange={(event) => onPageSizeChange(Number(event.target.value))}
          >
            {[5, 10, 20].map((size) => (
              <option key={size}>{size}</option>
            ))}
          </select>
        </label>
        <nav className="tw:flex tw:items-center tw:gap-[7px]" aria-label={`${itemLabel} table pages`}>
          <button
            className="page-button tw:inline-flex tw:items-center tw:justify-center tw:min-w-[27px] tw:h-[29px] tw:border-0
          tw:border-current tw:rounded-[6px] tw:bg-transparent tw:text-text-secondary tw:text-[10px]
          tw:[&.current]:bg-primary tw:[&.current]:text-white
          tw:[&:hover:not(:disabled):not(.current)]:bg-[#edf7f3] tw:disabled:cursor-default
          tw:disabled:opacity-[0.35]"
            aria-label="Previous page"
            disabled={page === 1}
            onClick={() => onPageChange(page - 1)}
          >
            <Icon name="arrow-left" size={15} />
          </button>
          {visiblePages.map((number) => (
            <button
              key={number}
              className={`page-button tw:inline-flex tw:items-center tw:justify-center tw:min-w-[27px] tw:h-[29px] tw:border-0
          tw:border-current tw:rounded-[6px] tw:bg-transparent tw:text-text-secondary tw:text-[10px]
          tw:[&.current]:bg-primary tw:[&.current]:text-white
          tw:[&:hover:not(:disabled):not(.current)]:bg-[#edf7f3] tw:disabled:cursor-default
          tw:disabled:opacity-[0.35] ${page === number ? "current" : ""}`}
              aria-label={`Page ${number}`}
              aria-current={page === number ? 'page' : undefined}
              onClick={() => onPageChange(number)}
            >
              {number}
            </button>
          ))}
          <button
            className="page-button tw:inline-flex tw:items-center tw:justify-center tw:min-w-[27px] tw:h-[29px] tw:border-0
          tw:border-current tw:rounded-[6px] tw:bg-transparent tw:text-text-secondary tw:text-[10px]
          tw:[&.current]:bg-primary tw:[&.current]:text-white
          tw:[&:hover:not(:disabled):not(.current)]:bg-[#edf7f3] tw:disabled:cursor-default
          tw:disabled:opacity-[0.35]"
            aria-label="Next page"
            disabled={page === pages}
            onClick={() => onPageChange(page + 1)}
          >
            <Icon name="chevron" size={15} />
          </button>
        </nav>
      </div>
    </div>
  )
}
