'use client'
import { useState, FormEvent } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function LoginForm() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const params = useSearchParams()
  const from = params.get('from') ?? '/dashboard'

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(false)

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })

    if (res.ok) {
      router.push(from)
    } else {
      setError(true)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm w-full max-w-sm p-8">
        <div className="mb-8">
          <div className="w-10 h-10 bg-green-700 rounded-xl flex items-center justify-center mb-4">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M3 10h14M10 3l7 7-7 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1 className="text-lg font-semibold text-gray-900">Clear Line Signs</h1>
          <p className="text-sm text-gray-400 mt-1">Shop management — internal access only</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-gray-500 mb-1.5 block">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter password"
              autoFocus
              required
              className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 transition-colors ${
                error ? 'border-red-300 bg-red-50' : 'border-gray-200'
              }`}
            />
            {error && <p className="text-xs text-red-500 mt-1.5">Incorrect password</p>}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-700 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-green-800 transition-colors disabled:opacity-60"
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  )
}
