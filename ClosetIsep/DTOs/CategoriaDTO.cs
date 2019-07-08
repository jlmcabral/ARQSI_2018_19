using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace ClosetIsep.DTOs
{
    public class CategoriaDTO
    {
        public long Id { get; set; }
        public string Nome { get; set; }
        public string Descricao { get; set; }
        public long CategoriaPaiId { get; set; }
        public ICollection<long> SubCategoriaId { get; set; }

    }
}