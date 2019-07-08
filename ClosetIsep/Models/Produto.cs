using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;


namespace ClosetIsep.Models
{
    public class Produto
    {
        public long Id { get; set; }
        public string Nome { get; set; }
        public string Descricao { get; set; }
        public double Preco { get; set; }
        public bool Obrigatorio { get; set; }
        public virtual Categoria Categoria { get; set; }
        public virtual Dimensao Dimensao { get; set; }
        public virtual ICollection<Material> Materiais { get; set; }
        public virtual ICollection<Restricao> Restricoes { get; set; }
        public virtual ICollection<Produto> Produtos { get; set; }

    }
}