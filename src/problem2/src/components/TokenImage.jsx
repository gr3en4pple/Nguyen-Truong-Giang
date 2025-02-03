import { IMAGE_URL } from '@/utils'
import classNames from 'classnames'
import { useEffect, useState } from 'react'

const TokenImage = ({ currency, className = '', size = 32 }) => {
  const [triedTime, setTriedTime] = useState(0)

  useEffect(() => setTriedTime(0), [currency])
  return (
    <img
      className={classNames('rounded-full', className)}
      src={`${IMAGE_URL}/${currency}.svg`}
      width={size}
      height={size}
      onError={(e) => {
        setTriedTime((prev) => prev + 1)
        if (triedTime === 0) {
          e.target.src = `${IMAGE_URL}/${currency.replace('ST', '')}.svg`
        } else if (triedTime > 0) {
          e.target.src = `/question.png`
        }
      }}
    />
  )
}

export default TokenImage
