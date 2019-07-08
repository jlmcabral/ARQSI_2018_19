using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ClosetIsep.Models;
using ClosetIsep.DTOs;

namespace ClosetIsep.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DimensaoController : ControllerBase
    {
        private readonly ArqsiContext _context;

        public DimensaoController(ArqsiContext context)
        {
            _context = context;
        }

        // GET: api/Dimensao
        [HttpGet]
        public IEnumerable<Dimensao> GetDimensoes()
        {
            return _context.Dimensoes;
        }

        // GET: api/Dimensao/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetDimensao([FromRoute] long id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var dimensao = await _context.Dimensoes.FindAsync(id);

            if (dimensao == null)
            {
                return NotFound();
            }

            return Ok(dimensao);
        }

        // PUT: api/Dimensao/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDimensao([FromRoute] long id, [FromBody] Dimensao dimensao)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != dimensao.Id)
            {
                return BadRequest();
            }

            _context.Entry(dimensao).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DimensaoExists(id))
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

        // POST: api/Dimensao
        [HttpPost]
        public async Task<IActionResult> PostDimensao([FromBody] Dimensao dimensao)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Dimensoes.Add(dimensao);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDimensao", new { id = dimensao.Id }, dimensao);
        }

        // DELETE: api/Dimensao/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDimensao([FromRoute] long id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var dimensao = await _context.Dimensoes.FindAsync(id);
            if (dimensao == null)
            {
                return NotFound();
            }

            _context.Dimensoes.Remove(dimensao);
            await _context.SaveChangesAsync();

            return Ok(dimensao);
        }

        private bool DimensaoExists(long id)
        {
            return _context.Dimensoes.Any(e => e.Id == id);
        }
    }
}