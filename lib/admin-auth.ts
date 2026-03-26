// Autenticación de admin usando variables de entorno
export function validateAdminUser(username: string, password: string): boolean {
  console.log("🔍 All env vars:", Object.keys(process.env).filter(k => k.includes('ADMIN')))
  const adminUsers = process.env.NEXT_PUBLIC_ADMIN_USERS
  
  if (!adminUsers) {
    console.error("❌ NEXT_PUBLIC_ADMIN_USERS environment variable not set")
    return false
  }
  
  console.log("🔍 Attempting login:", { username, password: "***" })
  
  const users = adminUsers.split(',').map(userEntry => {
    const [user, pass] = userEntry.split(':')
    return { username: user, password: pass }
  })
  
  console.log("🔍 Parsed users:", users.map(u => ({...u, password: "***"})))
  
  const isValid = users.some(user => user.username === username && user.password === password)
  console.log("🔍 User valid:", isValid)
  
  return isValid
}

export function getAdminUsers(): Array<{username: string, password: string}> {
  const adminUsers = process.env.NEXT_PUBLIC_ADMIN_USERS
  
  if (!adminUsers) {
    console.error("❌ NEXT_PUBLIC_ADMIN_USERS environment variable not set")
    return []
  }
  
  return adminUsers.split(',').map(userEntry => {
    const [user, pass] = userEntry.split(':')
    return { username: user, password: pass }
  })
}
