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
    <div className="top-bar-navigation-container">
      <div className="top-bar-navigation">
        <i
          className={`${faIconBase}left`}
          onClick={validateCallback(index > 1, goBackward)}
        ></i>
        <span>
          Semaine {index} du {creationDate.replaceAll(/-/g, "/")}
        </span>
        <i
          className={`${faIconBase}right`}
          onClick={validateCallback(index < limit, goForward)}
        ></i>
      </div>
    </div>
  );
}
