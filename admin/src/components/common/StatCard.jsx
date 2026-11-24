import Icon from './Icon.jsx'
import Card from './Card.jsx'

export default function StatCard({
  label,
  value,
  icon,
  tone = 'green',
  detail,
}) {
  return (
    <Card
      as="article"
      background="white"
      className={`stat-card tw:flex tw:items-start tw:gap-[15px] tw:p-[23px_18px_20px] tw:min-h-[138px]
        tw:min-[1280px]:max-[1440px]:gap-[11px] tw:min-[1280px]:max-[1440px]:px-[14px]
        tw:min-[1024px]:max-[1280px]:min-h-[125px] tw:max-[768px]:p-[17px_15px] tw:max-[768px]:min-h-[127px]
        tw:max-[768px]:gap-[12px] tw:max-[480px]:min-h-[110px] tw:max-[480px]:p-[18px_20px]
        tw:max-[480px]:gap-[17px] `}
    >
      <div className={`icon-circle tone-${tone} tw:mt-[1px] tw:min-[1280px]:max-[1440px]:w-[38px] tw:min-[1280px]:max-[1440px]:h-[38px] tw:max-[768px]:w-[40px]
          tw:max-[768px]:h-[40px] tw:max-[480px]:w-[46px] tw:max-[480px]:h-[46px] tw:shared-base:w-[46px]
          tw:shared-base:h-[46px] tw:shared-base:shrink-0 tw:shared-base:rounded-[50%] tw:shared-base:inline-flex
          tw:shared-base:items-center tw:shared-base:justify-center tw:[:where(&.tone-green)]:[color:#0b8972]
          tw:[:where(&.tone-green)]:[background:#e3f5f0] tw:[:where(&.tone-amber)]:[color:#a36b0d]
          tw:[:where(&.tone-amber)]:[background:#fff5dd] tw:[:where(&.tone-blue)]:[color:#4b8397]
          tw:[:where(&.tone-blue)]:[background:#eaf2f7] tw:[:where(&.tone-lavender)]:[color:#7566ba]
          tw:[:where(&.tone-lavender)]:[background:#f0edfb] `}>
        <Icon className="tw:min-[1280px]:max-[1440px]:w-[22px]" name={icon} size={25} />
      </div>
      <div className="stat-content tw:min-w-0">
        <h2 className={`tw:text-[11px] tw:font-normal tw:text-[var(--text-secondary)] tw:m-[3px_0_9px] tw:tracking-[0] tw:leading-[1.4]
          tw:min-[1280px]:max-[1440px]:text-[10px] tw:max-[768px]:text-[10px] tw:max-[480px]:text-[11px]
          tw:max-[480px]:mt-[0] tw:max-[480px]:mb-[5px] `}>{label}</h2>
        <p className={`stat-value tw:text-[clamp(22px,_1.9vw,_31px)] tw:font-[650] tw:leading-[1.15] tw:tracking-[-0.7px]
          tw:whitespace-nowrap tw:[.stat-card:last-child_&]:text-[clamp(20px,_1.68vw,_28px)]
          tw:min-[1280px]:max-[1440px]:[.stat-card:last-child_&]:text-[21px]
          tw:min-[1024px]:max-[1280px]:text-[29px]
          tw:min-[1024px]:max-[1280px]:[.stat-card:last-child_&]:text-[29px] tw:max-[1024px]:text-[30px]
          tw:max-[1024px]:[.stat-card:last-child_&]:text-[30px] tw:max-[768px]:text-[27px]
          tw:max-[768px]:[.stat-card:last-child_&]:text-[23px] tw:max-[480px]:text-[29px]
          tw:max-[480px]:[.stat-card:last-child_&]:text-[29px] `}>{value}</p>
        <p className={`stat-detail tw:flex tw:items-center tw:gap-[6px] tw:mt-[13px] tw:text-[10px] tw:text-[var(--text-muted)]
          tw:leading-[1.4] tw:max-[768px]:text-[9px] tw:max-[480px]:mt-[8px] tw:max-[480px]:text-[10px] `}>
          <span className={`status-dot tone-${tone} tw:[:where(&.tone-green)]:[color:#0b8972] tw:[:where(&.tone-green)]:[background:#e3f5f0]
          tw:[:where(&.tone-amber)]:[color:#a36b0d] tw:[:where(&.tone-amber)]:[background:#fff5dd]
          tw:[:where(&.tone-blue)]:[color:#4b8397] tw:[:where(&.tone-blue)]:[background:#eaf2f7]
          tw:[:where(&.tone-lavender)]:[color:#7566ba] tw:[:where(&.tone-lavender)]:[background:#f0edfb]
          tw:[:where(&.status-dot)]:inline-block tw:[:where(&.status-dot)]:h-[6px]
          tw:[:where(&.status-dot)]:w-[6px] tw:[:where(&.status-dot)]:shrink-0
          tw:[:where(&.status-dot)]:rounded-[50%] tw:[:where(&.status-dot)]:[background:currentColor] `} />
          {detail}
        </p>
      </div>
    </Card>
  )
}
