const fieldBase = 'tw:block tw:w-full tw:min-w-0 tw:px-3 tw:py-[11px] tw:border tw:border-solid tw:bg-white tw:text-text-primary tw:font-normal'
const fieldVariants = {
  form: `${fieldBase} tw:mt-[9px] tw:border-[#d6e4e8] tw:rounded-md tw:text-[13px] tw:max-[480px]:text-[16px] tw:placeholder:text-[#879eab]`,
  employee: `${fieldBase} tw:h-[45px] tw:mt-2 tw:border-[#dbe7e4] tw:rounded-[7px] tw:text-[12px]`,
  'employee-file': 'tw:placeholder:text-[#92a49f] tw:aria-invalid:border-[#d87589] tw:aria-invalid:bg-[#fffafb]',
  'leave-note': 'tw:w-full tw:px-3 tw:py-[10px] tw:border tw:border-solid tw:border-[#d6e4e8] tw:rounded-[7px] tw:bg-white tw:text-text-primary tw:text-[13px] tw:max-[768px]:text-[16px]',
}
const employeeInputStates = 'tw:max-[560px]:text-[16px] tw:aria-invalid:border-[#d87589] tw:aria-invalid:bg-[#fffafb]'

// React 19 passes ref as a prop, so RHF's register ref reaches the native field.
// Keep input types, events, disabled state, and file/checkbox values untouched.
export function FormInput({ variant = 'form', className = '', ...props }) {
  const states = variant === 'employee' ? `${employeeInputStates} tw:placeholder:text-[#92a49f]` : ''
  return <input {...props} className={`${fieldVariants[variant]}  ${states}  ${className}`} />
}

export function FormSelect({ variant = 'form', className = '', ...props }) {
  const states = variant === 'employee' ? employeeInputStates : ''
  return <select {...props} className={`${fieldVariants[variant]}  ${states}  ${className}`} />
}

export function FormTextarea({ variant = 'form', className = '', ...props }) {
  const sizing = variant === 'form' ? 'tw:resize-y tw:min-h-[130px]'
    : variant === 'leave-note' ? 'tw:resize-y tw:min-h-[85px]' : ''
  return <textarea {...props} className={`${fieldVariants[variant]}  ${sizing}  ${className}`} />
}
