export default function ({ $axios, redirect, app, store }) {
  $axios.onError(async (error) => {
    // console.log(error)
    if (error.response) {
      if (error.response.status === 401) {
        await app.$auth.logout()
      }
      if (error.response.status === 419) {
        redirect({
          name: 'auth-signin',
        })
      }
      if (error.response.status === 500) {
        // redirect('/sorry')
        // app.notifyError({ title: 'Server error', text: 'There is a server internal error' })
      }
    }
  })
}
