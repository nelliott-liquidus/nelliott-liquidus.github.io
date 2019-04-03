export default class User {
  constructor() {



  }

  get default() {
    return {
      name: 'Username',
      role: 'none',
      recentBanners: [],
      favoritePresets: [],
      favoriteComponentPresests: [],
      mediaLibrary: []
    }
  }
}
