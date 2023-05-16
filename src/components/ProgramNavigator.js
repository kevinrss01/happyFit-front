import { useCallback } from "react";

const getWeekString = (index, creationDate) => {
  const start = formatJSONDate(creationDate);
  const finish = getFinishBasedOnCreationDate(creationDate);
  return `Semaine ${index} du ${start} au ${finish}`;
};

const getFinishBasedOnCreationDate = (creationDate) => {
  const finishDate = new Date(creationDate);
  finishDate.setDate(finishDate.getDate() + 7);
  const finishJSON = finishDate.toJSON().substring(0, 10);
  return formatJSONDate(finishJSON);
};

const formatJSONDate = (json) => json.split("-").reverse().join("/");

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
          {/* Semaine {index} du {creationDate.replaceAll(/-/g, "/")} */}
          {getWeekString(index, creationDate)}
        </span>
        <i
          className={`${faIconBase}right`}
          onClick={validateCallback(index < limit, goForward)}
        ></i>
      </div>
    </div>
  );
}
