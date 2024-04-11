import HomeAboutUs from '@/components/about-us';
import HomeHeadline from '@/components/home-headline';
import HomeMostLike from '@/components/home-like';

export default function HomeRoute() {
  return (
    <>
      <HomeHeadline />
      <HomeMostLike />
      <HomeAboutUs />
    </>
  );
}
