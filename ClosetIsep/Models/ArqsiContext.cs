using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using ClosetIsep.Models;

namespace ClosetIsep.Models
{
    public class ArqsiContext : DbContext
    {

        public ArqsiContext(DbContextOptions<ArqsiContext> options)
            : base(options)
        { }
        public DbSet<Produto> Produtos { get; set; }
        public DbSet<Categoria> Categorias { get; set; }
        public DbSet<Material> Materiais { get; set; }
        public DbSet<Acabamento> Acabamentos { get; set; }
        public DbSet<Restricao> Restricoes { get; set; }
        public DbSet<Dimensao> Dimensoes { get; set; }
        
    }


}