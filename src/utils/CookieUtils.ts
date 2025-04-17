class CookieUtils {
  static deleteCookie(name: string): void {
    document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`
  }

  static getCookie(name: string): string | undefined {
    const matches = document.cookie.match(
      new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)'),
    )
    return matches ? decodeURIComponent(matches[1]) : undefined
  }
}

export default CookieUtils