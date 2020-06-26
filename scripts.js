const facebookLoginButton = document.querySelector('.fb-login')
const facebookLogoutButton = document.querySelector('.fb-logout')
const userContainerDiv = document.querySelector('.user-container')
const userNameDiv = document.querySelector('.user-name')
const userEmailDiv = document.querySelector('.user-email')
const userPictureDiv = document.querySelector('.user-picture')

const appConfig = {
  appId: '298192371320320',
  autoLogAppEvents: true,
  xfbml: true,
  version: 'v7.0',
}

window.fbAsyncInit = () => {
  FB.init(appConfig)

  FB.getLoginStatus((response) => {
    facebookLoginButton.addEventListener('click', handleLogin)
    facebookLogoutButton.addEventListener('click', handleLogout)
    if (response.status === 'connected') {
      console.log('Status', response.status)
      FB.api('/me', { fields: 'name,email,picture.type(large)' }, (info) => {
        showUserInfo(info)
        toggleToLoggedIn()
      })
    }
  })
}

function handleLogin() {
  FB.login(
    (response) => {
      if (response.authResponse) {
        FB.api('/me', { fields: 'name,email,picture.type(large)' }, (info) => {
          showUserInfo(info)
          toggleToLoggedIn()
        })
      } else {
        console.log('Access denied', response)
      }
    },
    { scope: 'public_profile,email' }
  )
}

function handleLogout() {
  FB.logout((response) => {
    console.log('Logout', response)
    toggleToLoggedOut()
  })
}

function toggleToLoggedIn() {
  document.body.setAttribute('data-logged', true)
}

function toggleToLoggedOut() {
  document.body.setAttribute('data-logged', false)
}
toggleToLoggedOut()

function showUserInfo(info) {
  setUserName(info.name)
  setUserEmail(info.email)
  setUserPicture(info.picture)
}

function setUserName(name) {
  userNameDiv.innerText = name
}

function setUserEmail(email) {
  userEmailDiv.innerText = email
}

function setUserPicture(picture) {
  userPictureDiv.setAttribute('src', picture.data.url)
}
