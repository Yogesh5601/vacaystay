"use client"

import type React from "react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, ArrowRight, Eye, EyeOff, Loader } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import useRedirectIfAuthenticated from "@/lib/useRedirectIfAuthenticated"

export default function SignUpPage() {

  useRedirectIfAuthenticated();
  
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      await axios.post("/api/sign-up", {
        email,
        password,
        name
      })

      // Redirect to login after successful signup
      router.push("/login")
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Sign up failed")
      } else {
        setError(err instanceof Error ? err.message : "An error occurred")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-amber-50 p-4">
      {/* Vacation-themed background elements */}
      <div className="fixed inset-0 overflow-hidden opacity-10">
        <img
          src="data:image/svg+xml;charset=UTF-8,<?xml version='1.0' encoding='UTF-8'?><svg version='1.1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 100'><text x='10' y='60' font-family='Arial, sans-serif' font-size='48' font-weight='bold' fill='%232D9CDB'>Vaca</text><text x='140' y='60' font-family='Arial, sans-serif' font-size='48' font-weight='bold' fill='%23F2994A'>Stay</text><path d='M50 40 L70 20 L90 40' stroke='%232D9CDB' stroke-width='5' fill='none'/><rect x='55' y='40' width='30' height='20' fill='%23F2994A' stroke='%232D9CDB' stroke-width='3'/></svg>"
          alt="Vacation pattern"
          className="object-cover w-full h-full"
        />
      </div>


      <Card className="w-full max-w-md shadow-xl border-slate-200 relative z-10 bg-white/90 backdrop-blur-sm">
        <CardHeader className="space-y-1">
        
          <CardTitle className="text-2xl font-bold text-center">
            Welcome to Paradise Stays
          </CardTitle>
          <CardDescription className="text-center text-slate-500">
            Join us to discover your dream vacation rentals
          </CardDescription>
        </CardHeader>

        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-slate-600">
                Full Name
              </Label>
              <Input
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="border-slate-300"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-600">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-slate-300"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-slate-600">
                  Password
                </Label>
                <Link href="/forgot-password" className="text-xs hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className=" border-slate-300 pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-slate-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-slate-500" />
                  )}
                </Button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full mt-6 text-white"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                <>
                  Start Your Journey
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex justify-center border-t border-slate-200 p-6">
          <p className="text-sm text-slate-600">
            Already have an account?{" "}
            <Link href="/login" className="font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>

    </div>
  )
}