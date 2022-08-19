import React from 'react';
import Link from 'next/link';

function SignupConfirmPage() {
  return (
    <div>
      SIGNUP SUCCESSFUL! <Link href="/profile">Go to profile</Link>{' '}
    </div>
  );
}

export default SignupConfirmPage;
