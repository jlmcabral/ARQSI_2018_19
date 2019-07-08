using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace ClosetIsep.Models
{   
    /*********************
        L - Largura
        A - Altura
        P - Profundidade
    *********************/
    public class Dimensao
    {
        public long Id { get; set; }
        public string Tipo { get; set; } //string com o valor 'Disc' ou 'Cont'
        public double Lmax { get; set; }
        public double Lmin { get; set; }
        public double Amax { get; set; }
        public double Amin { get; set; }
        public double Pmax { get; set; }
        public double Pmin { get; set; }
    }
}