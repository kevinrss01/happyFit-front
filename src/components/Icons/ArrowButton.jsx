import Link from 'next/link'

const faIconBase = 'pointer text-3xl text-white fa fa-arrow-circle-'

const ArrowLink = ({ children, ...linkProps }) => <Link {...linkProps}>{children}</Link>

export default function ArrowButton({
   direction = 'left',
   isLink = false,
   href = '',
   className = 'arrow-navigator',
   ...buttonProps
}) {
   const ArrowIcon = <i className={`${className} ${faIconBase}${direction}`} {...buttonProps} />
   if (isLink) return <ArrowLink href={href}>{ArrowIcon}</ArrowLink>

   return <>{ArrowIcon}</>
}
