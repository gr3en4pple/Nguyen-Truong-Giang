import { useEffect, useMemo, useRef, useState } from 'react'
import TokenList from '@/components/TokenList'
import usePrices from '@/hooks/usePrices'
import Spinner from '@/components/Spinner'
import SwitchIcon from '@/components/Icons/SwitchIcon'
import TokenInput from './components/TokenInput'
import { CURRENCY } from './config'
import useSwap from './hooks/useSwap'
import classNames from 'classnames'
const Swap = () => {
  const { data, loading: loadingTokenPrices } = usePrices()

  const [showListToken, setShowListToken] = useState(false)
  const [currency, setCurrency] = useState({
    in: null,
    out: null
  })

  const tokenRate = useMemo(() => {
    const currencyInRateInUsd = currency.in?.price
    const currencyOutRateoutUsd = currency.out?.price

    return currencyInRateInUsd / currencyOutRateoutUsd
  }, [currency])

  const {
    amount,
    onChangeAmount,
    onFocus,
    isLoading,
    swapToken,
    amountInError
  } = useSwap({
    tokenRate,
    currency
  })

  const openListRef = useRef(null)

  const tokenPriceList = useMemo(() => {
    if (data && Array.isArray(data)) {
      // filter duplicate currency
      return data.filter((token, index, originData) => {
        const foundedIndex = originData.findIndex(
          (originElement) => originElement.currency === token.currency
        )

        return foundedIndex === index && Boolean(token?.price)
      })
    }
    return []
  }, [data])

  useEffect(() => {
    if (tokenPriceList.length) {
      const usdCurrency = tokenPriceList.find(
        (token) => token.currency === 'USD'
      )

      const btcCurrency = tokenPriceList.find((token) =>
        token.currency.includes('BTC')
      )

      setCurrency({
        in: btcCurrency,
        out: usdCurrency
      })
    }
  }, [tokenPriceList])

  const onSwitchCurrency = () => {
    setCurrency((prev) => ({ in: prev.out, out: prev.in }))
  }

  const isDisable = !amount[CURRENCY.IN] || !amount[CURRENCY.OUT]

  return (
    <div className="flex items-center justify-center w-full min-h-screen">
      {showListToken && (
        <TokenList
          isVisible={showListToken}
          onClose={() => setShowListToken(false)}
          tokens={tokenPriceList}
          currency={
            currency[openListRef.current === CURRENCY.IN ? 'in' : 'out']
          }
          onSelect={(_currency) =>
            setCurrency((prev) => ({
              ...prev,
              [openListRef.current === CURRENCY.IN ? 'in' : 'out']: _currency
            }))
          }
        />
      )}

      <form
        className="flex flex-col items-center justify-center w-full h-full max-w-[396px]"
        onSubmit={(e) => e.preventDefault()}
      >
        <section className="w-full p-6 mt-10 space-y-6 border border-gray-300 max-w-[500px] rounded-xl">
          <h1 className="text-4xl font-semibold">Swap</h1>
          <div>
            <TokenInput
              currency={currency.in}
              onChange={(value) => onChangeAmount({ value, type: CURRENCY.IN })}
              amount={amount[CURRENCY.IN]}
              onFocus={() => onFocus({ type: CURRENCY.IN })}
              openListToken={() => {
                setShowListToken((prev) => !prev)
                openListRef.current = CURRENCY.IN
              }}
              placeholder="Amount in"
              errorMsg={amountInError}
            />
          </div>
          {/* </div> */}
          <div className="flex justify-center  relative !mt-0">
            <button
              onClick={onSwitchCurrency}
              className="flex hover:rotate-180  duration-300 transition-all absolute -top-[10px] border-slate-300 !outline-none items-center justify-center p-2 rounded-full"
            >
              <SwitchIcon size={24} />
            </button>
          </div>

          <TokenInput
            currency={currency.out}
            onChange={(value) => onChangeAmount({ value, type: CURRENCY.OUT })}
            amount={amount[CURRENCY.OUT]}
            onFocus={() => onFocus({ type: CURRENCY.OUT })}
            openListToken={() => {
              setShowListToken((prev) => !prev)
              openListRef.current = CURRENCY.OUT
            }}
            placeholder="Amount out"
          />

          <button
            disabled={isDisable}
            onClick={swapToken}
            className={classNames(
              '!outline-none   transition-all flex overflow-hidden space-x-1 group justify-center items-center !mt-10 w-full  bg-blue-500 disabled:hover:scale-1 disabled:bg-slate-200 text-white font-semibold ',
              {
                'border-0': isDisable,
                'hover:scale-[1.02]': !isDisable
              }
            )}
          >
            {!isLoading ? (
              <>
                <span
                  className={classNames('transition-all delay-75 ', {
                    'group-hover:translate-y-[-30px] group-hover:opacity-0 group-hover:absolute':
                      !isDisable
                  })}
                >
                  Confirm
                </span>
                <span
                  className={classNames(
                    'absolute transition-all duration-300 delay-75 opacity-0 translate-y-[40px]',
                    {
                      'group-hover:static group-hover:opacity-100 group-hover:translate-y-0':
                        !isDisable
                    }
                  )}
                >
                  Swap {currency.in?.currency} for {currency.out?.currency}
                </span>
              </>
            ) : (
              <Spinner />
            )}
          </button>
        </section>
      </form>
    </div>
  )
}

export default Swap
