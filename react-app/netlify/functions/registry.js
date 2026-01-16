import bcrypt from 'bcrypt';

import { Pool } from '@neondatabase/serverless';
var pool = new Pool( { connectionString: process.env.DATABASE_URL } );

async function existingEmailCheck(email) {
    const result = await pool.query('SELECT email FROM users WHERE email = $1', [email]);
    const user = result.rows[0];
    if (user) return true;
    else return false;
}

async function existingUsernameCheck(username) {
    const result = await pool.query('SELECT username FROM users WHERE username = $1', [username]);
    const user = result.rows[0];
    if (user) return true;
    else return false;
}

export default async function registryHandler (req, res) {
    if (req.method !== 'POST') {
        return new Response(JSON.stringify({ error: "Method Not Allowed" }), { status: 405 });
    } else {
        const reqBody = await req.json();
        const username = reqBody?.username;
        const email = reqBody?.email;
        const password = reqBody?.password;
        const fullName = reqBody?.fullName;
        const type = reqBody?.type;
        
       if (!username || !email || !password || !fullName || !type) {
            return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
        } else {
            const existingEmail = await existingEmailCheck(email);
            const existingUsername = await existingUsernameCheck(username);

            if (existingEmail && existingUsername) {
                return new Response(JSON.stringify({ error: "User with this email and username already exists" }), { status: 409 });
            }
            
            else if (existingUsername) {
                return new Response(JSON.stringify({ error: "User with this username already exists" }), { status: 409 });
            }

            else if (existingEmail) {
                return new Response(JSON.stringify({ error: "User with this email already exists" }), { status: 409 });
            }

            else {

                const password_hash = await bcrypt.hash(password, 12);

                try {
                    const insertQuery = 'INSERT INTO users (username, email, password_hash, full_name, type) VALUES ($1, $2, $3, $4, $5)';
                    await pool.query(insertQuery, [username, email, password_hash, fullName, type]);
                    return new Response(JSON.stringify({ message: 'User registered successfully' }), { status: 201 });
                } catch (error) {
                    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
                }
            }
        }
    }
}