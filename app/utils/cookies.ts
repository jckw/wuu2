function getCookie(name: string, cookieString: string | null) {
  if (!cookieString) return null
  const match = cookieString.match(new RegExp(`(^| )${name}=([^;]+)`))
  if (match) return match[2]
  return null
}

export function hasSessionidCookie(request: Request) {
  return !!getCookie('sessionid', request.headers.get('Cookie'))
}
