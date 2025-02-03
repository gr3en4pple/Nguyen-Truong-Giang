import React, { useEffect, useMemo, useRef, useState } from 'react'
import { sleep } from '@/utils'
import { CURRENCY } from '../config'
import toast from 'react-hot-toast'

const initAmountState = {
  [CURRENCY.IN]: '',
  [CURRENCY.OUT]: ''
}
const useSwap = ({ tokenRate, currency }) => {
  const [isLoading, setLoading] = useState(false)

  const [amount, setAmount] = useState(initAmountState)

  const inputRef = useRef(null)
  const amountInValueRef = useRef('')
  amountInValueRef.current = amount[CURRENCY.IN]
  const onChangeAmount = ({ value, type = CURRENCY.IN }) => {
    setAmount((prev) => ({ ...prev, [type]: value }))
    if (inputRef.current === CURRENCY.IN) {
      setAmount((prev) => ({
        ...prev,
        [CURRENCY.OUT]: !value ? '' : value * tokenRate
      }))
    }

    if (inputRef.current === CURRENCY.OUT) {
      setAmount((prev) => ({
        ...prev,
        [CURRENCY.IN]: !value ? '' : value / tokenRate
      }))
    }
  }

  const onFocus = ({ type = CURRENCY.IN }) => (inputRef.current = type)

  useEffect(() => {
    setAmount((prev) => ({
      ...prev,
      [CURRENCY.OUT]: amountInValueRef.current * tokenRate
    }))
  }, [tokenRate])

  const amountInError = useMemo(() => {
    let errMsg = ''
    if (+amount[CURRENCY.IN] > 100e6) {
      errMsg = 'too big amount'
    }

    return errMsg
  }, [amount])

  const swapToken = async () => {
    setLoading(true)
    try {
      await toast.promise(
        async () => {
          try {
            await sleep(1000)
            setAmount(initAmountState)
          } catch (error) {}
        },
        {
          loading: 'Transactioning...',
          success: `Successfully swapped ${amount[CURRENCY.IN]} ${
            currency.in?.currency
          } for ${amount[CURRENCY.OUT]} ${currency.out?.currency}`,
          error: 'Error happened'
        },
        {
          position: 'bottom-right'
        }
      )
    } catch (error) {
      throw new Error(error)
    }
    setLoading(false)
  }

  return {
    isLoading,
    swapToken,
    amountInError,
    onFocus,
    onChangeAmount,
    amount
  }
}

export default useSwap
