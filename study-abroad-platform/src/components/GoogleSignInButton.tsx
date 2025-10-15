import React from 'react'
import { GoogleLogin } from '@react-oauth/google'
import type { CredentialResponse } from '@react-oauth/google'

interface GoogleSignInButtonProps {
  onSuccess: (userData: any) => void
  onError?: (error: any) => void
  text?: string
}

// Function to decode JWT token
const parseJWT = (token: string) => {
  try {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    )
    return JSON.parse(jsonPayload)
  } catch (error) {
    console.error('Error parsing JWT:', error)
    return null
  }
}

const GoogleSignInButton: React.FC<GoogleSignInButtonProps> = ({ 
  onSuccess, 
  onError, 
  text = "Sign in with Google"
}) => {
  const handleSuccess = (credentialResponse: CredentialResponse) => {
    if (credentialResponse.credential) {
      const userInfo = parseJWT(credentialResponse.credential)
      if (userInfo) {
        onSuccess({
          id: userInfo.sub,
          name: userInfo.name,
          email: userInfo.email,
          picture: userInfo.picture,
          googleId: userInfo.sub
        })
      } else {
        onError?.('Failed to parse user information')
      }
    } else {
      onError?.('No credential received')
    }
  }

  const handleError = () => {
    onError?.('Google sign-in failed')
  }

  return (
    <div className="w-full">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
        useOneTap={false}
        theme="outline"
        size="large"
        text="signin_with"
        shape="rectangular"
        width="100%"
      />
    </div>
  )
}

export default GoogleSignInButton