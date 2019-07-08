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
    public class ProdutoController : ControllerBase
    {
        private readonly ArqsiContext _context;

        public ProdutoController(ArqsiContext context)
        {
            _context = context;
        }

        // GET: api/Produto
        [HttpGet]
        public IEnumerable<ProdutoDTO> GetProdutoDTOs([FromQuery(Name = "nome")] String nome)
        {
            if (nome != null)
            {
                return _context.Produtos.Where(p => p.Nome == nome).Select(p => new ProdutoDTO()
                {
                    Id = p.Id,
                    Nome = p.Nome,
                    Descricao = p.Descricao,
                    Preco = p.Preco,
                    // Obrigatorio = p.Obrigatorio,    
                    CategoriaId = p.Categoria == null ? 0 : p.Categoria.Id,
                    DimensaoId = p.Dimensao == null ? 0 : p.Dimensao.Id,
                    ProdutoId = p.Produtos.Select(x => x.Id).ToList(),
                    MaterialId = p.Materiais.Select(x => x.Id).ToList(),
                    RestricaoId = p.Restricoes.Select(x => x.Id).ToList()
                });
            }
            return _context.Produtos.Select(p => new ProdutoDTO()
            {
                Id = p.Id,
                Nome = p.Nome,
                Descricao = p.Descricao,
                Preco = p.Preco,
                // Obrigatorio = p.Obrigatorio,                    
                CategoriaId = p.Categoria == null ? 0 : p.Categoria.Id,
                DimensaoId = p.Dimensao == null ? 0 : p.Dimensao.Id,
                ProdutoId = p.Produtos.Select(x => x.Id).ToList(),
                MaterialId = p.Materiais.Select(x => x.Id).ToList(),
                RestricaoId = p.Restricoes.Select(x => x.Id).ToList()
            });
        }

        // GET: api/Produto/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProduto([FromRoute] long id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var produto = await _context.Produtos.Select(p => new ProdutoDTO()
            {
                Id = p.Id,
                Nome = p.Nome,
                Descricao = p.Descricao,
                Preco = p.Preco,
                // Obrigatorio = p.Obrigatorio,
                CategoriaId = p.Categoria == null ? 0 : p.Categoria.Id,
                DimensaoId = p.Dimensao == null ? 0 : p.Dimensao.Id,
                ProdutoId = p.Produtos.Select(x => x.Id).ToList(),
                MaterialId = p.Materiais.Select(x => x.Id).ToList(),
                RestricaoId = p.Restricoes.Select(x => x.Id).ToList()
            }).SingleOrDefaultAsync(p => p.Id == id);
            if (produto == null)
            {
                return NotFound();
            }

            return Ok(produto);
        }


        // GET: api/Produto/{id}/Restricao
        [HttpGet("{id}/Restricao")]
        public async Task<IActionResult> GetProdutoRestricao([FromRoute] long id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var produto = await _context.Produtos.Select(p => new ProdutoDTO()
            {
                Id = p.Id,
                RestricaoId = p.Restricoes.Select(x => x.Id).ToList()
            }).SingleOrDefaultAsync(p => p.Id == id);
            if (produto == null)
            {
                return NotFound();
            }
            var result = produto.RestricaoId.Select(r => _context.Restricoes.Select(p => new RestricaoDTO()
            {
                Id = p.Id,
                Nome = p.Nome,
            }).SingleOrDefault(x => x.Id == r));

            return Ok(result);
        }

        // GET: api/Produto/{id}/Partes
        [HttpGet("{id}/Partes")]
        public async Task<IActionResult> GetProdutoPartes([FromRoute] long id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var produto = await _context.Produtos.Select(p => new ProdutoDTO()
            {
                Id = p.Id,
                ProdutoId = p.Produtos.Select(x => x.Id).ToList(),
            }).SingleOrDefaultAsync(p => p.Id == id);
            if (produto == null)
            {
                return NotFound();
            }
            var result = produto.ProdutoId.Select(r => _context.Produtos.Select(p => new ProdutoDTO()
            {
                Id = p.Id,
                Nome = p.Nome,
                Descricao = p.Descricao,
                Preco = p.Preco,
                // Obrigatorio = p.Obrigatorio,
                CategoriaId = p.Categoria == null ? 0 : p.Categoria.Id,
                DimensaoId = p.Dimensao == null ? 0 : p.Dimensao.Id,
                ProdutoId = p.Produtos.Select(x => x.Id).ToList(),
                MaterialId = p.Materiais.Select(x => x.Id).ToList(),
                RestricaoId = p.Restricoes.Select(x => x.Id).ToList()
            }).SingleOrDefault(x => x.Id == r));
            return Ok(result);
        }

        // GET: api/Produto/{id}/PartesEm
        [HttpGet("{id}/PartesEm")]
        public async Task<IActionResult> GetProdutoPartesEm([FromRoute] long id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var produto = await _context.Produtos.Select(p => new ProdutoDTO()
            {
                Id = p.Id
            }).SingleOrDefaultAsync(p => p.Id == id);
            if (produto == null)
            {
                return NotFound();
            }
            var result = _context.Produtos.Select(p => new ProdutoDTO()
            {
                Id = p.Id,
                Nome = p.Nome,
                Descricao = p.Descricao,
                Preco = p.Preco,
                // Obrigatorio = p.Obrigatorio,
                CategoriaId = p.Categoria == null ? 0 : p.Categoria.Id,
                DimensaoId = p.Dimensao == null ? 0 : p.Dimensao.Id,
                ProdutoId = p.Produtos.Select(x => x.Id).ToList(),
                MaterialId = p.Materiais.Select(x => x.Id).ToList(),
                RestricaoId = p.Restricoes.Select(x => x.Id).ToList()
            }).Where(x => x.ProdutoId.Contains(produto.Id));
            return Ok(result);
        }

        // PUT: api/Produto/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProduto([FromRoute] long id, [FromBody] ProdutoDTO produtoDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var produto = await _context.Produtos.FindAsync(id);
            produto.Nome = produtoDTO.Nome;
            produto.Descricao = produtoDTO.Descricao;
            produto.Preco = produtoDTO.Preco;
            // produto.Obrigatorio = produtoDTO.Obrigatorio;
            produto.Categoria = produtoDTO.CategoriaId == 0 ? null : await _context.Categorias.FindAsync(produtoDTO.CategoriaId);
            produto.Dimensao = produtoDTO.DimensaoId == 0 ? null : await _context.Dimensoes.FindAsync(produtoDTO.DimensaoId);
            produto.Materiais = produtoDTO.MaterialId.Select(Id => _context.Materiais.Find(Id)).Where(x => x != null).ToList();
            produto.Restricoes = produtoDTO.RestricaoId.Select(Id => _context.Restricoes.Find(Id)).Where(x => x != null).ToList();
            produto.Produtos = produtoDTO.ProdutoId.Select(Id => _context.Produtos.Find(Id)).Where(x => x != null).ToList();

            /* -------------------------------------- */
            /* Get dimensao from each producto "sons" */
            /* -------------------------------------- */
            var produtoFilhoList = produto.Produtos.ToList();
            
            foreach(Produto p in produtoFilhoList)
            {
                var valDimensoes = produto.Produtos.Select(r => _context.Dimensoes.SingleOrDefault(x => x.Id == p.Id));
                
                foreach(Dimensao d in valDimensoes){
                    var Amax = d.Amax;
                    var Amin = d.Amin;
                    var Lmax = d.Lmax;
                    var Lmin = d.Lmin;
                    var Pmax = d.Pmax;
                    var Pmin = d.Pmin;

                    if( !(!(produto.Dimensao.Amin <= Amin && produto.Dimensao.Amax >= Amax) ||
                    !(produto.Dimensao.Amin >= Amin && Amin >= produto.Dimensao.Amin) ||
                    !(Amax >= produto.Dimensao.Amax && produto.Dimensao.Amax >= Amin))
                     ){
                        return BadRequest();
                    }
                    if( !(!(produto.Dimensao.Lmin <= Lmin && produto.Dimensao.Lmax >= Lmax) ||
                    !(produto.Dimensao.Lmin >= Lmin && Lmin >= produto.Dimensao.Lmin) ||
                    !(Lmax >= produto.Dimensao.Lmax && produto.Dimensao.Lmax >= Lmin))
                     ){
                        return BadRequest();
                    }
                    if( !(!(produto.Dimensao.Pmin <= Pmin && produto.Dimensao.Pmax >= Pmax) ||
                    !(produto.Dimensao.Pmin >= Pmin && Pmin >= produto.Dimensao.Pmin) ||
                    !(Pmax >= produto.Dimensao.Pmax && produto.Dimensao.Pmax >= Pmin))
                     ){
                        return BadRequest();
                    }
                }
            }

            _context.Entry(produto).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProdutoExists(id))
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

        // POST: api/Produto
        [HttpPost]
        public async Task<IActionResult> PostProduto([FromBody] ProdutoDTO produtoDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var produto = new Produto
            {   
                Nome = produtoDTO.Nome,
                Descricao = produtoDTO.Descricao,
                Preco = produtoDTO.Preco,
                // Obrigatorio = produtoDTO.Obrigatorio,
                Categoria = await _context.Categorias.FindAsync(produtoDTO.CategoriaId),
                Dimensao = await _context.Dimensoes.FindAsync(produtoDTO.DimensaoId),
                Materiais = produtoDTO.MaterialId.Select(Id => _context.Materiais.Find(Id)).Where(x => x != null).ToList(),
                Restricoes = produtoDTO.RestricaoId.Select(Id => _context.Restricoes.Find(Id)).Where(x => x != null).ToList(),
                Produtos = produtoDTO.ProdutoId.Select(Id => _context.Produtos.Find(Id)).Where(x => x != null).ToList()
            };

            /* -------------------------------------- */
            /* Get dimensao from each producto "sons" */
            /* -------------------------------------- */
            var produtoFilhoList = produto.Produtos.ToList();
            
            foreach(Produto p in produtoFilhoList)
            {
                var valDimensoes = produto.Produtos.Select(r => _context.Dimensoes.SingleOrDefault(x => x.Id == p.Id));
                
                foreach(Dimensao d in valDimensoes){
                    var Amax = d.Amax;
                    var Amin = d.Amin;
                    var Lmax = d.Lmax;
                    var Lmin = d.Lmin;
                    var Pmax = d.Pmax;
                    var Pmin = d.Pmin;

                    if( !(!(produto.Dimensao.Amin <= Amin && produto.Dimensao.Amax >= Amax) ||
                    !(produto.Dimensao.Amin >= Amin && Amin >= produto.Dimensao.Amin) ||
                    !(Amax >= produto.Dimensao.Amax && produto.Dimensao.Amax >= Amin))
                     ){
                        return BadRequest();
                    }
                    if( !(!(produto.Dimensao.Lmin <= Lmin && produto.Dimensao.Lmax >= Lmax) ||
                    !(produto.Dimensao.Lmin >= Lmin && Lmin >= produto.Dimensao.Lmin) ||
                    !(Lmax >= produto.Dimensao.Lmax && produto.Dimensao.Lmax >= Lmin))
                     ){
                        return BadRequest();
                    }
                    if( !(!(produto.Dimensao.Pmin <= Pmin && produto.Dimensao.Pmax >= Pmax) ||
                    !(produto.Dimensao.Pmin >= Pmin && Pmin >= produto.Dimensao.Pmin) ||
                    !(Pmax >= produto.Dimensao.Pmax && produto.Dimensao.Pmax >= Pmin))
                     ){
                        return BadRequest();
                    }
                }
            }

            _context.Produtos.Add(produto);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProduto", new { id = produto.Id }, produto);
        }
        // DELETE: api/Produto/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduto([FromRoute] long id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var produto = await _context.Produtos.FindAsync(id);
            if (produto == null)
            {
                return NotFound();
            }

            _context.Produtos.Remove(produto);
            await _context.SaveChangesAsync();

            return Ok(produto);
        }

        private bool ProdutoExists(long id)
        {
            return _context.Produtos.Any(e => e.Id == id);
        }
    }
}



// /* -------------------------------------- */
//             /* Get dimensao from each producto "sons" */
//             /* -------------------------------------- */
//             var produtoFilhoList = produto.Produtos.ToList();

//             // var teste = _context.Dimensoes.Where(x => x.Id == 1);
            
//             foreach(Produto p in produtoFilhoList)
//             {
//                 var cenas = produto.Produtos.Select(r => _context.Dimensoes.SingleOrDefault(x => x.Id == p.Id));
                
//                 foreach(Dimensao d in cenas){
//                     var t = d.Amax;
//                 }
//                 // var produtofilho = await _context.Produtos.FindAsync(y.Id);
//                 // var Amax = produtofilho.Dimensao.Amax;   
//             }
                    //!(!(produto.Dimensao.Amin <= Amin && produto.Dimensao.Amax >= Amax) ||
                    // !(produto.Dimensao.Amin >= Amin && Amin >= produto.Dimensao.Amin) ||
                    // !(Amax >= produto.Dimensao.Amax && produto.Dimensao.Amax >= Amin))  