import { UserRoundIcon } from "lucide-react";
import AvatarComponet from "../ui/avatar";

export default function UserAvatar({avatar, className}: {avatar: string, className?: string}) {
  return (
    <AvatarComponet
      className={`${className} bg-transparent h-8 w-8`}
      src={avatar|| ''}
      alt="user"
      fallback={<UserRoundIcon className=" text-muted-foreground h-5 w-5" />}
    /> 
  )
}