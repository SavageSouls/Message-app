import { Pool } from '@neondatabase/serverless';
var pool = new Pool( { connectionString: process.env.DATABASE_URL } );

export default async function addFriend(req, res) {
    const headers = { "Content-Type": "application/json" };

    if (req.method !== 'POST') {
        return new Response(JSON.stringify({ error: "Method Not Allowed" }), { status: 405, headers: headers  });
    } else {
        const reqBody = await req.json();
        const requesterId = +reqBody.requesterId;
        const addresseeId = +reqBody.addresseeId;

        if (!requesterId || !addresseeId) {
            return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400, headers: headers });
        }

        if (requesterId === addresseeId) {
            return new Response(JSON.stringify({ error: "Improper relationship" }), { status: 400, headers: headers });
        }

        const existingRelationship = await pool.query(
            `
                SELECT id, accepted, requester_id, addressee_id
                FROM relationships
                WHERE (requester_id = $1 AND addressee_id = $2)
                    OR (requester_id = $2 AND addressee_id = $1)
                LIMIT 1
            `,
            [requesterId, addresseeId]
        );

        if (existingRelationship.rowCount > 0) {
            return new Response(
                JSON.stringify( { error: 'This connection already exists.' } ),
                {
                    status: 409,
                    headers: headers
                }
            )
        }

        try {
            const inserted = await pool.query(
                `
                    INSERT INTO relationships (requester_id, addressee_id, accepted)
                    VALUES ($1, $2, false)
                    RETURNING id, requester_id, addressee_id, accepted, created_at
                `,
                [requesterId, addresseeId]
            );

            return new Response(
                JSON.stringify(inserted.rows[0]),
                {
                    status: 201,
                    headers: headers
                }
            );

        } catch (err) {
            return new Response(
                JSON.stringify( {error: 'Internal Server Error'} ),
                {
                    status: 500,
                    headers: headers
                }
            );
        }
    }
}