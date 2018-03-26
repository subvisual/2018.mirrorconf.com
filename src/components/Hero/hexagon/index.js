import React from 'react';

import './index.css';

export default () => (
  <svg
    className="Hexagons"
    viewBox="0 0 789 883"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <radialGradient
        id="Hexagons-gradient"
        cx="9.228%"
        cy=".984%"
        fx="9.228%"
        fy=".984%"
        r="152.89%"
        gradientTransform="matrix(.93024 .2489 -.36694 .63099 .01 -.02)"
      >
        <stop stopColor="#FF77F5" stopOpacity="0" offset="0%" />
        <stop stopColor="#F9A9BC" stopOpacity=".5" offset="100%" />
      </radialGradient>
    </defs>
    <g fill="none" fillRule="evenodd">
      <g className="Hexagons-hexagon1">
        <path
          opacity=".2"
          fill="url(#Hexagons-gradient)"
          transform="matrix(1 0 0 -1 0 885.906)"
          d="M272 400.903l-.603 86.351L.54 643.953l-.539-401z"
        />
      </g>

      <g className="Hexagons-hexagon2">
        <path
          opacity=".6"
          fill="url(#Hexagons-gradient)"
          transform="scale(1 -1) rotate(-60 -109.784 .5)"
          d="M404.638 176.433l-.603 86.35-270.858 156.7-.539-401z"
        />
      </g>

      <g className="Hexagons-hexagon3">
        <path
          fill="url(#Hexagons-gradient)"
          transform="rotate(120 517.927 219.482)"
          d="M653.635 177.56l.003 85.893-271.46 157.03-.54-401z"
        />
      </g>

      <g className="Hexagons-hexagon4">
        <path
          opacity=".6"
          fill="url(#Hexagons-gradient)"
          transform="rotate(180 653 441.953)"
          d="M789 399.903v86.16l-271.461 156.89-.539-401z"
        />
      </g>

      <g className="Hexagons-hexagon5">
        <path
          opacity=".2"
          fill="url(#Hexagons-gradient)"
          transform="scale(-1 1) rotate(-60 -.866 1575.914)"
          d="M661.635 623.56l.003 85.893-271.46 157.03-.54-401z"
        />
      </g>
    </g>
  </svg>
);
