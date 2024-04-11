import { useRef, useState } from 'react';
import { PostCommentBaseType, PostDetailType } from '@/common/type/post.type';
import { Heart, MessageSquareMore, Bookmark, Link, ExternalLink, GripVertical } from 'lucide-react';
import { TimeAgo } from '@/lib/date-between';
import { v4 as uuidv4 } from 'uuid';

interface Comment {
  id: string;
  content: string;
  createdDate: Date;
  user: {
    id: string;
    name: string;
    avatar: string;
  };
}

interface Props {
  post: PostDetailType;
  handlePostComment: (name: string, avatar: string) => void;
  comments: Comment[];
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
}

export default function PostDetail({ post }: { post: PostDetailType }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isComment, setIsComment] = useState(false);
  const [isBookmark, setIsBookmark] = useState(false);
  const [isReply_0, setIsReply_0] = useState(false);
  const [isReply_1, setIsReply_1] = useState(false);
  const [isReply_2, setIsReply_2] = useState(false);

  const handleLikeClick = () => setIsLiked(!isLiked);

  const handleCommentClick = () => {
    setIsComment(!isComment);
    inputRef && inputRef.current && inputRef.current.focus();
  };

  const handlePostComment = (name: string, avatar: string) => {};

  const commentOptionIcons = [
    {
      id: 'like',
      icon: <Heart />,
    },
    {
      id: 'reply',
      icon: <MessageSquareMore />,
    },
    {
      id: 'share',
      icon: <ExternalLink />,
    },
    {
      id: 'more',
      icon: <GripVertical />,
    },
  ];

  const formatDate = (dateString: string) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const date = new Date(dateString);
    const month = months[date.getMonth()];
    const day = date.getDate().toString().padStart(2, '0');
    return `${month} ${day}`;
  };

  const newCreatedData = post.createdDate.toString();

  return (
    <div className='tablet:flex-row tablet:pb-0 flex flex-row pb-6 bg-background-default min-h-screem w-full'>
      {/* MAIN */}
      <main
        style={{
          width: '60%',
        }}
        className='border-r-2 border-gray-800 relative flex flex-col flex-1 px-4 tablet:px-8 tablet:border-r tablet:border-theme-divider-tertiary w-full max-w-4xl'
      >
        <h1 className='my-6 break-words font-bold text-3xl'>{post.title}</h1>

        <div className='mb-6 text-text-secondary multi-truncate border-l border-accent-cabbage-default pl-4'>
          <div>
            <p className='select-text break-words typo-body'>
              <span className='pr-1 font-bold text-accent-cabbage-default'>TLDR</span> {post.content}
            </p>
          </div>
        </div>

        <div className='flex flex-wrap gap-2'>
          <a
            href='#'
            className='btn shadow-none focus-outline inline-flex cursor-pointer select-none flex-row items-center border no-underline transition duration-200 ease-in-out typo-callout justify-center font-bold h-6 px-2 rounded-8 btn-tertiaryFloat'
          >
            #architecture
          </a>
          <a
            href='#'
            className='btn shadow-none focus-outline inline-flex cursor-pointer select-none flex-row items-center border no-underline transition duration-200 ease-in-out typo-callout justify-center font-bold h-6 px-2 rounded-8 btn-tertiaryFloat'
          >
            #backend
          </a>
          <a
            href='#'
            className='btn shadow-none focus-outline inline-flex cursor-pointer select-none flex-row items-center border no-underline transition duration-200 ease-in-out typo-callout justify-center font-bold h-6 px-2 rounded-8 btn-tertiaryFloat'
          >
            #productivity
          </a>
        </div>

        <div className='flex items-center text-text-tertiary typo-footnote mt-4 !typo-callout mb-8'>
          <span>{formatDate(newCreatedData)}</span>
          <span className='mx-1'>•</span>
          <span>2m read time</span>
        </div>

        <a
          href='#'
          style={{
            maxWidth: '25.625rem',
          }}
          className='mb-10 block cursor-pointer overflow-hidden rounded-16'
        >
          <div className='relative overflow-hidden'>
            <div
              style={{
                paddingTop: '49%',
                zIndex: -1,
              }}
            ></div>
            <img
              src={`${post.thumbnail}`}
              alt='thumbnail'
              className='absolute block inset-0 w-full h-full m-auto object-cover rounded-xl'
            />
          </div>
        </a>

        <div className='mb-5 flex items-center gap-x-4 text-text-tertiary typo-callout'>
          <span className='flex cursor-pointer flex-row items-center text-text-tertiary hover:underline focus:underline'>
            {isLiked ? post.like + 1 : post.like} Likes
          </span>
          <span>{post.comment.length} comments</span>
        </div>

        <div className='flex items-center rounded-2xl border border-border-subtlest-tertiary'>
          <article
            className={`flex gap-2 relative max-h-cardLarge h-full flex-col p-2 rounded-2xl border shadow-2 ${isLiked ? 'bg-red-600' : 'bg-gray-900'}`}
          >
            <div className='btn-quaternary flex flex-row items-stretch select-none btn-tertiary-avocado '>
              <button
                className='btn shadow-none focus-outline inline-flex cursor-pointer select-none flex-row items-center border no-underline transition duration-200 ease-in-out typo-callout justify-center font-bold iconOnly h-10 w-10 p-0 rounded-12 border-none'
                onClick={handleLikeClick}
              >
                <Heart className='outline-none' />
              </button>
            </div>
          </article>

          <div className='flex flex-1 items-center justify-between px-4 py-2'>
            <div className='btn-quaternary flex items-center flex-row select-none cursor-pointer'>
              <button
                id='comment-post-btn'
                className='btn shadow-none focus-outline inline-flex cursor-pointer select-none flex-row items-center border no-underline transition duration-200 ease-in-out typo-callout justify-center font-bold iconOnly h-10 w-10 p-0 rounded-12 border-none'
                onClick={handleCommentClick}
              >
                <MessageSquareMore />
              </button>
              <label htmlFor='comment-post-btn' className='cursor-pointer'>
                Comment
              </label>
            </div>

            <div className='btn-quaternary flex items-center flex-row select-none cursor-pointer'>
              <button
                id='bookmark-post-btn'
                className='btn shadow-none focus-outline inline-flex cursor-pointer select-none flex-row items-center border no-underline transition duration-200 ease-in-out typo-callout justify-center font-bold iconOnly h-10 w-10 p-0 rounded-12 border-none'
                onClick={() => setIsBookmark(!isBookmark)}
              >
                <Bookmark className={`${isBookmark ? 'text-blue-600' : ''}`} />
              </button>
              <label htmlFor='bookmark-post-btn' className={`cursor-pointer ${isBookmark ? 'text-blue-600' : ''}`}>
                Bookmark
              </label>
            </div>

            <div className='btn-quaternary flex items-center flex-row select-none'>
              <button
                id='copy-post-btn'
                className='btn shadow-none focus-outline inline-flex cursor-pointer select-none flex-row items-center border no-underline transition duration-200 ease-in-out typo-callout justify-center font-bold iconOnly h-10 w-10 p-0 rounded-12 border-none'
              >
                <Link />
              </button>
              <label htmlFor='copy-post-btn'>Copy</label>
            </div>
          </div>
        </div>

        <div className={`mt-2 round-2xl border-2 flex items-center p-2.5 rounded-xl ${isComment ? 'border-gray-200' : ''}`}>
          <img src={`${post.user.avatar}`} alt='' className='object-cover w-10 h-10 rounded-xl tablet:flex' />
          <input ref={inputRef} type='text' className='outline-none bg-transparent w-3/5 mx-10' onBlur={() => setIsComment(false)} />
          <button
            className='btn shadow-none focus-outline inline-flex cursor-pointer select-none flex-row items-center border no-underline transition duration-200 ease-in-out typo-callout justify-center font-bold h-10 px-5 rounded-xl btn-secondary ml-auto text-text-primary tablet:flex'
            onClick={() => post.user.name && post.user.avatar && handlePostComment(post.user.name, post.user.avatar)}
          >
            Post
          </button>
        </div>
      </main>

      {/* ASIDE */}
      <aside
        style={{
          width: '40%',
        }}
        className='pb-8 tablet:w-[18.75rem] tablet:max-w-[18.75rem] laptop:w-[21.25rem] laptop:max-w-[21.25rem] flex flex-col gap-6 px-4 max-w-full w-3/12'
      >
        <div className='flex flex-col border border-border-subtlest-tertiary rounded-2xl'>
          <div className='relative flex flex-row items-center p-3'>
            <a href='#' className='flex min-w-0 shrink items-center no-underline'>
              <div className='cursor-pointer rounded-full w-10 h-10 relative overflow-hidden'>
                <img
                  src={`${post.user.avatar}`}
                  alt='logo'
                  className='absolute block inset-0 w-full h-full m-auto object-cover ls-is-cached lazyloaded'
                />
              </div>
            </a>
            <div className='ml-4 flex min-w-0 flex-1 flex-col'>
              <a href='#' className=' truncate font-bold text-sm flex min-w-0 shrink items-center no-underline'>
                {post.user.name}
              </a>
              <a href='#' className='mt-0.5 truncate text-text-tertiary text-xs flex min-w-0 shrink items-center no-underline'>
                {post.user.email}
              </a>
            </div>
            <div>
              <button className='flex justify-center items-center bg-white rounded-xl text-black p-2'>
                <ExternalLink /> Read post
              </button>
            </div>
          </div>
        </div>

        {post.comment.map((value: any) => {
          return (
            <div className='flex scroll-mt-16 flex-col items-stretch rounded-3xl border'>
              <div className='flex flex-col border border-border-subtlest-tertiary rounded-2xl hover:bg-gray-800 bg-opacity-1f'>
                <div className='relative p-3'>
                  <div className='flex'>
                    <img src={`${value.user.avatar}`} className='object-cover w-10 h-10 rounded-xl' alt='' />
                    <div className=' w-full'>
                      <p>{value.user.name}</p>
                      <div className='flex justify-between w-full'>
                        <span
                          style={{
                            color: '#a8b3cf',
                          }}
                          className='max-w-full shrink truncate text-sm'
                        >
                          {value.user.email}
                        </span>
                        <span
                          style={{
                            color: '#a8b3cf',
                          }}
                          className='max-w-full shrink truncate text-sm ml-4'
                        >
                          {TimeAgo(value.updatedDate)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>{value.content}</div>

                  <div className='flex flex-row items-center pointer-events-auto mt-3'>
                    {commentOptionIcons.map((icon: any) => {
                      return (
                        <button
                          className='border-none shadow-none focus-outline inline-flex cursor-pointer select-none flex-row items-center border no-underline transition duration-200 ease-in-out typo-callout justify-center font-bold iconOnly h-8 w-8 p-0 rounded-10 btn-tertiary-avocado mr-3'
                          id={icon.id}
                          onClick={() => {
                            setIsReply_0(!isReply_0);
                            console.log(value);
                          }}
                        >
                          {icon.icon}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
              {isReply_0 ? (
                <div className={`mt-2 round-2xl border-2 flex items-center p-2.5 rounded-xl ${isComment ? 'border-gray-200' : ''}`}>
                  <img src={`${post.user.avatar}`} alt='' className='object-cover w-10 h-10 rounded-xl tablet:flex' />
                  <div className='flex flex-col'>
                    <p className='ml-2'>
                      <a
                        style={{
                          borderRadius: '6px',
                          backgroundColor: '#3b82f6',
                          fontWeight: '700',
                          paddingLeft: '4px',
                          paddingRight: '4px',
                          position: 'relative',
                        }}
                        href='#'
                      >
                        @{value.user.name}
                      </a>{' '}
                    </p>
                    <textarea className='outline-none bg-transparent w-full ml-2' onBlur={() => setIsReply_0(false)} />
                  </div>
                  <a
                    href='#'
                    className='btn shadow-none focus-outline inline-flex cursor-pointer select-none flex-row items-center border no-underline transition duration-200 ease-in-out typo-callout justify-center font-bold h-10 px-5 rounded-xl btn-secondary ml-auto text-text-primary tablet:flex'
                  >
                    Post
                  </a>
                </div>
              ) : (
                ''
              )}

              {value.reply.length > 0
                ? value.reply.map((item: any) => {
                    return (
                      <>
                        <div className='flex flex-col rounded-3xl p-4 focus:outline relative hover:bg-gray-800 bg-opacity-1f'>
                          <div
                            style={{
                              backgroundColor: '#a8b3cf14',
                            }}
                            className='absolute bottom-0 left-9 top-0 -ml-px w-0.5'
                          />
                          <header className='z-1 flex w-full flex-row self-start'>
                            <a className='flex min-w-0 shrink items-center no-underline' href=''>
                              <img className='object-cover w-10 h-10 rounded-2xl' src={`${item.user.avatar}`} alt='reply avatar' />
                            </a>
                            <div className='ml-3 flex min-w-0 flex-1 flex-col typo-callout'>
                              <span className='w-fit font-bold  flex min-w-0 shrink items-center no-underline'>{item.user.name}</span>
                              <div className='flex justify-between w-full'>
                                <span
                                  style={{
                                    color: '#a8b3cf',
                                  }}
                                  className='max-w-full shrink truncate text-sm'
                                >
                                  {item.user.email}
                                </span>
                                <span
                                  style={{
                                    color: '#a8b3cf',
                                  }}
                                  className='max-w-full shrink truncate text-sm ml-4'
                                >
                                  {TimeAgo(item.updatedDate)}
                                </span>
                              </div>
                            </div>
                          </header>
                          <div className='break-words z-1 mt-3 ml-14'>
                            <div
                              style={{
                                position: 'relative',
                                wordBreak: 'break-word',
                              }}
                            >
                              <p>
                                <a
                                  style={{
                                    borderRadius: '6px',
                                    backgroundColor: '#3b82f6',
                                    fontWeight: '700',
                                    paddingLeft: '4px',
                                    paddingRight: '4px',
                                    position: 'relative',
                                  }}
                                  href='#'
                                >
                                  @{value.user.name}
                                </a>{' '}
                                {item.content}
                              </p>
                            </div>

                            <div className='flex flex-row items-center pointer-events-auto mt-3'>
                              {commentOptionIcons.map((icon: any) => {
                                return (
                                  <button
                                    className='border-none shadow-none focus-outline inline-flex cursor-pointer select-none flex-row items-center border no-underline transition duration-200 ease-in-out typo-callout justify-center font-bold iconOnly h-8 w-8 p-0 rounded-10 btn-tertiary-avocado mr-3'
                                    id={icon.id}
                                    onClick={() => setIsReply_1(!isReply_1)}
                                  >
                                    {icon.icon}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </div>

                        {isReply_1 ? (
                          <div
                            className={`mt-2 round-2xl border-2 flex items-center p-2.5 rounded-xl ${isComment ? 'border-gray-200' : ''}`}
                          >
                            <img src={`${post.user.avatar}`} alt='' className='object-cover w-10 h-10 rounded-xl tablet:flex' />
                            <div className='flex flex-col'>
                              <p className='ml-2'>
                                <a
                                  style={{
                                    borderRadius: '6px',
                                    backgroundColor: '#3b82f6',
                                    fontWeight: '700',
                                    paddingLeft: '4px',
                                    paddingRight: '4px',
                                    position: 'relative',
                                  }}
                                  href='#'
                                >
                                  @{item.user.name}
                                </a>{' '}
                              </p>
                              <textarea className='outline-none bg-transparent w-full ml-2' onBlur={() => setIsReply_1(false)} />
                            </div>
                            <a
                              href='#'
                              className='btn shadow-none focus-outline inline-flex cursor-pointer select-none flex-row items-center border no-underline transition duration-200 ease-in-out typo-callout justify-center font-bold h-10 px-5 rounded-xl btn-secondary ml-auto text-text-primary tablet:flex'
                            >
                              Post
                            </a>
                          </div>
                        ) : (
                          ''
                        )}

                        {item.replyToReply.length > 0
                          ? item.replyToReply.map((replyToReply: any) => {
                              return (
                                <>
                                  <div className='flex flex-col rounded-3xl p-4 focus:outline relative hover:bg-gray-800 bg-opacity-1f'>
                                    <div
                                      style={{
                                        backgroundColor: '#a8b3cf14',
                                      }}
                                      className='absolute bottom-0 left-16 top-0 -ml-px w-0.5'
                                    />
                                    <header className='z-1 flex flex-row m-auto self-start w-4/5'>
                                      <a className='flex min-w-0 shrink items-center no-underline' href=''>
                                        <img
                                          className='object-cover w-10 h-10 rounded-2xl'
                                          src={`${replyToReply.user.avatar}`}
                                          alt='reply avatar'
                                        />
                                      </a>
                                      <div className='ml-3 flex min-w-0 flex-1 flex-col'>
                                        <span className='w-fit font-bold flex min-w-0 shrink items-center no-underline'>
                                          {replyToReply.user.name}
                                        </span>
                                        <div className='flex justify-between w-full'>
                                          <span
                                            style={{
                                              color: '#a8b3cf',
                                            }}
                                            className='max-w-full shrink truncate text-sm'
                                          >
                                            {replyToReply.user.email}
                                          </span>
                                          <span
                                            style={{
                                              color: '#a8b3cf',
                                            }}
                                            className='max-w-full shrink truncate text-sm ml-4'
                                          >
                                            {TimeAgo(replyToReply.updatedDate)}
                                          </span>
                                        </div>
                                      </div>
                                    </header>
                                    <div className='break-words z-1 mt-3 ml-28'>
                                      <div
                                        style={{
                                          position: 'relative',
                                          wordBreak: 'break-word',
                                        }}
                                      >
                                        <p>
                                          <a
                                            style={{
                                              borderRadius: '6px',
                                              background: '#3b82f6',
                                              fontWeight: '700',
                                              paddingLeft: '4px',
                                              paddingRight: '4px',
                                              position: 'relative',
                                            }}
                                            href='#'
                                          >
                                            @{replyToReply.replyToUser.name}
                                          </a>{' '}
                                          {replyToReply.content}
                                        </p>
                                      </div>
                                      <div className='flex flex-row items-center pointer-events-auto mt-3'>
                                        {commentOptionIcons.map((icon: any) => {
                                          return (
                                            <button
                                              className='border-none shadow-none focus-outline inline-flex cursor-pointer select-none flex-row items-center border no-underline transition duration-200 ease-in-out typo-callout justify-center font-bold iconOnly h-8 w-8 p-0 rounded-10 btn-tertiary-avocado mr-3'
                                              id={icon.id}
                                              onClick={() => setIsReply_2(!isReply_2)}
                                            >
                                              {icon.icon}
                                            </button>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  </div>

                                  {isReply_2 ? (
                                    <div
                                      className={`mt-2 round-2xl border-2 flex items-center p-2.5 rounded-xl ${isComment ? 'border-gray-200' : ''}`}
                                    >
                                      <img src={`${post.user.avatar}`} alt='' className='object-cover w-10 h-10 rounded-xl tablet:flex' />
                                      <div className='flex flex-col'>
                                        <p className='ml-2'>
                                          <a
                                            style={{
                                              borderRadius: '6px',
                                              backgroundColor: '#3b82f6',
                                              fontWeight: '700',
                                              paddingLeft: '4px',
                                              paddingRight: '4px',
                                              position: 'relative',
                                            }}
                                            href='#'
                                          >
                                            @{replyToReply.user.name}
                                          </a>{' '}
                                        </p>
                                        <textarea className='outline-none bg-transparent w-full ml-2' onBlur={() => setIsReply_2(false)} />
                                      </div>
                                      <a
                                        href='#'
                                        className='btn shadow-none focus-outline inline-flex cursor-pointer select-none flex-row items-center border no-underline transition duration-200 ease-in-out typo-callout justify-center font-bold h-10 px-5 rounded-xl btn-secondary ml-auto text-text-primary tablet:flex'
                                      >
                                        Post
                                      </a>
                                    </div>
                                  ) : (
                                    ''
                                  )}
                                </>
                              );
                            })
                          : ''}
                      </>
                    );
                  })
                : ''}
            </div>
          );
        })}
      </aside>
    </div>
  );
}
