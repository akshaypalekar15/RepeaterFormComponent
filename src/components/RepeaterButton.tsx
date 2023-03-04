interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  btnText: string;
}

const RepeaterButton = ({ className, type, onClick, btnText }: ButtonProps) => (
  <button className={className} type={type} onClick={onClick}>
    {btnText}
  </button>
);

export default RepeaterButton;
