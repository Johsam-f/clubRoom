# How to Run a `.sql` File in PostgreSQL

To execute a `.sql` script file from your terminal using `psql`:

```bash
psql -U your_username -d your_database -f path/to/yourfile.sql
```

---

## Example

```bash
psql -U johsam -d clubroom -f schema.sql
```

---

## Explanation of Flags

| Flag | Description                    |
| ---- | ------------------------------ |
| `-U` | PostgreSQL username            |
| `-d` | Name of the database           |
| `-f` | Path to the `.sql` script file |

---

## Alternative (Inside psql Shell)

If you're already inside the PostgreSQL shell:

```sql
\i path/to/yourfile.sql
```

---

## Notes

- Ensure the database exists before running the script.
- If your operating system username matches your PostgreSQL user, you may omit `-U`.
- Use absolute or relative file paths based on your current working directory.

---

## Tip

If you see a permission error when using `\i`, make sure the file is readable and located where your PostgreSQL session can access it.
