import 'dotenv/config';
import express from 'express';
import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  port: 5432,
  password: 'aldi12345',
  database: 'hr-db',
});

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});

app.get('/region', (req, res) => {
  pool.query('SELECT * FROM regions', [], (error, result) => {
    if (error) {
      throw error;
    }
    res.json(result.rows);
  });
});

app.get('/region/:id', (req, res) => {
  const { id } = req.params;
  pool.query(
    'select * from regions where region_id = $1',
    [id],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.json(result.rows);
    }
  );
});

app.post('/region', (req, res) => {
  const { name } = req.body;
  pool.query(
    'insert into regions (region_name) values ($1)',
    [name],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.json(result.rowCount);
    }
  );
});

app.put('/region/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  pool.query(
    'update regions set region_name=$2 where region_id=$1',
    [id, name],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.json(result.rowCount);
    }
  );
});

app.delete('/region/:id', (req, res) => {
  const { id } = req.params;
  pool.query(
    `delete from regions where region_id = ${id}`,
    [],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.json(result.rowCount);
    }
  );
});

app.get('/countries', (req, res) => {
  pool.query(`SELECT * FROM countries`, [], (error, result) => {
    if (error) {
      throw error;
    }
    res.json(result.rows);
  });
});

app.get('/countries/:id', (req, res) => {
  const id = req.params.id;
  pool.query(
    `SELECT * FROM countries where country_id = $1`,
    [id],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.json(result.rows);
    }
  );
});

app.post(`/countries`, (req, res) => {
  const { country_id, country_name, region_id } = req.body;
  pool.query(
    `INSERT INTO countries values($1, $2, $3)`,
    [country_id, country_name, region_id],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.json(result.rowCount);
    }
  );
});

app.put('/countries/:id', (req, res) => {
  const id = req.params.id;
  const { country_id, country_name, region_id } = req.body;
  pool.query(
    `UPDATE countries SET
  country_id = $1,
  country_name = $2,
  region_id = $3
  WHERE country_id = $4`,
    [country_id, country_name, region_id, id],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.json(result.rowCount);
    }
  );
});

app.delete(`/countries/:id`, (req, res) => {
  const id = req.params.id;
  pool.query(
    `DELETE FROM countries WHERE country_id = $1`,
    [id],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.json(result.rowCount);
    }
  );
});

app.get(`/departments`, (req, res) => {
  pool.query(`SELECT * FROM departments`, [], (error, result) => {
    if (error) {
      throw error;
    }
    res.json(result.rows);
  });
});

app.get(`/departments/:id`, (req, res) => {
  const id = req.params.id;
  pool.query(
    `SELECT * FROM departments WHERE department_id = $1`,
    [id],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.json(result.rows);
    }
  );
});

app.post(`/departments`, (req, res) => {
  const { department_id, department_name, location_id, manager_id } = req.body;
  pool.query(
    `INSERT INTO departments (department_id, department_name, location_id, manager_id) VALUES($1, $2, $3, $4)`,
    [department_id, department_name, location_id, manager_id],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.json(result.rowCount);
    }
  );
});

app.put(`/departments/:id`, (req, res) => {
  const id = req.params.id;
  const { department_id, department_name, location_id, manager_id } = req.body;
  pool.query(
    `UPDATE departments SET
  department_id = $1,
  department_name = $2,
  location_id = $3,
  manager_id = $4
  WHERE department_id = $5`,
    [department_id, department_name, location_id, manager_id, id],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.json(result.rowCount);
    }
  );
});

app.delete(`/departments/:id`, (req, res) => {
  const id = req.params.id;
  pool.query(
    `DELETE FROM departments WHERE department_id = $1`,
    [id],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.json(result.rowCount);
    }
  );
});

app.get(`/employees`, (req, res) => {
  pool.query(`SELECT * FROM employees`, [], (error, result) => {
    if (error) {
      throw error;
    }
    res.json(result.rows);
  });
});

app.get(`/employees/:id`, (req, res) => {
  const id = req.params.id;
  pool.query(
    `SELECT * FROM employees WHERE employee_id = $1`,
    [id],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.json(result.rows);
    }
  );
});

app.post(`/employees`, (req, res) => {
  const {
    employee_id,
    first_name,
    last_name,
    email,
    phone_number,
    hire_date,
    salary,
    commission_pct,
    manager_id,
    department_id,
    job_id,
    xemp_id,
  } = req.body;

  pool.query(
    `INSERT INTO employees
    (employee_id,
    first_name,
    last_name,
    email,
    phone_number,
    hire_date,
    salary,
    commission_pct,
    manager_id,
    department_id,
    job_id,
    xemp_id) VALUES
    ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
    [
      employee_id,
      first_name,
      last_name,
      email,
      phone_number,
      hire_date,
      salary,
      commission_pct,
      manager_id,
      department_id,
      job_id,
      xemp_id,
    ],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.json(result.rowCount);
    }
  );
});

app.put(`/employees/:id`, (req, res) => {
  const id = req.params.id;
  const {
    first_name,
    last_name,
    email,
    phone_number,
    hire_date,
    salary,
    commission_pct,
    manager_id,
    department_id,
    job_id,
    xemp_id,
  } = req.body;

  pool.query(
    `UPDATE employees SET
    first_name = $1,
    last_name = $2,
    email = $3,
    phone_number = $4,
    hire_date = $5,
    salary = $6,
    commission_pct = $7,
    manager_id = $8,
    department_id = $9,
    job_id = $10,
    xemp_id = $11
    WHERE 
    employee_id = $12`,
    [
      first_name,
      last_name,
      email,
      phone_number,
      hire_date,
      salary,
      commission_pct,
      manager_id,
      department_id,
      job_id,
      xemp_id,
      id,
    ],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.json(result.rowCount);
    }
  );
});

app.delete(`/employees/:id`, (req, res) => {
  const id = req.params.id;
  pool.query(
    `DELETE FROM employees WHERE employee_id = $1`,
    [id],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.json(result.rowCount);
    }
  );
});

app.get(`/jobhistory`, (req, res) => {
  pool.query(`SELECT * FROM job_history`, [], (error, result) => {
    if (error) {
      throw error;
    }
    res.json(result.rows);
  });
});

app.get(`/jobhistory/:id`, (req, res) => {
  const id = req.params.id;
  pool.query(
    `SELECT * FROM job_history WHERE employee_id = $1`,
    [id],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.json(result.rows);
    }
  );
});

app.post(`/jobhistory`, (req, res) => {
  const { employee_id, start_date, end_date, job_id, department_id } = req.body;
  pool.query(
    `INSERT INTO job_history (employee_id, start_date, end_date, job_id, department_id) values ($1, $2, $3, $4, $5)`,
    [employee_id, start_date, end_date, job_id, department_id],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.json(result.rowCount);
    }
  );
});

app.put(`/jobhistory/:id`, (req, res) => {
  const id = req.params.id;
  const { start_date, end_date, job_id, department_id } = req.body;
  pool.query(
    `UPDATE job_history SET start_date = $2, end_date = $3, job_id = $4, department_id = $5 WHERE employee_id = $1`,
    [id, start_date, end_date, job_id, department_id],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.json(result.rowCount);
    }
  );
});

app.delete(`/jobhistory/:id`, (req, res) => {
  const id = req.params.id;
  pool.query(
    `DELETE FROM job_history WHERE employee_id = $1`,
    [id],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.json(result.rowCount);
    }
  );
});

app.get(`/jobs`, (req, res) => {
  pool.query(`SELECT * FROM jobs`, [], (error, result) => {
    if (error) {
      throw error;
    }
    res.json(result.rows);
  });
});

app.get(`/jobs/:id`, (req, res) => {
  const id = req.params.id;
  pool.query(`SELECT * FROM jobs WHERE job_id = $1`, [id], (error, result) => {
    if (error) {
      throw error;
    }
    res.json(result.rows);
  });
});

app.post(`/jobs`, (req, res) => {
  const { job_id, job_title, min_salary, max_salary } = req.body;
  pool.query(
    `INSERT INTO jobs (job_id, job_title, min_salary, max_salary) VALUES ($1, $2, $3, $4)`,
    [job_id, job_title, min_salary, max_salary],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.json(result.rowCount);
    }
  );
});

app.put(`/jobs/:id`, (req, res) => {
  const id = req.params.id;
  const { job_id, job_title, min_salary, max_salary } = req.body;
  pool.query(
    `UPDATE jobs SET job_id = $1, job_title = $2, min_salary = $3, max_salary = $4 WHERE job_id = $5`,
    [job_id, job_title, min_salary, max_salary, id],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.json(result.rowCount);
    }
  );
});

app.delete(`/jobs/:id`, (req, res) => {
  const id = req.params.id;
  pool.query(`DELETE FROM jobs WHERE job_id = $1`, [id], (error, result) => {
    if (error) {
      throw error;
    }
    res.json(result.rowCount);
  });
});

app.get(`/locations`, (req, res) => {
  pool.query(`SELECT * FROM locations`, [], (error, result) => {
    if (error) {
      throw error;
    }
    res.json(result.rows);
  });
});

app.get(`/locations/:id`, (req, res) => {
  const id = req.params.id;
  pool.query(
    `SELECT * FROM locations WHERE location_id = $1`,
    [id],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.json(result.rows);
    }
  );
});

app.post(`/locations`, (req, res) => {
  const {
    location_id,
    street_address,
    postal_code,
    city,
    state_province,
    country_id,
  } = req.body;
  pool.query(
    `INSERT INTO locations (location_id, street_address, postal_code, city, state_province, country_id)
    VALUES ($1, $2, $3, $4, $5, $6)`,
    [
      location_id,
      street_address,
      postal_code,
      city,
      state_province,
      country_id,
    ],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.json(result.rowCount);
    }
  );
});

app.put(`/locations/:id`, (req, res) => {
  const id = req.params.id;
  const { street_address, postal_code, city, state_province, country_id } =
    req.body;

  pool.query(
    `UPDATE locations SET street_address = $1, postal_code = $2, city = $3, state_province = $4, country_id = $5 WHERE location_id = $6`,
    [street_address, postal_code, city, state_province, country_id, id],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.json(result.rowCount);
    }
  );
});

app.delete(`/locations/:id`, (req, res) => {
  const id = req.params.id;
  pool.query(
    `DELETE FROM locations WHERE location_id = $1`,
    [id],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.json(result.rowCount);
    }
  );
});
