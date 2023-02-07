export interface NavigationItem {
  icon?: string;
  title: string;
  needRoles?: string[];
  index: string;
  children?: NavigationItem[];
}
