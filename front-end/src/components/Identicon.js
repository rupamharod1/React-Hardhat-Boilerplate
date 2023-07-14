import { useEffect, useRef } from "react";
import Jazzicon from "@metamask/jazzicon";
import styled from "styled-components";

const StyledIdenticon = styled.div`
  height: 40px;
  width: 40px;
  border-radius: 1rem;
`;

export default function Identicon(props) {
  const ref = useRef();

  useEffect(() => {
    if (props.account && ref.current) {
      ref.current.innerHTML = "";
      ref.current.appendChild(
        Jazzicon(42, parseInt(props.account.slice(2, 10), 16))
      );
    }
  }, [props.account]);

  return <StyledIdenticon ref={ref} />;
}
