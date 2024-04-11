import { ModifierRecordEnum } from '@/common/enum/table.enum';
import { RecordModifier } from '@/common/type/table.type';
import { CellContext } from '@tanstack/react-table';
import UserInfo from '../user-info/user-info';

export default function UserCell<T extends RecordModifier>({ type }: { type: ModifierRecordEnum }) {
  return function Component({ row }: CellContext<T, unknown>) {
    const user = row.original[type];
    if (!user) return <></>;
    return <UserInfo user={user} />;
  };
}
