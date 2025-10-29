import { TFunction } from 'i18next';

import type { SvgIconComponent } from '@mui/icons-material';
import { AccountCircle, Build, HomeOutlined, List, LockOutlined, PeopleOutline, PeopleOutlined, Settings, WorkOutline } from '@mui/icons-material';

import { ROUTE_PATH } from '@/constants/routes';
import { IPermission } from '@/types/permission';
import { mapPermissionsToSectionItems } from '@/utils/data';

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

const Sections = (menuData: IPermission | null): Section[] => {
  const sectionItems = menuData ? mapPermissionsToSectionItems(menuData) : [];
  let accountItem: SectionItem[] = sectionItems;
  return [
    {
      section: null,
      items: accountItem
    }
  ]
};

// const Sections = (): Section[] => {
//   return AdminSections();
// };
const AdminSections = (): Section[] => [
  {
    section: null,
    items: [
      {
        title: 'Dashboard quản lý',
        path: `/${ROUTE_PATH.MANAGE}/${ROUTE_PATH.MANAGE_HOME}`,
        icon: HomeOutlined,
      },
    ],
  },
  {
    section: null,
    items: [
      {
        title: 'Phân quyền quản lý',
        path: `/${ROUTE_PATH.MANAGE}/${ROUTE_PATH.MANAGE_DECENTRALIZATION_ACCOUNT}`,
        icon: LockOutlined,
      },
    ],
  },
  {
    section: null,
    items: [
      {
        title: 'Quản lý công việc',
        path: `/${ROUTE_PATH.MANAGE}/${ROUTE_PATH.MANAGE_JOB}`,
        icon: WorkOutline,
      },
    ],
  },
  {
    section: null,
    items: [
      {
        title: 'Thông tin cá nhân',
        path: `/${ROUTE_PATH.MANAGE}/${ROUTE_PATH.MANAGE_INFORMATION}`,
        icon: AccountCircle,
      },
    ],
  },
  {
    section: null,
    items: [
      {
        title: 'Quản lý quyền',
        path: `#`,
        icon: Settings,
        children: [
          {
            title: 'Thao tác',
            path: `/${ROUTE_PATH.MANAGE}/${ROUTE_PATH.MANAGE_ACTION}`,
            icon: Build,
          },
          {
            title: 'Chức năng',
            path: `/${ROUTE_PATH.MANAGE}/${ROUTE_PATH.MANAGE_MENU}`,
            icon: List,
          }
        ]
      },
    ],
  },
];

export default Sections;
