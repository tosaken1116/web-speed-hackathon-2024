import Close from '@mui/icons-material/Close';
import NavigateNext from '@mui/icons-material/NavigateNext';
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Search from '@mui/icons-material/Search';
import ArrowBack from '@mui/icons-material/ArrowBack';
type Props = {
  color: string;
  height: number;
  type: keyof typeof Icons;
  width: number;
};
const Icons = {
  Close: Close,
  NavigateNext: NavigateNext,
  Favorite: Favorite,
  FavoriteBorder: FavoriteBorder,
  Search: Search,
  ArrowBack: ArrowBack,
};

export const SvgIcon: React.FC<Props> = ({ color, height, type, width }) => {
  // eslint-disable-next-line
  const Icon = Icons[type];
  return <Icon style={{ color, height, width }} />;
};
