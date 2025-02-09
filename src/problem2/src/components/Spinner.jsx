const Spinner = ({ size = 24, color = 'currentColor' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{
        background: 'rgba(0, 0, 0, 0) none repeat scroll 0% 0%',
        display: 'block',
        shapeRendering: 'auto'
      }}
      viewBox="0 0 100 100"
      width={size}
      height={size}
      preserveAspectRatio="xMidYMid"
      className="ml-1"
    >
      <g transform="rotate(0 50 50)">
        <rect x="44" y="9" rx="6" ry="7.2" width="12" height="28" fill={color}>
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.875s"
            repeatCount="indefinite"
          ></animate>
        </rect>
      </g>
      <g transform="rotate(45 50 50)">
        <rect x="44" y="9" rx="6" ry="7.2" width="12" height="28" fill={color}>
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.75s"
            repeatCount="indefinite"
          ></animate>
        </rect>
      </g>
      <g transform="rotate(90 50 50)">
        <rect x="44" y="9" rx="6" ry="7.2" width="12" height="28" fill={color}>
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.625s"
            repeatCount="indefinite"
          ></animate>
        </rect>
      </g>
      <g transform="rotate(135 50 50)">
        <rect x="44" y="9" rx="6" ry="7.2" width="12" height="28" fill={color}>
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.5s"
            repeatCount="indefinite"
          ></animate>
        </rect>
      </g>
      <g transform="rotate(180 50 50)">
        <rect x="44" y="9" rx="6" ry="7.2" width="12" height="28" fill={color}>
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.375s"
            repeatCount="indefinite"
          ></animate>
        </rect>
      </g>
      <g transform="rotate(225 50 50)">
        <rect x="44" y="9" rx="6" ry="7.2" width="12" height="28" fill={color}>
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.25s"
            repeatCount="indefinite"
          ></animate>
        </rect>
      </g>
      <g transform="rotate(270 50 50)">
        <rect x="44" y="9" rx="6" ry="7.2" width="12" height="28" fill={color}>
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.125s"
            repeatCount="indefinite"
          ></animate>
        </rect>
      </g>
      <g transform="rotate(315 50 50)">
        <rect x="44" y="9" rx="6" ry="7.2" width="12" height="28" fill={color}>
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="0s"
            repeatCount="indefinite"
          ></animate>
        </rect>
      </g>
    </svg>
  )
}

export default Spinner
