subscribe('SET_SESSION_ID', (state) => {
  if (state.sessionId)
    sessionStorage.setItem('sessionId', state.sessionId)
})
