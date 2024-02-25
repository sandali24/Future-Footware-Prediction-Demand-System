const bcrypt = require('bcrypt');
const { db } = require('../db'); // Adjust the path to your database connection file
const {addUser} = require('./User')

const username = 'user1'; // Set the desired username
const plainPassword = 'admin'; // Set the desired password

const saltRounds = 10; // Number of salt rounds for bcrypt hashing

// Hash the password
// console.log("line")
// bcrypt.hash(plainPassword, saltRounds, async (err, hash) => {
//     if (err) {
//         // Handle the error
//         console.error(err);
//     } else {
//         try {
//             // Insert the user into the database with the hashed password
//             const insertQuery = 'INSERT INTO users (username, password) VALUES (?, ?)';
//             await db.query(insertQuery, [username, hash]);
//             console.log('User inserted successfully.');
//         } catch (dbError) {
//             console.error('Database error:', dbError);
//         }
//     }
// });  
// const add = async () => {
//     const insertQuery = 'INSERT INTO users (username, password) VALUES (?, ?)';
//     const hashedPassword = bcrypt.hashSync(plainPassword, saltRounds);
//     try{
//         await new Promise((resolve, reject) => {
//             db.query(insertQuery, [username, hashedPassword], (err, res) = {
//                 if(err) {
//                     reject(err)
//                 }else{
//                     resolve(res)
//                 }
//             })
//         })
//         console.log('user added')
//     }catch(err){

//     }
    
// }

exports.admin = async () => {
    try {
        const query = "SELECT * FROM users where username = ?";
        db.query(query, username, (err, res) => {
            if (err) {
                console.log(err)
            } else{
                add()
            }
        })
    } catch (err) {
        console.log(err)
    }
}

