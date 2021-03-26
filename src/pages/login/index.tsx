import React from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router'

export default function Login() {
  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      email: 'admin@admin.com',
      password: '123456',
    },
  })
  const history = useHistory()
  const onSubmit = (data) => {
    console.log(data)
    history.push('/editor')
  }
  console.log(errors)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-indigo-500 flex justify-center items-center">
      <div className="mx-auto w-full max-w-sm bg-white p-10 shadow-lg">
        <h2 className="mt-2 text-3xl leading-9 font-extrabold text-gray-900">
          Sign in to your account
        </h2>

        <div className="mt-8">
          <div className="mt-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className="block text-sm font-medium leading-5 text-gray-700">
                  Email
                </label>
                <div className="mt-1">
                  <input
                    name="email"
                    type="text"
                    ref={register({
                      required: true,
                      pattern: new RegExp('.+@.+..+'),
                    })}
                  />
                </div>
              </div>
              {errors.email?.type === 'required' && (
                <div className="mt-1 text-red-600">Email is required</div>
              )}
              {errors.email?.type === 'pattern' && (
                <div className="mt-1 text-red-600">Email error</div>
              )}

              <div className="mt-6">
                <label className="block text-sm font-medium leading-5 text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    name="password"
                    type="password"
                    ref={register({
                      required: true,
                      minLength: 6,
                      maxLength: 20,
                    })}
                  />
                </div>
              </div>
              {errors.password && (
                <div className="mt-1 text-red-600">Password is required</div>
              )}

              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    name="remember_me"
                    type="checkbox"
                    ref={register}
                    className=""
                  />
                  <label
                    htmlFor="remember_me"
                    className="ml-2 block text-sm leading-5 text-gray-900"
                  >
                    Remember me
                  </label>
                </div>

                <div className="text-sm leading-5">
                  <a
                    href="#"
                    className="font-medium text-indigo-600 hover:text-indigo-600 focus:outline-none focus:underline transition ease-in-out duration-150"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div className="mt-6">
                <button type="submit" className="btn w-full btn-primary btn-lg">
                  Sign in
                </button>
              </div>

              <div className="mt-6">
                <button type="button" className="btn w-full btn-lg">
                  Create account
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
