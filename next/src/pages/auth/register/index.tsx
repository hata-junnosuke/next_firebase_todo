import React from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { auth } from '../../../../firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'next/navigation'

type Inputs = {
  email: string
  password: string
}

const Register = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit = async (data: Inputs) => {
    await createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(() => {
        router.push('/auth/login')
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          alert('そのメールアドレスは既に使用されています')
        } else {
          alert(error.message)
        }
      })
  }

  return (
    <div className="flex items-center min-h-screen px-4 bg-gradient-to-br from-[#F472B6] to-[#F9A8D4]">
      <div className="w-full max-w-md mx-auto space-y-4 bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold text-pink-600 dark:text-pink-400">
            新規登録
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            アカウントを新規登録するには、
            <br />
            以下にメールアドレスを入力してください
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label className="text-pink-600 dark:text-pink-400" htmlFor="email">
              メールアドレス
            </Label>
            <Input
              {...register('email', {
                required: 'メールアドレスは必須です',
                pattern: {
                  value:
                    /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/,
                  message: '不適切なメールアドレスです。',
                },
              })}
              className="w-full"
              placeholder="todo@example.com"
              type="email"
            />
            {errors.email && (
              <span className="text-sm text-red-500 dark:text-red-400">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="space-y-2">
            <div className="flex items-center">
              <Label
                className="text-pink-600 dark:text-pink-400"
                htmlFor="password"
              >
                パスワード
              </Label>
            </div>
            <Input
              {...register('password', {
                required: 'パスワードは必須です',
                minLength: {
                  value: 6,
                  message: 'パスワードは6文字以上である必要があります',
                },
              })}
              className="w-full"
              type="password"
            />
            {errors.password && (
              <span className="text-sm text-red-500 dark:text-red-400">
                {errors.password.message}
              </span>
            )}
          </div>
          <Button
            className="w-full bg-pink-600 text-white dark:bg-pink-400 dark:text-gray-900"
            type="submit"
          >
            新規登録
          </Button>
          <Button
            className="w-full border border-pink-600 text-pink-600 dark:border-pink-400 dark:text-pink-400"
            variant="outline"
          >
            Googleで新規登録
          </Button>
        </form>
        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          アカウントをお持ちですか？
          <Link
            className="underline text-pink-600 dark:text-pink-400"
            href={'/auth/login'}
          >
            ログイン
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Register
