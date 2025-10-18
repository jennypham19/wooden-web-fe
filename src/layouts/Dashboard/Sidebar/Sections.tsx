import { TFunction } from 'i18next';

import type { SvgIconComponent } from '@mui/icons-material';
import { HomeOutlined, PeopleOutline, PeopleOutlined } from '@mui/icons-material';

import { ROUTE_PATH } from '@/constants/routes';

export interface SectionItem {
  title: string;
  path: string;
  children?: SectionItem[];
  info?: () => JSX.Element;
  icon?: SvgIconComponent;
}

interface Section {
  section: string | null;
  items: SectionItem[];
}

const Sections = (): Section[] => {
  return AdminSections();
};
const AdminSections = (): Section[] => [
  {
    section: null,
    items: [
      {
        title: 'Dashboard quản lý',
        path: `${ROUTE_PATH.MANAGE_HOME}`,
        icon: HomeOutlined,
      },
    ],
  },
];

export default Sections;
