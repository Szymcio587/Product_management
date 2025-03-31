import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function AuthPage({ authView, authForm, setAuthForm, handleLogin, handleRegister, handleGuest, setAuthView }) {
  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl mb-4">
        {authView === 'login' ? 'Log In' : authView === 'register' ? 'Register' : 'Continue as Guest'}
      </h1>

      {(authView === 'login' || authView === 'register') && (
        <>
          <Input
            placeholder="Username"
            className="mb-2"
            value={authForm.username}
            onChange={e => setAuthForm({ ...authForm, username: e.target.value })}
          />
          <Input
            placeholder="Password"
            type="password"
            className="mb-2"
            value={authForm.password}
            onChange={e => setAuthForm({ ...authForm, password: e.target.value })}
          />
          <Button className="mb-2 w-full" onClick={authView === 'login' ? handleLogin : handleRegister}>
            {authView === 'login' ? 'Log In' : 'Register'}
          </Button>
        </>
      )}

      <div className="flex flex-col gap-2 mt-4">
        {authView !== 'login' && <Button variant="outline" onClick={() => setAuthView('login')}>Go to Login</Button>}
        {authView !== 'register' && <Button variant="outline" onClick={() => setAuthView('register')}>Go to Register</Button>}
        {authView !== 'guest' && <Button variant="ghost" onClick={handleGuest}>Continue as Guest</Button>}
      </div>
    </div>
  );
}
