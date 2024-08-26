const createAuthState = (set) => ({
  userInfo: null,
  setUserInfo: (userInfo) => set({ userInfo }),});

export default createAuthState;