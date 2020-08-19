import defaultSettings from '@/settings'

const title = defaultSettings.title || '统一社会信用代码'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
