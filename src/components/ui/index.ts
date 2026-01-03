// Re-exportar todos los wrappers desde un solo lugar
export * from './ant/AntButton';
export * from './ant/AntInput';
export * from './ant/AntForm';
export * from './ant/AntCard';

// Exportar componentes directamente de Ant Design que no necesitan wrapper por ahora
export {
  Layout,
  Menu,
  Dropdown,
  Avatar,
  Badge,
  Tooltip,
  Modal,
  Drawer,
  Table,
  Spin,
  Select,
  Checkbox,
  Radio,
  Switch,
  DatePicker,
  message,
  notification,
  Flex,
  App,
  Divider,
  theme,
} from 'antd';
export type { MenuProps } from 'antd';

export { Loading } from './Loading';
