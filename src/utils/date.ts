import { format, parseISO } from 'date-fns'

const formatDate = (date: string) => format(parseISO(date), 'MMMM dd, yyyy')

export default formatDate