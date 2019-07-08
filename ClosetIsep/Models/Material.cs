using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace ClosetIsep.Models
{
    public class Material
    {
        public long Id { get; set; }
        public string Nome { get; set; }
        public virtual ICollection<Acabamento> Acabamento { get; set;}

    }

}