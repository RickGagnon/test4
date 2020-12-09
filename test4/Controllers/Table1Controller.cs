using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using test4.Models;

namespace test4.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Table1Controller : ControllerBase
    {
        private readonly Atess1Context _context;

        public Table1Controller(Atess1Context context)
        {
            _context = context;
        }

        // GET: api/Table1
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Table1>>> GetTable1()
        {
            return await _context.Table1.ToListAsync();
        }

        // GET: api/Table1/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Table1>> GetTable1(string id)
        {
            var table1 = await _context.Table1.FindAsync(id);

            if (table1 == null)
            {
                return NotFound();
            }

            return table1;
        }

        // PUT: api/Table1/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTable1(string id, Table1 table1)
        {
            if (id != table1.Test1)
            {
                return BadRequest();
            }

            _context.Entry(table1).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Table1Exists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Table1
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Table1>> PostTable1(Table1 table1)
        {
            _context.Table1.Add(table1);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (Table1Exists(table1.Test1))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetTable1", new { id = table1.Test1 }, table1);
        }

        // DELETE: api/Table1/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Table1>> DeleteTable1(string id)
        {
            var table1 = await _context.Table1.FindAsync(id);
            if (table1 == null)
            {
                return NotFound();
            }

            _context.Table1.Remove(table1);
            await _context.SaveChangesAsync();

            return table1;
        }

        private bool Table1Exists(string id)
        {
            return _context.Table1.Any(e => e.Test1 == id);
        }
    }
}
