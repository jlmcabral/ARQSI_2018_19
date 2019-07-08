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
    public class CategoriaController : ControllerBase
    {
        private readonly ArqsiContext _context;

        public CategoriaController(ArqsiContext context)
        {
            _context = context;
        }

        // GET: api/Categoria
        [HttpGet]
        public IEnumerable<Categoria> GetCategorias()
        {
            return _context.Categorias;
        }

        // GET: api/Categoria/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCategoria([FromRoute] long id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var categoria = await _context.Categorias.Include(c => c.CategoriaPai).Select(c => new CategoriaDTO()
            {
                Id = c.Id,
                Nome = c.Nome,
                Descricao = c.Descricao,
                CategoriaPaiId = c.CategoriaPai == null ? 0 : c.CategoriaPai.Id,
                SubCategoriaId = _context.Categorias.Where(x => x.CategoriaPai.Id == c.Id).Select(l => l.Id).ToList()
            }).SingleOrDefaultAsync(c => c.Id == id);

            if (categoria == null)
            {
                return NotFound();
            }
            return Ok(categoria);
        }

        // PUT: api/Categoria/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCategoria([FromRoute] long id, [FromBody] CategoriaDTO categoriaDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var categoria = await _context.Categorias.FindAsync(id);
            categoria.Nome = categoriaDTO.Nome;
            categoria.Descricao = categoriaDTO.Descricao;
            categoria.CategoriaPai = categoriaDTO.CategoriaPaiId == 0 ? null : await _context.Categorias.FindAsync(categoriaDTO.CategoriaPaiId);

            _context.Entry(categoria).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CategoriaExists(id))
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

        // POST: api/Categoria
        [HttpPost]
        public async Task<IActionResult> PostCategoria([FromBody] CategoriaDTO categoriaDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var categoria = new Categoria
            {
                Nome = categoriaDTO.Nome,
                Descricao = categoriaDTO.Descricao,
                CategoriaPai = await _context.Categorias.FindAsync(categoriaDTO.CategoriaPaiId)
            };
            _context.Categorias.Add(categoria);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCategoria", new { id = categoria.Id }, categoria);
        }

        // DELETE: api/Categoria/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategoria([FromRoute] long id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var categoria = await _context.Categorias.FindAsync(id);
            if (categoria == null)
            {
                return NotFound();
            }

            _context.Categorias.Remove(categoria);
            await _context.SaveChangesAsync();

            return Ok(categoria);
        }

        private bool CategoriaExists(long id)
        {
            return _context.Categorias.Any(e => e.Id == id);
        }
    }
}