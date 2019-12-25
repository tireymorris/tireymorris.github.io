import { h } from 'preact';
import Markdown from './Markdown';

type Props = {
  path: string;
};

const Projects = (props: Props) => <Markdown filepath="projects.md" />;

export default Projects;
