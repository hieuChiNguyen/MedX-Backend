import User from '../model/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const { Op } = require('sequelize');
const salt = bcrypt.genSaltSync(10);

// Encode raw password into hashed password
let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (error) {
            reject(error);
        }
    });
};

// check email is existed or not
let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await User.findOne({
                where: { email: userEmail }
            });
            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (error) {
            reject(error);
        }
    });
};

// check email or username or phone number is existed or not
let checkExistInformation = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await User.findOne({
                where: {
                    [Op.or]: [{ email: data.email }, { username: data.username }, { phone: data.phone }]
                }
            });
            if (user) {
                // Exist
                resolve(true);
            } else {
                // Not exist
                resolve(false);
            }
        } catch (error) {
            reject(error);
        }
    });
};

// Generate Access Token
let generateAccessToken = (user) => {
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
            username: user.username,
            roleId: user.roleId
        },
        process.env.JWT_ACCESS_KEY,
        { expiresIn: '1h' }
    );
};

// Sign in as a customer
let handleLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email);

            if (isExist) {
                // user exist
                let user = await User.findOne({
                    where: { email: email },
                    attributes: ['email', 'roleId', 'password', 'username', 'id'],
                    raw: true
                });

                if (user) {
                    // compare password
                    let checkPassword = bcrypt.compareSync(password, user.password);

                    if (checkPassword) {
                        // Access Token -> short-lived token
                        const accessToken = generateAccessToken(user);

                        userData.errCode = 0;
                        userData.message = 'OK';
                        delete user.password;
                        userData.data = user;
                        userData.data.accessToken = accessToken;
                    } else {
                        userData.errCode = 4;
                        userData.message = 'Wrong Password.';
                    }
                }
            } else {
                // user not found
                userData.errCode = 3;
                userData.message = 'This email is not existed.';
            }

            resolve(userData);
        } catch (error) {
            reject(error);
        }
    });
};

// return data of new customer account
let createNewUser = (userData) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!userData.email || !userData.username || !userData.password || !userData.phone) {
                resolve({
                    errCode: 1,
                    message: 'Chưa điền đủ thông tin người dùng.'
                });
            }

            // check user was already existed
            let checkExist = await checkExistInformation(userData);
            const phoneNumberRegex = /([\+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/;
            const isValidPhoneNumber = phoneNumberRegex.test(userData.phone);

            if (checkExist === true) {
                resolve({
                    errCode: 2,
                    message: 'Người dùng này đã tồn tại.'
                });
            } else {
                if (isValidPhoneNumber === false) {
                    resolve({
                        errCode: 3,
                        message: 'Số điện thoại không hợp lệ'
                    });
                } else {
                    let hashPasswordBcrypt = await hashUserPassword(userData.password);
                    let newUser = await User.create({
                        fullName: userData.fullName,
                        email: userData.email,
                        password: hashPasswordBcrypt,
                        address: userData.address,
                        username: userData.username,
                        phone: userData.phone,
                        gender: userData.gender,
                        role: 'R1'
                    });

                    if (newUser) {
                        resolve({
                            errCode: 0,
                            message: 'OK',
                            data: newUser
                        });
                    }
                }
            }
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    handleLogin,
    createNewUser,
    generateAccessToken
};
