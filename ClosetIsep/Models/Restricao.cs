using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace ClosetIsep.Models
{
    public class Restricao
    {
        public long Id { get; set; }
        public  string Nome { get; set; }
    }
}