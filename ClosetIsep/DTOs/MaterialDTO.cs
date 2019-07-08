using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace ClosetIsep.DTOs
{
    public class MaterialDTO
    {
        public long Id { get; set; }
        public string Nome { get; set; }
        public ICollection<long> AcabamentoId { get; set;}
       
    }
}