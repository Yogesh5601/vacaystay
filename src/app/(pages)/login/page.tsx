"use client"

import type React from "react"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { Loader2, Eye, EyeOff, ArrowRight, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"
import useRedirectIfAuthenticated from "@/lib/useRedirectIfAuthenticated"

export default function LoginPage() {
  useRedirectIfAuthenticated()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const togglePasswordVisibility = () => setShowPassword(!showPassword)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const result = await signIn("credentials", { email, password, redirect: false })
      if (result?.error) throw new Error(result.error)
      router.push("/dashboard")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed")
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-100 w-full justify-center">

      <div className="flex flex-col justify-center w-full px-8 lg:px-16 xl:px-24 lg:w-1/2 xl:w-2/5">
        <div className="w-full max-w-md mx-auto space-y-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900">Welcome Back</h2>
            <p className="mt-2 text-gray-600">New here? <Link href="/sign-up" className="text-blue-600 hover:underline">Create an account</Link></p>
          </div>
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Card className="shadow-lg rounded-lg">
            <CardContent className="p-6">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center">
                      <Label htmlFor="password">Password</Label>
                      <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">Forgot password?</Link>
                    </div>
                    <div className="relative">
                      <Input id="password" type={showPassword ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
                      <button type="button" className="absolute inset-y-0 right-3 flex items-center text-gray-500" onClick={togglePasswordVisibility}>
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember-me" />
                  <Label htmlFor="remember-me">Remember me</Label>
                </div>
                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? (<><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Signing in...</>) : (<>Sign in <ArrowRight className="ml-2 h-5 w-5" /></>)}
                </Button>
              </form>
            </CardContent>
          </Card>

          <p className="text-xs text-center text-gray-500">By signing in, you agree to our <Link href="/terms" className="underline">Terms</Link> and <Link href="/privacy" className="underline">Privacy Policy</Link>.</p>
        </div>
      </div>
    </div>
  )
}
