import "@styles/check.css";

function SuccessChecked() {
  return (
    <svg
      width="100"
      height="100"
      className="checkmark"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 52 52"
    >
      <g stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10">
        <circle
          className="checkmark__circle"
          cx="26"
          cy="26"
          r="26"
          fill="none"
        />
        <path
          className="checkmark__check"
          fill="none"
          d="M14.1 27.2l7.1 7.2 16.7-16.8"
        />
      </g>
    </svg>
  );
}

export default SuccessChecked;
