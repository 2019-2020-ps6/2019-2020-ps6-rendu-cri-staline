const { Theme } = require('../../models')

const buildTheme= (themeId) => {
  const theme = Theme.getById(themeId)
  return theme
}


const buildThemes = () => {
  const themes = Theme.get()
  return themes.map((theme) => buildTheme(theme.id))
}

module.exports = {
  buildTheme,
  buildThemes,
}
