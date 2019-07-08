using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace ClosetIsep.DTOs
{
    public class DimensaoDTO
    {
        /*********************
        L - Largura
        A - Altura
        P - Profundidade
        *********************/
        public long Id { get; set; }
        public string Tipo { get; set; } 
        public double Lmax { get; set; }
        public double Lmin { get; set; }
        public double Amax { get; set; }
        public double Amin { get; set; }
        public double Pmax { get; set; }
        public double Pmin { get; set; }       
    }
}