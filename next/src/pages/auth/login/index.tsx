import React from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const Login = () => {
  return (
    <div className="flex items-center min-h-screen px-4 bg-gradient-to-br from-[#F472B6] to-[#F9A8D4]">
      <div className="w-full max-w-md mx-auto space-y-4 bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold text-pink-600 dark:text-pink-400">
            ログイン
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            アカウントにログインするには、以下にメールアドレスを入力してください
          </p>
        </div>
        <form className="space-y-4">
          <div className="space-y-2">
            <Label className="text-pink-600 dark:text-pink-400" htmlFor="email">
              メールアドレス
            </Label>
            <Input
              className="w-full"
              id="email"
              placeholder="m@example.com"
              required
              type="email"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center">
              <Label
                className="text-pink-600 dark:text-pink-400"
                htmlFor="password"
              >
                パスワード
              </Label>
              <Link
                className="ml-auto inline-block text-sm underline text-pink-600 dark:text-pink-400"
                href="#"
              >
                パスワードをお忘れですか？
              </Link>
            </div>
            <Input className="w-full" id="password" required type="password" />
          </div>
          <Button
            className="w-full bg-pink-600 text-white dark:bg-pink-400 dark:text-gray-900"
            type="submit"
          >
            ログイン
          </Button>
          <Button
            className="w-full border border-pink-600 text-pink-600 dark:border-pink-400 dark:text-pink-400"
            variant="outline"
          >
            Googleでログイン
          </Button>
        </form>
        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          アカウントをお持ちでないですか？
          <Link className="underline text-pink-600 dark:text-pink-400" href="#">
            サインアップ
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login
