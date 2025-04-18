// components/LoadingSpinner.js
const LoadingSpinner = ({ size = 48, color = "#FF3D00" }) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
        className="spinner"
      >
        <circle
          cx="50"
          cy="50"
          r="40"
          stroke={color}
          strokeWidth="6"
          fill="none"
          strokeDasharray="188.4"
          strokeDashoffset="94.2"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="94.2"
            to="-188.4"
            dur="1s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    );
  };
  
  export default LoadingSpinner;
  