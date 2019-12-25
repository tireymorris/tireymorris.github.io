import { h } from 'preact';
import Markdown from './Markdown';

type Props = {
  path: string;
};

const Home = (props: Props) => <Markdown filepath="home.md" />;

export default Home;
