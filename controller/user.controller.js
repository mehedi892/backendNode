const users = require('../data.json');

const getAllUsers = (req,res)=>{

    const {limit} = req.query;

    const limitUser = users.slice(0,limit)

     if(limit){
        res.json({
            message: 'limit',
            data:limitUser
        });
     }else{
        res.json({
            message: 'Success',
            data:users,
        });
     }
    
}


const randomUser = (req,res) =>{
    const ranNum = parseInt(Math.random()*users.length +1);
   const randomAUser = users.find(user => user.id === ranNum);

    res.status(206).json({
        message: 'Random User',
        data: randomAUser
    })

}


const postAUser =(req,res)=>{
   
    const id = req.body.id;
    const name = req.body.name;
    const contact = req.body.contact;
    const gender = req.body.gender;
    const photoUrl = req.body.photoUrl;
    const address = req.body.address;

    console.log(id,name,contact,gender,photoUrl,address);

    if(id && name && contact && gender && photoUrl && address){
        users.push(req.body);
        res.status(201).json({
            message:'successfully created',
            data: users
        })
    }else{
        res.status(406).json({
            message:'Some data is missing'
        })
    }
}

const updateAUser = (req,res)=>{
   const {_id} = req.params;

   const findUser = users.find(user => user.id === parseInt(_id));
   if(findUser){
    findUser.name = req.body.name ? req.body.name : findUser.name;
   findUser.contact = req.body.contact ? req.body.contact : findUser.contact;
   findUser.gender = req.body.gender ? req.body.gender : findUser.gender;
   findUser.photoUrl = req.body.photoUrl ? req.body.photoUrl : findUser.photoUrl;
   findUser.address = req.body.address ? req.body.address : findUser.address;

   
   
    res.status(201).json({
        message: `Successfully update id ${_id}`,
        data: users
    })
   }else{
    res.status(404).json({
        message: `No user found for ID: ${_id}`,
       
    })
   }
   
}


const deleteAUser = (req,res) =>{

    const {_id} = req.params;

    const isExist = users.find(user => user.id == _id)

    if(isExist){
        const restUsers = users.filter(user => user.id != _id);
        res.status(200).json({
            message: `User deleted successfully ID: ${_id}`,
            data: restUsers
           
        })
    }else{
        res.status(404).json({
            message: `No user found for ID: ${_id}`,
           
        })
    }
   
    
}

const bulkUpdate = (req,res)=>{
    const ids = req.body.ids;
    const updateData = req.body.updateData;

     ids.map(id =>{
       users.filter(user => user.id == id).map(user => {
        user.name = updateData.name ? updateData.name : user.name;
        user.contact = updateData.contact ? updateData.contact : user.contact;
        user.address = updateData.address ? updateData.address : user.address;
        user.gender = updateData.gender ? updateData.gender : user.gender;
        user.photoUrl = updateData.photoUrl ? updateData.photoUrl : user.photoUrl;
       }
        
       );
        
       
        //console.log(users)
    });
    
    res.status(200).json({
        message: `Updated data for ${ids}`,
        data: users
       
    })
}

module.exports = {
    getAllUsers,
    randomUser,
    postAUser,
    updateAUser,
    deleteAUser,
    bulkUpdate
    
}