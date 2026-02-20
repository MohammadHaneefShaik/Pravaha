/*import jwt from "jsonwebtoken";

const { sign, verify } = jwt;
const secretKey = 'Sandeep20@06';

function setUser(user) {
    return sign({
        _id: user._id,
        userName: user.userName,
    }, secretKey);
}

function getUser(token) {
    if (!token) {
        return null;
    } else {
        const user = verify(token, secretKey);
        return user;
    }
}

export default {
    setUser,
    getUser,
}; 
*/
import jwt from "jsonwebtoken";

const secretKey = "Sandeep20@06";

// CREATE TOKEN
function setUser(user) {
  return jwt.sign(
    {
      email: user.email,
      role: user.role,         // super | event
      eventName: user.eventName, // null or event name
    },
    secretKey,
    { expiresIn: "1d" }
  );
}

// VERIFY TOKEN
function getUser(token) {
  try {
    return jwt.verify(token, secretKey);
  } catch (err) {
    return null;
  }
}

export default {
  setUser,
  getUser,
};
