import classNames from 'classnames'

const Input = ({
  className = '',
  inputClassName = '',
  renderTail,
  onChange = () => {},
  value,
  label,
  ...props
}) => {
  const onChangeValue = (e) => {
    const val = e.target.value
    const regex = new RegExp(/^-?\d*\.?\d*$/)
    if (regex.test(val)) {
      onChange(val)
    }
  }

  return (
    <div>
      {label}

      <div
        className={classNames(
          'flex items-center space-x-3',
          className
        )}
      >
        <input
          className={classNames(
            'flex-grow truncate outline-none ',
            inputClassName
          )}
          onChange={onChangeValue}
          value={value}
          {...props}
        />

        {renderTail}
      </div>
    </div>
  )
}

export default Input
