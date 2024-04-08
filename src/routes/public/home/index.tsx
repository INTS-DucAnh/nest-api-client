import DialogPostDetail from '@/components/dialog/dialog-post/view';
import HomeHeadline from '@/components/home-headline';

export default function HomeRoute() {
  return (
    <>
      <HomeHeadline />
      <div>
        <DialogPostDetail id='fake' />
      </div>
    </>
  );
}
