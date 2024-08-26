import { DateRange, Range, RangeKeyDict } from "react-date-range";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

interface CalenderProps {
  value: Range;
  disabledDates?: Date[];
  onChange: (value: RangeKeyDict) => void;
  direction?: "vertical" | "horizontal";
}

const Calender = ({
  disabledDates,
  onChange,
  value,
  direction = "vertical",
}: CalenderProps) => {
  return (
    <DateRange
      rangeColors={["#262626"]}
      color="#26262650"
      ranges={[value]}
      date={new Date()}
      onChange={onChange}
      direction={direction}
      showDateDisplay={false}
      minDate={new Date()}
      months={2}
      disabledDates={disabledDates}
    />
  );
};

export default Calender;
