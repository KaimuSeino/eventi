import type { LocalizationResource } from '@clerk/types';

export const localization: LocalizationResource = {
  formFieldLabel__emailAddress: 'メールアドレス',
  formFieldLabel__password: 'パスワード',
  formFieldAction__forgotPassword: 'パスワードを忘れた',
  footerActionLink__useAnotherMethod: '他の方法でログイン',
  signUp: {
    start: {
      title: 'アカウントを作成',
      subtitle: 'Eventiのアカウントを作成しましょう',
      actionText: 'すでにアカウントをお持ちですか？',
      actionLink: 'サインイン',
    },
  },
  signIn: {
    start: {
      title: "サインイン",
      subtitle: "Eventiサインインしてください",
      actionText: "",
      actionLink: 'アカウント新規作成',
    },
    password: {
      title: 'パスワードを入力してください',
      subtitle: 'アカウントに関連付けられたパスワード',
      actionLink: '別の方法でログイン',
    },
    forgotPasswordAlternativeMethods: {
      title: 'Forgot Password',
      label__alternativeMethods: 'Or, sign in with another method',
      blockButton__resetPassword: 'Reset your password',
    },
  }
}