// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'staff',
    path: '/dashboard/staff',
    icon: getIcon('eva:people-fill'),
  },
  {
    title: 'vehicle',
    path: '/dashboard/vehicle',
    icon: getIcon('ant-design:car-filled'),
  },

  {
    title: 'Swap',
    path: '/dashboard/swap',
    icon: getIcon('ic:baseline-swap-horizontal-circle'),
  },
  {
    title: 'Inquiry',
    path: '/dashboard/inquiry',
    icon: getIcon('fa-solid:question-circle'),
  },
  {
    title: 'Test Drive',
    path: '/dashboard/test-run',
    icon: getIcon('ic:baseline-run-circle'),
  },
  {
    title: 'Maintenances',
    path: '/dashboard/maintenance',
    icon: getIcon('carbon:license-maintenance-draft'),
  },
  {
    title: 'Transactions',
    path: '/dashboard/transaction',
    icon: getIcon('icon-park-twotone:transaction'),
  },
  {
    title: 'Customer',
    path: '/dashboard/add-customer',
    icon: getIcon('material-symbols:record-voice-over-rounded'),
  },
];

export default navConfig;
