import type { SVGProps } from "react";

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      width="1em"
      height="1em"
      {...props}
    >
      <path
        fill="currentColor"
        d="M128 24a104 104 0 0 0-13.11 207.07a104.09 104.09 0 0 0 101.4-60.39a103.58 103.58 0 0 0-88.1-145.4a104.48 104.48 0 0 0 .21-1.28A104.11 104.11 0 0 0 128 24Zm-8 40h16v168H120Z"
      />
    </svg>
  );
}
