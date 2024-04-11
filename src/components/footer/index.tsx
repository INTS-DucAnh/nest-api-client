import { GitHubLogoIcon, InfoCircledIcon } from '@radix-ui/react-icons';
import { AtomIcon, DatabaseIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import FooterSection from './footer-section';

export default function PublicFooter() {
  return (
    <div className='w-full h-fit max-h-[400px] bg-background box-border text-left flex flex-col mt-20'>
      <div className='flex-1 p-10 px-64 grid grid-cols-4 grid-rows-1 gap-10'>
        <FooterSection title='NestJS API'>
          <>
            <p className='w-full break-words'>
              Unlock the power of interaction! Dive into posts, express your thoughts, and engage with the community through comments.
            </p>
          </>
        </FooterSection>
        <FooterSection title='Duc Anh'>
          <ul>
            <li>Tag</li>
            <li>Post - Tag</li>
            <li>Category</li>
            <li>Post - Category</li>
            <li>Frontend </li>
          </ul>
        </FooterSection>
        <FooterSection title='Duong'>
          <ul>
            <li>Exception Filter</li>
            <li>Intercepter</li>
            <li>Migration Seeder</li>
            <li>User</li>
            <li>Post</li>
            <li>Token</li>
            <li>Like </li>
            <li>Comment </li>
          </ul>
        </FooterSection>
        <FooterSection title='Technology'>
          <ul>
            <li className='flex items-center'>
              <GitHubLogoIcon className='w-3 h-3 mr-2' />
              <Link to={'https://github.com/hduonng25/nestjs-api'} target='_blank'>
                Backend
              </Link>
            </li>
            <li className='flex items-center'>
              <GitHubLogoIcon className='w-3 h-3 mr-2' />
              <Link to={'https://github.com/INTS-DucAnh/nest-api-client'} target='_blank'>
                Frontend
              </Link>
            </li>
            <li className='flex items-center'>
              <AtomIcon className='w-3 h-3 mr-2' />
              <Link to={'https://react.dev/'} target='_blank'>
                React
              </Link>
            </li>
            <li className='flex items-center'>
              <InfoCircledIcon className='w-3 h-3 mr-2' />
              <Link to={'https://ui.shadcn.com/docs'} target='_blank'>
                Shadcn/ui {'(UI library)'}
              </Link>
            </li>
            <li className='flex items-center'>
              <InfoCircledIcon className='w-3 h-3 mr-2' />
              <Link to={'https://docs.nestjs.com/'} target='_blank'>
                NestJs
              </Link>
            </li>
            <li className='flex items-center'>
              <InfoCircledIcon className='w-3 h-3 mr-2' />
              <Link to={'https://typeorm.io/'} target='_blank'>
                TypeORM
              </Link>
            </li>
            <li className='flex items-center'>
              <DatabaseIcon className='w-3 h-3 mr-2' />
              <Link to={'https://www.postgresql.org/docs/'} target='_blank'>
                PostgreSQL
              </Link>
            </li>
          </ul>
        </FooterSection>
      </div>
      <div className='grid place-items-center p-4 py-2 border-t bg-muted'>
        <p className='text-xs text-muted-foreground'>@2024 Copyright: Duc Anh and Duong </p>
      </div>
    </div>
  );
}
