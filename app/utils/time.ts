import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import parseISO from 'date-fns/parseISO'

export const formatISODistance = (isoString: string) =>
  formatDistanceToNow(parseISO(isoString), {
    addSuffix: true,
  })
    .replace('minute', 'min')
    .replace('hour', 'hr')
