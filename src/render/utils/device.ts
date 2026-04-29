export const parseDeviceInfoAdvanced = () => {
  const ua = navigator.userAgent

  // Windows
  const win = ua.match(/Windows NT\s([\d.]+)/i)
  if (win) {
    return { channel: 'web', os_version: `Windows ${win[1]}` }
  }

  // macOS
  const mac = ua.match(/Mac OS X\s([\d_]+)/i)
  if (mac) {
    return {
      channel: 'web',
      os_version: `Mac OS ${mac[1].replace(/_/g, '.')}`
    }
  }

  // Android
  const androidMatch = ua.match(/Android\s([\d.]+)/i)
  if (androidMatch) {
    return { channel: 'android', os_version: androidMatch[1] }
  }

  // iPad 特殊处理
  const iosMatch = ua.match(/OS\s([\d_]+)\slike\sMac OS X/i)
  if (/Macintosh/i.test(ua) && navigator.maxTouchPoints > 1 && iosMatch) {
    return {
      channel: 'ios',
      os_version: iosMatch[1].replace(/_/g, '.')
    }
  }

  // iOS
  if (/iPhone|iPad|iPod/i.test(ua) && iosMatch) {
    return {
      channel: 'ios',
      os_version: iosMatch[1].replace(/_/g, '.')
    }
  }

  return { channel: 'web', os_version: 'unknown' }
}
