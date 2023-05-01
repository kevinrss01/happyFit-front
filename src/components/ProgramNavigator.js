import { useCallback } from "react";

const faIconBase = "pointer fa fa-arrow-circle-";
export default function ProgramNavigator({
  index,
  limit,
  creationDate,
  goForward,
  goBackward,
}) {
  const validateCallback = useCallback(
    (condition, callback) => (condition ? callback : () => {}),
    []
  );

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        color: "white",
        marginBottom: 20,
      }}
    >
      <i
        style={{ color: "white" }}
        className={`${faIconBase}left`}
        onClick={validateCallback(index > 1, goBackward)}
      ></i>
      <span>
        Semaine {index} du {creationDate.replaceAll(/-/g, "/")}
      </span>
      <i
        style={{ color: "white" }}
        className={`${faIconBase}right`}
        onClick={validateCallback(index < limit, goForward)}
      ></i>
    </div>
  );
}
