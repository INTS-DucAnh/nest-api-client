import { UserModifyBase } from "@/common/type/user.type";
import { ReactNode } from "react";
import UserAvatar from "./user-avatar";

export default function  UserInfo({user, children}: {user: UserModifyBase, children?: ReactNode}) {
  return <div className='flex gap-2 items-center py-1 text-foreground'>
  <div className='w-fit h-fit bg-muted flex items-center justify-center rounded-full'>
    <UserAvatar avatar={user.avatar || ''}/>                       
  </div>
  <div>
    <p className='text-xs'>{user.name}</p>
    {children}
  </div>

</div>
}