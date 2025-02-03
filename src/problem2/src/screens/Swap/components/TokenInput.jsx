import React from 'react'
import Input from '@/components/Input'
import TokenImage from '@/components/TokenImage'
import classNames from 'classnames'

const TokenInput = ({
  currency,
  amount,
  placeholder = '',
  onChange,
  onFocus,
  openListToken,
  errorMsg
}) => {
  return (
    <div>
      <div className="flex items-center justify-between px-4 py-3 space-x-3 border rounded-xl border-slate-300">
        <div>
          <Input
            className="h-12 text-lg"
            placeholder={placeholder}
            value={amount}
            onChange={onChange}
            onFocus={onFocus}
          />
          <p className="text-xs text-slate-500">~${currency?.price}</p>
        </div>
        <div
          onClick={openListToken}
          className="flex items-center px-3 py-3 space-x-2 transition rounded-lg cursor-pointer hover:bg-slate-100"
        >
          <TokenImage
            className="flex-shrink-0"
            currency={currency?.currency}
            size={32}
          />
          <span className="text-sm font-semibold">{currency?.currency}</span>
        </div>
      </div>

      <div
        className={classNames(
          `text-xs text-red-500 transition-all duration-200 max-h-[0px] overflow-hidden`,
          {
            'max-h-[35px] mt-1': errorMsg
          }
        )}
      >
        <div className="flex items-center space-x-1 ">
          <div dangerouslySetInnerHTML={{ __html: errorMsg }} />
        </div>
      </div>
    </div>
  )
}

export default TokenInput
