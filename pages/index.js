import React from 'react';
import Link from 'next/link';
import cookies from 'next-cookies'
import Arena from '../services/arena';

const Index = ({ user }) => (
  <div className='Index'>
    <p>
      <Link prefetch href='/login'>
        <a>Login</a>
      </Link>
    </p>

    {user &&
      <p>
        Hello, {user.username}.
        &nbsp;
        <a href='/logout'>Logout</a>
      </p>
    }
  </div>
);

Index.getInitialProps = async function(ctx) {
  const { token } = cookies(ctx);

  const account = await Arena.get('accounts', {}, { 'X-AUTH-TOKEN': token });

  return {
    user: account.user
  }
}

export default Index;
