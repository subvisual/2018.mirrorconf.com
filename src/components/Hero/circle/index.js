import React from 'react';

import './index.css';

export default props => (
  <svg
    viewBox="0 0 930 930"
    className="Circle"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <defs>
      <radialGradient
        cx="53.5508178%"
        cy="0%"
        fx="53.5508178%"
        fy="0%"
        r="88.2901116%"
        id="Circle-c"
      >
        <stop stopColor="#A5409E" stopOpacity=".6" offset="0%" />
        <stop
          stopColor="#190736"
          stopOpacity=".39756001"
          offset="98.5752348%"
        />
      </radialGradient>
      <path
        d="M736.5 1775.94999c-141.852497-.53826-265.710581-77.39543-332.6484-191.64565l37.384848-21.62996C500.762389 1664.02243 610.636784 1732.23414 736.5 1732.94965v43.00038zm4-.00496v-42.99531c125.690805-.7146 235.436562-68.74054 295.01865-169.85903l36.65539 21.16987c-66.77452 114.0058-190.221481 190.78954-331.67404 191.68437zm0-773.98428c141.255785.89359 264.55604 77.46509 331.39504 191.2088l-36.20029 20.94461C976.152967 1112.83067 866.314737 1044.67121 740.5 1043.95598v-41.99534zm-4-.0051v42.00026c-126.178423.71737-236.287841 69.26937-295.709827 171.0374l-36.9642-21.34822c66.93183-114.27436 190.803426-191.15108 332.674027-191.68941zm-334.652589 578.88698C369.492599 1524.28547 351 1458.77874 351 1388.95284c0-69.80779 18.483007-135.29865 50.822237-191.84578l36.971097 21.3522C410.282718 1268.61749 394 1326.63362 394 1388.45282c0 62.13463 16.44931 120.42729 45.230722 170.76075l-37.383311 21.62906zm672.056309-384.21397C1106.41255 1253.28469 1125 1318.9481 1125 1388.95284c0 69.80778-18.483 135.29863-50.82222 191.84575l-36.64854-21.16592C1066.45921 1509.20381 1083 1450.75998 1083 1388.45282c0-62.18315-16.47501-120.51832-45.29816-170.87864l36.20188-20.94552z"
        id="Circle-b"
      />
      <filter
        x="-16.8%"
        y="-14.2%"
        width="133.6%"
        height="133.6%"
        filterUnits="objectBoundingBox"
        id="Circle-a"
      >
        <feOffset dy="20" in="SourceAlpha" result="shadowOffsetOuter1" />
        <feGaussianBlur
          stdDeviation="40"
          in="shadowOffsetOuter1"
          result="shadowBlurOuter1"
        />
        <feColorMatrix
          values="0 0 0 0 0.108156798 0 0 0 0 0.0443846174 0 0 0 0 0.187872024 0 0 0 1 0"
          in="shadowBlurOuter1"
        />
      </filter>
    </defs>
    <g className="Circle-inner">
      <g transform="translate(-273 -944)" fill="none" fillRule="evenodd">
        <use fill="#000" filter="url(#Circle-a)" xlinkHref="#Circle-b" />
        <use fill="url(#Circle-c)" xlinkHref="#Circle-b" />
      </g>
    </g>
  </svg>
);
