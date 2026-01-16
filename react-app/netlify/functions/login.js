import bcrypt from 'bcrypt';

import { Pool } from '@neondatabase/serverless';
var pool = new Pool( { connectionString: process.env.DATABASE_URL } );

async function getUserByEmail(email) {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];
    return user;
}

export default async function loginHandler (req, res) {
    if (req.method !== 'POST') {
        return new Response(JSON.stringify({ error: "Method Not Allowed" }), { status: 405 });
    } else {
        const reqBody = await req.json();
        const emailOrUsername = reqBody?.emailOrUsername;
        const password = reqBody?.password;
         if (!emailOrUsername || !password) {
            return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
        } else {
            let user;
            if (emailOrUsername.includes('@')) {
                user = await getUserByEmail(emailOrUsername);
            } else {
                const result = await pool.query('SELECT * FROM users WHERE username = $1', [emailOrUsername]);
                user = result.rows[0];
            }
            
            if (!user) {
                return new Response(JSON.stringify({ error: "Invalid email/username or password" }), { status: 401 });
            }
            
            const passwordMatch = await bcrypt.compare(password, user.password_hash);
            if (!passwordMatch) {
                return new Response(JSON.stringify({ error: "Invalid email/username or password" }), { status: 401 });
            }

            return new Response(JSON.stringify({ message: "Login successful", user: { id: user.user_id, username: user.username, email: user.email, fullName: user.full_name, type: user.type } }), { status: 200 });
        }
    }
}
       