import Pages from 'gh-pages'

Pages.publish('dist', {
  dotfiles: true
}, (err) => {
  console.log(err || 'Published')
})
