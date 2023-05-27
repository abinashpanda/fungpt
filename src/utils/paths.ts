export function joinPaths(...paths: string[]) {
  return paths.filter(Boolean).join('/')
}

export function matchRouterPath(basePath: string, path: string, comparison: 'startsWith' | 'equal') {
  if (comparison === 'startsWith') {
    return basePath.slice(1).startsWith(path)
  }
  return basePath.slice(1) === path
}
