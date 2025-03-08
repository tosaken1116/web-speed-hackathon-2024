import { ArrowBack, Close, Favorite, FavoriteBorder, NavigateNext, Search } from '@mui/icons-material';

type Props = {
  color: string;
  height: number;
  type: keyof typeof Icons;
  width: number;
};

const Icons = {
  ArrowBack: ArrowBack,
  Close: Close,
  Favorite: Favorite,
  FavoriteBorder: FavoriteBorder,
  NavigateNext: NavigateNext,
  Search: Search,
} as const;

export const SvgIcon: React.FC<Props> = ({ color, height, type, width }) => {
  // eslint-disable-next-line
  const Icon = Icons[type];
  return <Icon style={{ color, height, width }} />;
};
