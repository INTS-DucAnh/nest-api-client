import { PostDetailType } from '../type/post.type';

export const FAKE_POST: PostDetailType = {
  id: 'e3d7fa10-664b-4ed5-a131-6e0e2e5c1061',
  createdDate: new Date('2024-04-05T10:08:13.000Z'),
  updatedDate: new Date('2024-04-05T10:08:16.000Z'),
  content: 'Test1',
  title: 'Test1',
  thumbnail: null,
  comment: 10,
  like: 100,
  user: {
    id: 'e3d7fa10-664b-4ed5-a131-6e0e2e5c1060',
    name: 'ADMIN',
    email: 'admin@gmail.com',
    avatar: null,
    birthDay: '2002-02-25',
  },
  comments: [
    {
      id: 'b1889a15-355b-4bd6-ac15-9dc289199529',
      createdDate: new Date('2024-04-06T11:01:20.802Z'),
      updatedDate: new Date('2024-04-06T11:01:20.802Z'),
      content: 'Test',
      paramId: null,
      level: 0,
      user: {
        id: 'e3d7fa10-664b-4ed5-a131-6e0e2e5c1060',
        name: 'ADMIN',
        email: 'admin@gmail.com',
        avatar: null,
        birthDay: '2002-02-25',
      },
      reply: [
        {
          id: 'bf2b3fcc-4668-4545-a547-939daf89c0ba',
          createdDate: new Date('2024-04-08T03:24:47.476Z'),
          updatedDate: new Date('2024-04-08T03:24:47.476Z'),
          content: 'Test',
          paramId: 'b1889a15-355b-4bd6-ac15-9dc289199529',
          level: 1,
          user: {
            id: '2cff2f19-ba55-4c52-86fc-34d204c8c563',
            name: 'STAFF',
            email: 'staff@gmail.com',
            avatar: 'avatar/1712384067569-husky.jpg',
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
              content: 'Test',
              paramId: 'bf2b3fcc-4668-4545-a547-939daf89c0ba',
              level: 2,
              user: {
                id: '087f7f5f-1efc-44d5-915b-a7c4a59c232a',
                name: 'USER',
                email: 'user@gmail.com',
                avatar: null,
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
      content: 'Test2',
      paramId: null,
      level: 0,
      user: {
        id: 'e3d7fa10-664b-4ed5-a131-6e0e2e5c1060',
        name: 'ADMIN',
        email: 'admin@gmail.com',
        avatar: null,
        birthDay: '2002-02-25',
      },
      reply: [],
    },
  ],
};

export const FAKE_POST_LIST = {};
