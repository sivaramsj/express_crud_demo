const bcrypt=require('bcrypt');

async function hashPassword(){
    const salt = await bcrypt.genSalt(10);
    const hashed= await bcrypt.hash('siva',salt);
    console.log(salt);
    console.log(hashed);
}

hashPassword();