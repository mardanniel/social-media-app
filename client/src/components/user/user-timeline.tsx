import { PostProvider } from '../../context/post-context';
import PostCreate from '../post/post-create';
import PostList from '../post/post-list';

export default function UserTimeline({ userID }: { userID?: string }) {
  return (
    <PostProvider>
      <PostCreate />
      <PostList />
    </PostProvider>
  );
}
