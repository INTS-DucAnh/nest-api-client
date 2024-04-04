import { ReactNode, useContext } from 'react';
import DialogComponent from '../dialog';
import { DialogClose, DialogFooter } from '../ui/dialog';
import { Separator } from '../ui/separator';
import { Button } from '../ui/button';
import useRequest from '@/hooks/useRequestApi.hook';
import { useToast } from '../ui/use-toast';
import { REQUEST_PATH } from '@/common/constant/api.constant';
import useAccessToken from '@/hooks/useAccessToken.hook';
import { UserContext, UserContextType } from '@/contexts/user.context';

export default function DialogLogout({trigger } :{trigger: ReactNode}) {
  const { post } = useRequest();
  const { toast } = useToast();
  const { reset } = useContext<UserContextType>(UserContext);
  const { ClearToken } = useAccessToken();
  const logout = async () => {
    const res = await post({
      path: REQUEST_PATH.auth.logout(),
    });

    if(res) {
      toast({
        title: 'Logout Successfully',
        description: 'You logged out your account.',
      });
      ClearToken();
      reset();
    }
  }
  return (
    <DialogComponent
      trigger={trigger}
      title="Logout"
      description="By press confirm you will logout this account.">
      <DialogFooter className='w-full mt-5'>
        <DialogClose>
          <div className="flex gap-2 mt-5">
            <Button variant={'outline'}>Close</Button>
            <Button
              onClick={() => {
                logout();
              }}>
              Confirm
            </Button>
          </div>
        </DialogClose>
      </DialogFooter>
    </DialogComponent>
  );
}
