module.exports = {

    isLoggedIn(req,res,next){

         /* console.log(req.user) */
        if(req.isAuthenticated()){

            return next()


        }

        return res.redirect('/');
    },


    isNotLoggedIn(req,res,next){

        if(!req.isAuthenticated()){

            return next()


        }

        return res.redirect('/profile');
    }
};