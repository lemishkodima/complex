import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import clsx from "clsx";
const RoundedBtn = ({
  onCLick,
  revert = false,
}: {
  revert?: boolean;
  onCLick?: () => any;
}) => {
  return (
    <button
      className="w-[50px] h-[50px] flex-center border border-platinum-10 rounded-full"
      onClick={onCLick}
      type="button"
    >
      <ArrowForwardIcon
        className={clsx("w-5 h-5", {
          "rotate-180": revert,
        })}
      />
    </button>
  );
};

export default RoundedBtn;
