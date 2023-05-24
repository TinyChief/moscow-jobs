import Mock from "../mock";
import * as jose from "jose";

const alg = "HS256";
// const JWT_SECRET = "jwt_secret_key";
const JWT_SECRET = new TextEncoder().encode("jwt_secret_key");
const JWT_VALIDITY = "7 days";

const userList = [
  {
    id: 1,
    role: "SA",
    name: "Jason Alexander",
    username: "jason_alexander",
    email: "jason@ui-lib.com",
    avatar: "/assets/images/face-6.jpg",
    age: 25,
  },
];

Mock.onPost("/api/auth/login").reply(async (config) => {
  try {
    const { email } = JSON.parse(config.data);
    const user = userList.find((u) => u.email === email);

    if (!user) return [400, { message: "Invalid email or password" }];
    const accessToken = await new jose.SignJWT({ userId: user.id })
      .setProtectedHeader({ alg })
      .setExpirationTime(JWT_VALIDITY)
      .sign(JWT_SECRET);
    // , {
    //   expiresIn: JWT_VALIDITY,
    // });

    const payload = { user: userList[0], accessToken };
    return [200, payload];
  } catch (err) {
    console.error(err);
    return [500, { message: "Internal server error" }];
  }
});

Mock.onPost("/registration").reply((config) => {
  try {
    const userData = JSON.parse(config.data);
    const user = userList.find((u) => u.email === userData.email);

    if (user)
      return [
        400,
        {
          email: [
            "пользователь с таким адрес электронной почты уже существует.",
          ],
        },
      ];

    const newUser = {
      id: 2,
      ...userData
    };

    userList.push(newUser);

    return [200, newUser];
  } catch (err) {
    console.error(err);
    return [500, { message: "Internal server error" }];
  }
});

Mock.onGet("/api/auth/profile").reply(async (config) => {
  try {
    const { Authorization } = config.headers;
    if (!Authorization) {
      return [401, { message: "Invalid Authorization token" }];
    }

    const accessToken = Authorization.split(" ")[1];
    const { payload: verifyResult } = await jose.jwtVerify(
      accessToken,
      JWT_SECRET
    );
    const user = userList.find((u) => u.id === verifyResult.userId);

    if (!user) {
      return [401, { message: "Invalid authorization token" }];
    }

    const payload = { user: userList[0] };
    return [200, payload];
  } catch (err) {
    console.error(err);
    return [500, { message: "Internal server error" }];
  }
});
