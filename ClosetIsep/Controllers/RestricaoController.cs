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
    public class RestricaoController : ControllerBase
    {
        private readonly ArqsiContext _context;

        public RestricaoController(ArqsiContext context)
        {
            _context = context;
        }

        // GET: api/Restricao
        [HttpGet]
        public IEnumerable<Restricao> GetRestricao()
        {
            return _context.Restricoes;
        }

        // GET: api/Restricao/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetRestricao([FromRoute] long id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var restricao = await _context.Restricoes.FindAsync(id);

            if (restricao == null)
            {
                return NotFound();
            }

            return Ok(restricao);
        }

        // PUT: api/Restricao/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRestricao([FromRoute] long id, [FromBody] Restricao restricao)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != restricao.Id)
            {
                return BadRequest();
            }

            _context.Entry(restricao).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RestricaoExists(id))
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

        // POST: api/Restricao
        [HttpPost]
        public async Task<IActionResult> PostRestricao([FromBody] Restricao restricao)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Restricoes.Add(restricao);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRestricao", new { id = restricao.Id }, restricao);
        }

        // DELETE: api/Restricao/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRestricao([FromRoute] long id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var restricao = await _context.Restricoes.FindAsync(id);
            if (restricao == null)
            {
                return NotFound();
            }

            _context.Restricoes.Remove(restricao);
            await _context.SaveChangesAsync();

            return Ok(restricao);
        }

        private bool RestricaoExists(long id)
        {
            return _context.Restricoes.Any(e => e.Id == id);
        }
    }
}