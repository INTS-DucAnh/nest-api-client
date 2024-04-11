import { PostDetailType } from '../type/post.type';

export const FAKE_POST: PostDetailType = {
  id: 'e3d7fa10-664b-4ed5-a131-6e0e2e5c1061',
  createdDate: new Date('2024-04-05T10:08:13.000Z'),
  updatedDate: new Date('2024-04-05T10:08:16.000Z'),
  content:
    'A checklist for backend code reviews covering code style, maintainability, requirements, API design, documentation, error handling, security, dependencies, logging, testing, performance, version control, and spelling.',
  title: 'Backend Code Review Checklist',
  thumbnail: 'https://res.cloudinary.com/daily-now/image/upload/f_auto,q_auto/v1/posts/ea36e7fe1b573018c9f509b486935b9f?_a=AQAEufR',
  like: 100,
  isLike: false,
  user: {
    id: 'e3d7fa10-664b-4ed5-a131-6e0e2e5c1060',
    name: 'ADMIN',
    email: 'admin@gmail.com',
    avatar: 'https://th.bing.com/th/id/OIP.pFmQpHNTE7ixFmSBIgmDEAHaE8?rs=1&pid=ImgDetMain',
    birthDay: '2002-02-25',
  },
  comment: [
    {
      id: 'b1889a15-355b-4bd6-ac15-9dc289199529',
      createdDate: new Date('2024-04-06T11:01:20.802Z'),
      updatedDate: new Date('2024-04-06T11:01:20.802Z'),
      content:
        'Just do programming on the side and collect your paychecks, your current job by no means defines what you do or what you will do in the future, the guy who made Stardew Valley was an usher before releasing that game and becoming a full-time game developer.',
      paramId: null,
      level: 0,
      user: {
        id: 'e3d7fa10-664b-4ed5-a131-6e0e2e5c1060',
        name: 'usercomment1',
        email: 'admin@gmail.com',
        avatar: 'https://avatars.githubusercontent.com/u/136119888?v=4',
        birthDay: '2002-02-25',
      },
      reply: [
        {
          id: 'bf2b3fcc-4668-4545-a547-939daf89c0ba',
          createdDate: new Date('2024-04-08T03:24:47.476Z'),
          updatedDate: new Date('2024-04-08T03:24:47.476Z'),
          content: 'I didn’t know about the Stardew Valley, but that’s very true!',
          paramId: 'b1889a15-355b-4bd6-ac15-9dc289199529',
          level: 1,
          user: {
            id: '2cff2f19-ba55-4c52-86fc-34d204c8c563',
            name: 'STAFF',
            email: 'staff@gmail.com',
            avatar: 'https://lh3.googleusercontent.com/a-/AOh14GhbzjX3iU6bqjbhv4dm9KaLoKPnyHYdYKjIF-hx=s100',
            birthDay: '2002-02-25',
          },
          replyToUser: {
            id: 'e3d7fa10-664b-4ed5-a131-6e0e2e5c1060',
            name: 'ADMIN',
            email: 'admin@gmail.com',
            avatar: null,
            birthDay: '2002-02-25',
          },
          replyToReply: [
            {
              id: 'c20b8699-235f-4578-8892-489b5eb192ce',
              createdDate: new Date('2024-04-08T07:08:15.669Z'),
              updatedDate: new Date('2024-04-08T07:08:15.669Z'),
              content: 'That’s quite impressive, actually! My first thought looking at it was “this is going to be really heavy compared to a ‘normal’ terminal”, but if it’s comparable, then it might be worth considering…',
              paramId: 'bf2b3fcc-4668-4545-a547-939daf89c0ba',
              level: 2,
              user: {
                id: '087f7f5f-1efc-44d5-915b-a7c4a59c232a',
                name: 'USER',
                email: 'user@gmail.com',
                avatar: 'https://daily-now-res.cloudinary.com/image/upload/v1682463026/avatars/avatar_EVoZmKDttD0jUKpEHC9Bl.jpg',
                birthDay: '2002-02-25',
              },
              replyToUser: {
                id: '2cff2f19-ba55-4c52-86fc-34d204c8c563',
                name: 'STAFF',
                email: 'staff@gmail.com',
                avatar: 'avatar/1712384067569-husky.jpg',
                birthDay: '2002-02-25',
              },
            },
          ],
        },
      ],
    },
    {
      id: '12606090-c38f-4343-97a9-9b3a56495ad5',
      createdDate: new Date('2024-04-06T11:02:19.111Z'),
      updatedDate: new Date('2024-04-06T11:02:19.111Z'),
      content: 'Very interesting. Thanks for sharing ✨',
      paramId: null,
      level: 0,
      user: {
        id: 'e3d7fa10-664b-4ed5-a131-6e0e2e5c1060',
        name: 'ADMIN',
        email: 'admin@gmail.com',
        avatar: 'https://lh3.googleusercontent.com/a/ACg8ocLMY04_UNiN4EAE1S9DekEd_gbvytZ7aYOi38a3nXFH_IDWkdmg=s96-c',
        birthDay: '2002-02-25',
      },
      reply: [],
    },
  ],
};

export const FAKE_POST_LIST = {};
