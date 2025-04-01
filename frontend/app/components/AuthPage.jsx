import React from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

export default function AuthPage({
  authView,
  authForm,
  setAuthForm,
  handleLogin,
  handleRegister,
  handleGuest,
  setAuthView,
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 to-purple-300 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          {authView === 'login'
            ? 'Log In'
            : authView === 'register'
            ? 'Register'
            : 'Continue as Guest'}
        </h1>

        {(authView === 'login' || authView === 'register') && (
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              authView === 'login' ? handleLogin() : handleRegister();
            }}
          >
            <Input
              placeholder="Username"
              value={authForm.username}
              onChange={(e) =>
                setAuthForm({ ...authForm, username: e.target.value })
              }
            />

            <Input
              placeholder="Password"
              type="password"
              value={authForm.password}
              onChange={(e) =>
                setAuthForm({ ...authForm, password: e.target.value })
              }
            />

            {authView === 'register' && (
              <Input
                placeholder="Email"
                type="email"
                value={authForm.email}
                onChange={(e) =>
                  setAuthForm({ ...authForm, email: e.target.value })
                }
              />
            )}

            <Button className="w-full" type="submit">
              {authView === 'login' ? 'Log In' : 'Register'}
            </Button>
          </form>
        )}

        <div className="flex flex-col gap-2 mt-6">
          {authView !== 'login' && (
            <Button variant="outline" onClick={() => setAuthView('login')}>
              Go to Login
            </Button>
          )}
          {authView !== 'register' && (
            <Button variant="outline" onClick={() => setAuthView('register')}>
              Go to Register
            </Button>
          )}
          {authView !== 'guest' && (
            <Button variant="ghost" onClick={handleGuest}>
              Continue as Guest
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
