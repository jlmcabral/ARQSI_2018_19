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
    public class MaterialController : ControllerBase
    {
        private readonly ArqsiContext _context;

        public MaterialController(ArqsiContext context)
        {
            _context = context;
        }

        // GET: api/Material
        [HttpGet]
        public IEnumerable<MaterialDTO> GetMaterialDTOs([FromQuery(Name = "nome")] String nome)
        {
            if (nome != null)
            {
                return _context.Materiais.Where(m => m.Nome == nome).Select(m => new MaterialDTO()
                {
                    Id = m.Id,
                    Nome = m.Nome,
                    AcabamentoId = m.Acabamento.Select(x => x.Id).ToList()
                });

            }
            return _context.Materiais.Select(m => new MaterialDTO()
            {
                Id = m.Id,
                Nome = m.Nome,
                AcabamentoId = m.Acabamento.Select(x => x.Id).ToList()
            });
        }

        // GET: api/Material/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetMaterial([FromRoute] long id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var material = await _context.Materiais.Select(m => new MaterialDTO()
            {
                Id = m.Id,
                Nome = m.Nome,
                AcabamentoId = m.Acabamento.Select(x => x.Id).ToList()
            }).SingleOrDefaultAsync(m => m.Id == id);

            if (material == null)
            {
                return NotFound();
            }

            return Ok(material);
        }

        // PUT: api/Material/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMaterial([FromRoute] long id, [FromBody] MaterialDTO materialDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var material = await _context.Materiais.FindAsync(id);
            material.Nome = materialDTO.Nome;
            material.Acabamento = materialDTO.AcabamentoId.Select(Id => _context.Acabamentos.Find(Id)).Where(x => x != null).ToList();
            _context.Entry(material).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MaterialExists(id))
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

        // POST: api/Material
        [HttpPost]
        public async Task<IActionResult> PostMaterial([FromBody] MaterialDTO materialDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var material = new Material
            {
                Nome = materialDTO.Nome,
                Acabamento = materialDTO.AcabamentoId.Select(Id => _context.Acabamentos.Find(Id)).Where(x => x != null).ToList()
            };
            _context.Materiais.Add(material);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMaterial", new { id = material.Id }, material);
        }

        // DELETE: api/Material/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMaterial([FromRoute] long id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var material = await _context.Materiais.FindAsync(id);
            if (material == null)
            {
                return NotFound();
            }

            _context.Materiais.Remove(material);
            await _context.SaveChangesAsync();

            return Ok(material);
        }

        private bool MaterialExists(long id)
        {
            return _context.Materiais.Any(e => e.Id == id);
        }
    }
}