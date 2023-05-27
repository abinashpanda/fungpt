import { HiOutlineHome, HiOutlineUser } from 'react-icons/hi2'

type BaseRoute = {
  name: string
  icon: React.ReactElement<{ className?: string }>
  path: string
}

type ChildRoute = BaseRoute & {
  type: 'child'
  hideInAppShell?: boolean
}

type ParentRoute = BaseRoute & {
  type: 'parent'
  defaultPath: string
  basePath: string
  children: ChildRoute[]
}

export const ROUTES: ParentRoute[] = [
  {
    name: 'Admin',
    path: '',
    defaultPath: '',
    basePath: '',
    type: 'parent',
    icon: <HiOutlineHome />,
    children: [
      {
        name: 'Users',
        path: '',
        type: 'child',
        icon: <HiOutlineUser />,
      },
    ],
  },
]
