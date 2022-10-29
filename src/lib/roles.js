const roladmin = (permissions) =>{
   
    return (req,res,next) => {
        const UserRole =  req.user.role
        console.log(UserRole)

        if(permissions.includes(UserRole)){

            next()
        }else{
               
            return res.redirect('/logout');
        } 
    }

}

const roldoc = (permissions1) =>{
    
    return (req,res,next) => {
        const UserRole1 = req.user.role
     

        if(permissions1.includes(UserRole1)){

            next()
        }else{

            return res.redirect('/logout');
        }
    }
    
}


const roluser = (permissions2) =>{
   
    return (req,res,next) => {
        const UserRole2 = req.user.role

        if(permissions2.includes(UserRole2)){

            next()
        }else{

            return res.redirect('/logout');
        }
    }
    
}

module.exports = {roladmin,roldoc,roluser};