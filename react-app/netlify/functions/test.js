import { Pool } from '@neondatabase/serverless';
var pool = new Pool( { connectionString: process.env.DATABASE_URL } );

export async function handler() {
  return {
    statusCode: 200,
    body: JSON.stringify({ ok: true }),
  };
}