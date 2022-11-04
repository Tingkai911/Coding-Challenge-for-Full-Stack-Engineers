import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const users = [
    {
        name: "Admin User",
        email: "admin@example.com",
        password: bcrypt.hashSync(process.env.TEST_PASSWORD, 10),
        isAdmin: true,
    },
    {
        name: "John Doe",
        email: "john@example.com",
        password: bcrypt.hashSync(process.env.TEST_PASSWORD, 10),
    },
    {
        name: "Jane Doe",
        email: "jane@example.com",
        password: bcrypt.hashSync(process.env.TEST_PASSWORD, 10),
    },
];

export default users;
