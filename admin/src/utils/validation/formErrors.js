// Adapt the existing service validators to React Hook Form's field errors.
export function showFormErrors(messages, setError, focusField) {
  const fields = Object.keys(messages)
  for (const name of fields) {
    setError(name, { type: 'business', message: messages[name] })
  }
  if (fields.length) focusField(fields[0])
  return fields.length > 0
}
