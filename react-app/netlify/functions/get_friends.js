import { Pool } from '@neondatabase/serverless';
var pool = new Pool( { connectionString: process.env.DATABASE_URL } );

export default async function getFriends (req, res) {
    const headers = { "Content-Type": "application/json" };
    
    if (req.method !== 'GET') {
        return new Response(JSON.stringify({ error: "Method Not Allowed" }), { status: 405, headers: headers  });
    }

    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");

    if (!userId) {
        return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400, headers: headers });
    }

    try {
        const result = await pool.query(
            `
                SELECT
                    u.user_id,
                    u.username,
                    u.full_name
                FROM relationships r
                JOIN users u
                    ON (
                            (r.requester_id = $1 AND u.user_id = r.addressee_id)
                        OR 
                            (r.addressee_id = $1 AND u.user_id = r.requester_id)
                    )
                WHERE r.accepted = true
                ORDER BY r.accepted_at
            `
            , [userId]
        );

        return new Response(
            JSON.stringify(result.rows),
            {
                status: 200,
                headers: headers
            }
        );
    } catch(err) {
        return new Response(
            JSON.stringify( { error: 'Internal Server Error' } ),
            {
                status: 500,
                headers: headers
            }
        );
    }
}