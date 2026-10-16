/** Shared navigation metadata. Add domain types when their contracts are defined. */
export interface NavigationItem {
  readonly href: `/${string}`;
  readonly title: string;
  readonly description: string;
}
