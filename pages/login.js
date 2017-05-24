export default () => (
  <div>
    <h1>Login</h1>

    <form action='/login' method='POST'>
      <input type='email' name='email' placeholder='email' />
      <input type='password' name='password' placeholder='password' />
      <button>Login</button>
    </form>
  </div>
)
