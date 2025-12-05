import { sql } from '@vercel/postgres';

export { sql };

// Database connection helper
export async function query<T = any>(
  text: string,
  params?: any[]
): Promise<T[]> {
  try {
    const result = await sql.query(text, params);
    return result.rows as T[];
  } catch (error) {
    console.error('Database query error:', error);
    throw new Error('Failed to execute database query');
  }
}

// Type-safe query builder
export const db = {
  beneficiaries: {
    async findMany(options?: {
      where?: Record<string, any>;
      skip?: number;
      take?: number;
    }) {
      const { where, skip = 0, take = 10 } = options || {};
      
      let queryText = 'SELECT * FROM beneficiaries';
      const params: any[] = [];
      
      if (where) {
        const conditions: string[] = [];
        Object.entries(where).forEach(([key, value], index) => {
          conditions.push(`${key} = $${index + 1}`);
          params.push(value);
        });
        
        if (conditions.length > 0) {
          queryText += ` WHERE ${conditions.join(' AND ')}`;
        }
      }
      
      queryText += ` LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
      params.push(take, skip);
      
      return query(queryText, params);
    },
    
    async findById(id: string) {
      const result = await query(
        'SELECT * FROM beneficiaries WHERE id = $1',
        [id]
      );
      return result[0] || null;
    },
    
    async count(where?: Record<string, any>) {
      let queryText = 'SELECT COUNT(*) FROM beneficiaries';
      const params: any[] = [];
      
      if (where) {
        const conditions: string[] = [];
        Object.entries(where).forEach(([key, value], index) => {
          conditions.push(`${key} = $${index + 1}`);
          params.push(value);
        });
        
        if (conditions.length > 0) {
          queryText += ` WHERE ${conditions.join(' AND ')}`;
        }
      }
      
      const result = await query<{ count: string }>(queryText, params);
      return parseInt(result[0]?.count || '0');
    },
  },
  
  fraudCases: {
    async findMany(options?: {
      where?: Record<string, any>;
      skip?: number;
      take?: number;
    }) {
      const { where, skip = 0, take = 10 } = options || {};
      
      let queryText = 'SELECT * FROM fraud_cases';
      const params: any[] = [];
      
      if (where) {
        const conditions: string[] = [];
        Object.entries(where).forEach(([key, value], index) => {
          conditions.push(`${key} = $${index + 1}`);
          params.push(value);
        });
        
        if (conditions.length > 0) {
          queryText += ` WHERE ${conditions.join(' AND ')}`;
        }
      }
      
      queryText += ` ORDER BY detected_at DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
      params.push(take, skip);
      
      return query(queryText, params);
    },
  },
  
  auditLogs: {
    async create(data: {
      userId: string;
      action: string;
      resource: string;
      resourceId: string;
      details: string;
      ipAddress: string;
      severity: string;
    }) {
      const result = await query(
        `INSERT INTO audit_logs 
         (user_id, action, resource, resource_id, details, ip_address, severity, timestamp)
         VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
         RETURNING *`,
        [
          data.userId,
          data.action,
          data.resource,
          data.resourceId,
          data.details,
          data.ipAddress,
          data.severity,
        ]
      );
      return result[0];
    },
    
    async findMany(options?: {
      where?: Record<string, any>;
      skip?: number;
      take?: number;
    }) {
      const { where, skip = 0, take = 50 } = options || {};
      
      let queryText = 'SELECT * FROM audit_logs';
      const params: any[] = [];
      
      if (where) {
        const conditions: string[] = [];
        Object.entries(where).forEach(([key, value], index) => {
          conditions.push(`${key} = $${index + 1}`);
          params.push(value);
        });
        
        if (conditions.length > 0) {
          queryText += ` WHERE ${conditions.join(' AND ')}`;
        }
      }
      
      queryText += ` ORDER BY timestamp DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
      params.push(take, skip);
      
      return query(queryText, params);
    },
  },
};
