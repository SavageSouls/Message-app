import { Pool } from "@neondatabase/serverless";
var pool = new Pool({ connectionString: process.env.DATABASE_URL });

export default async function search(req, res) {
    const headers = { "Content-Type": "application/json" };

    if (req.method !== "GET") {
        return new Response("Method Not Allowed", { status: 405 });
    } else {
        const url = new URL(req.url);
        const searchText = url.searchParams.get("q");
        const userId = url.searchParams.get("userId");

        if (!searchText || searchText.length < 2 || !userId) {
            return new Response(JSON.stringify([]), {
                status: 200,
                headers: headers
            });
        }

        try {
            const like = `%${searchText}%`;

            const result = await pool.query(
                `
                    SELECT
                        u.user_id,
                        u.username,
                        u.full_name,
                        u.email,

                        r.accepted,
                        r.requester_id,
                        r.addressee_id

                        FROM users u
                        LEFT JOIN relationships r
                            ON (
                                (r.requester_id = $2 AND r.addressee_id = u.user_id)
                                OR
                                (r.addressee_id = $2 AND r.requester_id = u.user_id)
                            )

                        WHERE
                            u.user_id <> $2
                            AND (u.username ILIKE $1 OR u.full_name ILIKE $1 OR u.email ILIKE $1)

                        ORDER BY u.username
                        LIMIT 20
                `,
                [like, userId]
            );

            return new Response(JSON.stringify(result.rows), {
                status: 200,
                headers: headers,
            });
        } catch (err) {
            return new Response(
                JSON.stringify({ error: "Internal Server Error" }),
                { status: 500, headers: headers }
            );
        }
    }
}