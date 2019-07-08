using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ClosetIsep.Models;

namespace ClosetIsep.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AcabamentoController : ControllerBase
    {
        private readonly ArqsiContext _context;

        public AcabamentoController(ArqsiContext context)
        {
            _context = context;
        }

        // GET: api/Acabamento
        [HttpGet]
        public IEnumerable<Acabamento> GetAcabamento()
        {
            return _context.Acabamentos;
        }

        // GET: api/Acabamento/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetAcabamento([FromRoute] long id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var acabamento = await _context.Acabamentos.FindAsync(id);

            if (acabamento == null)
            {
                return NotFound();
            }

            return Ok(acabamento);
        }

        // PUT: api/Acabamento/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAcabamento([FromRoute] long id, [FromBody] Acabamento acabamento)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != acabamento.Id)
            {
                return BadRequest();
            }

            _context.Entry(acabamento).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AcabamentoExists(id))
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

        // POST: api/Acabamento
        [HttpPost]
        public async Task<IActionResult> PostAcabamento([FromBody] Acabamento acabamento)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Acabamentos.Add(acabamento);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAcabamento", new { id = acabamento.Id }, acabamento);
        }

        // DELETE: api/Acabamento/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAcabamento([FromRoute] long id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var acabamento = await _context.Acabamentos.FindAsync(id);
            if (acabamento == null)
            {
                return NotFound();
            }

            _context.Acabamentos.Remove(acabamento);
            await _context.SaveChangesAsync();

            return Ok(acabamento);
        }

        private bool AcabamentoExists(long id)
        {
            return _context.Acabamentos.Any(e => e.Id == id);
        }
    }
}