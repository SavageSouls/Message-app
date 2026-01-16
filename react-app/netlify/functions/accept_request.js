import { Pool } from '@neondatabase/serverless';
var pool = new Pool( { connectionString: process.env.DATABASE_URL } );

export default async function acceptRequest (req, res) {
    const headers = { "Content-Type": "application/json" };
    
    if (req.method !== 'POST') {
        return new Response(JSON.stringify({ error: "Method Not Allowed" }), { status: 405, headers: headers  });
    }

    const reqBody = await req.json();
    const relationshipId = +reqBody.relationshipId;
    const userId = + reqBody.userId;

    if (!relationshipId || !userId) {
        return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400, headers: headers });
    }

    try {
        const result = await pool.query(
            `
                UPDATE relationships
                SET accepted = true,
                    accepted_at = now()
                WHERE id = $1
                    AND addressee_id = $2
                    AND accepted = false
                RETURNING id
            `,
            [relationshipId, userId]
        );

        if (result.rowCount === 0) {
            return new Response(
                JSON.stringify( { error: 'No request found' } ),
                {
                    status: 404,
                    headers: headers
                }
            );
        }

        return new Response(
            JSON.stringify( { success: true } ),
            {
                status: 200,
                headers: headers
            }
        );
    } catch (err) {
        return new Response(
            JSON.stringify( { error: 'Internal Server Error' } ),
            {
                status: 500,
                headers: headers
            }
        );
    }
}