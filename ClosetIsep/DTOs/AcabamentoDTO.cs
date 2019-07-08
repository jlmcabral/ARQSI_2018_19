using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace ClosetIsep.DTOs
{
    public class AcabamentoDTO
    {
        public long Id { get; set; }
        public string Nome { get; set; }       
    }
}