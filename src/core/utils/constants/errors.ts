const ERROR_MESSAGES: Record<string, string> = {
  'auth/invalid-email': 'Enter valid email please',
  'auth/user-not-found': 'User with this email not found',
  'auth/wrong-password': 'Wrong password, try again',
  'auth/weak-password':
      'Password is too weak, it should be at least 6 characters',
  'auth/email-already-in-use': 'This email is already taken',
  default: 'Something went wrong :C',
} as const;

export default ERROR_MESSAGES;
