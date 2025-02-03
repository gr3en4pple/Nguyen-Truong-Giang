import React, { useMemo, useRef, useState } from 'react'
import useClickOutside from '@/hooks/useClickOutside'
import CloseIcon from '@/components/Icons/CloseIcon'
import TokenImage from '@/components/TokenImage'
import Input from '@/components/Input'

import classNames from 'classnames'

const TokenList = ({
  tokens,
  onSelect,
  currency,
  isVisible = false,
  onClose = () => {}
}) => {
  const [search, setSearch] = useState('')

  const ref = useRef(null)
  useClickOutside(ref, () => {
    if (isVisible) {
      onClose?.()
    }
  })

  const searchTokens = useMemo(() => {
    return !tokens?.length
      ? []
      : tokens.filter((token) =>
          token?.currency?.toLowerCase().includes(search?.toLowerCase())
        )
  }, [tokens, search])

  return !isVisible ? null : (
    <div className="fixed  z-50 inset-0 bg-[rgba(0,0,0,0.8)]">
      <div
        ref={ref}
        className="absolute flex flex-col h-full overflow-hidden -translate-x-1/2 -translate-y-1/2 bg-white w-[450px] left-1/2 top-1/2 max-h-[90vh] rounded-3xl"
      >
        <div className="sticky top-0 flex items-center justify-between px-4 py-6 bg-white border-gray-300 ">
          <div className="text-2xl font-semibold">Token List</div>
          <button
            onClick={onClose}
            className="flex items-center justify-center w-6 h-6 p-4 bg-white border border-gray-300 rounded-full "
          >
            <CloseIcon size={24} className="flex-shrink-0" />
          </button>
        </div>
        <div className="mx-3 mb-4 border border-gray-300 rounded-xl">
          <div className="flex items-center justify-between px-3">
            <input
              className="flex w-full h-12 outline-none "
              placeholder="Search currency"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <div className="cursor-pointer" onClick={() => setSearch('')}>
                <CloseIcon size={16} />
              </div>
            )}
          </div>
        </div>

        <div className="h-full overflow-y-auto divide-y divide-gray-300">
          {searchTokens.map((token) => {
            const isSelected = currency?.currency === token.currency
            return (
              <div
                onClick={() => {
                  onSelect?.(token)
                  onClose?.()
                }}
                key={token.currency}
                className={classNames(
                  'flex items-center w-full px-4 py-3 space-x-3 cursor-pointer hover:bg-slate-100',
                  {
                    'bg-slate-100 cursor-default': isSelected
                  }
                )}
              >
                <TokenImage
                  className="flex-shrink-0"
                  currency={token.currency}
                  size={32}
                />

                <span className="font-semibold">{token.currency}</span>
                <div className="!ml-auto text-sm">
                  ≈ {token.price.toFixed(2)}{' '}
                  <span className="text-xs">USD</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default TokenList
