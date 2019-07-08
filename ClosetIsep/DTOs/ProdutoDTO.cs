using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace ClosetIsep.DTOs
{
    public class ProdutoDTO
    {
        public long Id { get; set; }
        public string Nome { get; set; }
        public string Descricao { get; set; }
        public double Preco { get; set; }
        public bool Obrigatorio { get; set; }
        public long CategoriaId { get; set; }
        public long DimensaoId { get; set; }
        public ICollection<long> ProdutoId { get; set; }
        public ICollection<long> MaterialId { get; set; }
        public ICollection<long> RestricaoId { get; set; }
    }
}