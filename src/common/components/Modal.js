
/* tslint:disable */
import styled from "styled-components";
import device from "@utils/devices";

const ModalContainer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  z-index: ${(props) => (props.on === "on" ? 9999 : -1)};
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: ${(props) =>
    props.on === "on" ? "rgba(0, 0, 0, 0.45)" : "rgba(0, 0, 0, 0)"};
  transition: background-color 0.5s ease-out;
`;
const ModalBox = styled.div`
  display: "flex";
  opacity: 1;
  justify-content: center;
  background-color: white;
  align-items: center;
  padding: 15px;
  box-shadow: 0px 6px 13px -5px rgba(133, 133, 133, 1);
  min-width: 480px;
  height: 400px;
  border-radius: 10px;
  @media ${device.mobileL} {
    min-width: 100%;
  }
`;
const ExitWrap = styled.div`
  display: flex;
  align-self: flex-start;
  justify-content: flex-end;
  margin-left: calc(100% - 1.5rem);
  font-size: 1.5rem;
  color: rgb(134, 142, 150);
  margin-bottom: 2.25rem;
  transition: all ease 0.25s;
  &:hover {
    cursor: pointer;
    transform: rotate(90deg);
  }
`;

export default function Modal(props) {
  const { on, onClickClose, children } = props;

  return (
    <ModalContainer on={on ? "on" : "off"}>
      <ModalBox on={on ? "on" : "off"}>
        <ExitWrap onClick={onClickClose}>
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 24 24"
            tabIndex="1"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
          </svg>
        </ExitWrap>
        {children}
      </ModalBox>
    </ModalContainer>
  );
}
