import React from 'react';

import './index.css';

export default () => (
  <svg
    className="Timemachinelight"
    viewBox="0 0 789 885"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient
        x1="100%"
        y1="50%"
        x2="51.0217215%"
        y2="88.9803361%"
        id="a"
      >
        <stop stopColor="#FFB0E1" stopOpacity="0" offset="0%" />
        <stop stopColor="#FFF79C" stopOpacity=".498613" offset="100%" />
      </linearGradient>
      <linearGradient
        x1="100%"
        y1="46.7733521%"
        x2="51.5857325%"
        y2="88.5314567%"
        id="b"
      >
        <stop stopColor="#FFF" stopOpacity="0" offset="0%" />
        <stop stopColor="#FFF580" stopOpacity=".498613" offset="100%" />
      </linearGradient>
      <radialGradient
        cy="81.0085863%"
        fx="50%"
        fy="81.0085863%"
        r="197.364548%"
        gradientTransform="matrix(0 -.3377 1 0 -.310086 .9789395)"
        id="c"
      >
        <stop stopColor="#BF30FF" offset="0%" />
        <stop stopColor="#FFAE71" stopOpacity=".6" offset="100%" />
      </radialGradient>
      <filter
        x="-101.4%"
        y="-34.2%"
        width="302.7%"
        height="168.5%"
        filterUnits="objectBoundingBox"
        id="d"
      >
        <feGaussianBlur stdDeviation="50" in="SourceGraphic" />
      </filter>
    </defs>
    <g fill="none" fillRule="evenodd">
      <path
        fill="url(#a)"
        opacity=".60000002"
        d="M73 63.9528395l42 24.2529828-1 223.4940347-42 24.252983-42-24.252983 1-223.4940347z"
        transform="translate(323 81)"
      />
      <path
        fill="url(#b)"
        opacity=".60000002"
        d="M72 86.2408911V335.95284l-42-24.288052 1-225.4238969z"
        transform="translate(323 81)"
      />
      <path
        fill="url(#c)"
        opacity=".4"
        filter="url(#d)"
        d="M148 .75v395.5L74 439 0 396.25V.75z"
        transform="translate(323 81)"
      />
    </g>
  </svg>
);
