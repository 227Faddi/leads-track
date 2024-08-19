import passport from 'passport';

export default {
  googleCallback: (req, res) => {
      res.redirect('/dashboard')
  },
  logout: (req, res, next) => {
    req.logout((error) => {
      if (error) {return next(error)}
      res.redirect('/')
    })
  }
}