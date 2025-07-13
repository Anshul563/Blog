'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged, signOut, User } from 'firebase/auth'
import { auth, db } from './firebase'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { useRouter } from 'next/navigation'

interface UserProfile {
  name: string
  email: string
  avatar?: string
  role: string
  status?: string
}

interface AuthContextType {
  user: User | null
  profile: UserProfile | null
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user)
      setLoading(false)

      if (user) {
        const userRef = doc(db, 'users', user.uid)
        const docSnap = await getDoc(userRef)

        if (docSnap.exists()) {
          const data = docSnap.data() as UserProfile

          // ✅ Check if banned
          if (data.status === 'banned') {
            await signOut(auth)
            router.push('/banned')
            return
          }

          setProfile(data)
        } else {
          // ✅ Create Firestore user for Google login
          const newUser: UserProfile = {
            name: user.displayName || 'User',
            email: user.email || '',
            avatar: user.photoURL || '',
            role: 'user',
            status: 'active',
          }

          await setDoc(userRef, newUser)
          setProfile(newUser)
        }
      } else {
        setProfile(null)
      }
    })

    return () => unsubscribe()
  }, [router])

  const logout = () => signOut(auth)

  return (
    <AuthContext.Provider value={{ user, profile, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
