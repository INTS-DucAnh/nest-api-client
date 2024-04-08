import { DateFormat } from "@/common/constant/date.constant";
import { DateModifyRecordEnum } from "@/common/enum/table.enum";
import { DateFormatType } from "@/common/type/date.type";
import { RecordBase } from "@/common/type/table.type";
import FormatDate from "@/lib/date-format.lb";
import { CellContext } from "@tanstack/react-table";

export default function DateCell<T extends RecordBase>(
{
  type, 
  format = `${DateFormat}` as DateFormatType
}: {
  type: DateModifyRecordEnum, 
  format?: DateFormatType 
}) {
  return function Component({row} : CellContext<T, unknown>) {
    const time = row.original[type];
    return <p>{FormatDate({time: time, format })}</p>
  }
}