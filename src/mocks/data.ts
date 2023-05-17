export interface IPost {
  id: number
  title: string
  body: string
}

export const posts: IPost[] = [
  {
    id: 1,
    title: 'Post 1',
    body: 'Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet',
  },
  {
    id: 2,
    title: 'Post 2',
    body: 'Lorem ipsum dolor sit amet',
  },
  {
    id: 3,
    title: 'Post 3',
    body: 'Lorem ipsum dolor sit amet Lorem ipsum ',
  },
]
