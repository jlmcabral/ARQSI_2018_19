﻿// <auto-generated />
using System;
using ClosetIsep.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace ClosetIsep.Migrations
{
    [DbContext(typeof(ArqsiContext))]
    [Migration("20181108115058_Create16")]
    partial class Create16
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.3-rtm-32065")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("ClosetIsep.Models.Acabamento", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<long?>("MaterialId");

                    b.Property<string>("Nome");

                    b.HasKey("Id");

                    b.HasIndex("MaterialId");

                    b.ToTable("Acabamentos");
                });

            modelBuilder.Entity("ClosetIsep.Models.Categoria", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<long?>("CategoriaPaiId");

                    b.Property<string>("Descricao");

                    b.Property<string>("Nome");

                    b.HasKey("Id");

                    b.HasIndex("CategoriaPaiId");

                    b.ToTable("Categorias");
                });

            modelBuilder.Entity("ClosetIsep.Models.Dimensao", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<double>("Amax");

                    b.Property<double>("Amin");

                    b.Property<double>("Lmax");

                    b.Property<double>("Lmin");

                    b.Property<double>("Pmax");

                    b.Property<double>("Pmin");

                    b.Property<string>("Tipo");

                    b.HasKey("Id");

                    b.ToTable("Dimensoes");
                });

            modelBuilder.Entity("ClosetIsep.Models.Material", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Nome");

                    b.Property<long?>("ProdutoId");

                    b.HasKey("Id");

                    b.HasIndex("ProdutoId");

                    b.ToTable("Materiais");
                });

            modelBuilder.Entity("ClosetIsep.Models.Produto", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<long?>("CategoriaId");

                    b.Property<string>("Descricao");

                    b.Property<long?>("DimensaoId");

                    b.Property<string>("Nome");

                    b.Property<double>("Preco");

                    b.Property<long?>("ProdutoId");

                    b.HasKey("Id");

                    b.HasIndex("CategoriaId");

                    b.HasIndex("DimensaoId");

                    b.HasIndex("ProdutoId");

                    b.ToTable("Produtos");
                });

            modelBuilder.Entity("ClosetIsep.Models.Restricao", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Nome");

                    b.Property<long?>("ProdutoId");

                    b.HasKey("Id");

                    b.HasIndex("ProdutoId");

                    b.ToTable("Restricoes");
                });

            modelBuilder.Entity("ClosetIsep.Models.Acabamento", b =>
                {
                    b.HasOne("ClosetIsep.Models.Material")
                        .WithMany("Acabamento")
                        .HasForeignKey("MaterialId");
                });

            modelBuilder.Entity("ClosetIsep.Models.Categoria", b =>
                {
                    b.HasOne("ClosetIsep.Models.Categoria", "CategoriaPai")
                        .WithMany()
                        .HasForeignKey("CategoriaPaiId");
                });

            modelBuilder.Entity("ClosetIsep.Models.Material", b =>
                {
                    b.HasOne("ClosetIsep.Models.Produto")
                        .WithMany("Materiais")
                        .HasForeignKey("ProdutoId");
                });

            modelBuilder.Entity("ClosetIsep.Models.Produto", b =>
                {
                    b.HasOne("ClosetIsep.Models.Categoria", "Categoria")
                        .WithMany()
                        .HasForeignKey("CategoriaId");

                    b.HasOne("ClosetIsep.Models.Dimensao", "Dimensao")
                        .WithMany()
                        .HasForeignKey("DimensaoId");

                    b.HasOne("ClosetIsep.Models.Produto")
                        .WithMany("Produtos")
                        .HasForeignKey("ProdutoId");
                });

            modelBuilder.Entity("ClosetIsep.Models.Restricao", b =>
                {
                    b.HasOne("ClosetIsep.Models.Produto")
                        .WithMany("Restricoes")
                        .HasForeignKey("ProdutoId");
                });
#pragma warning restore 612, 618
        }
    }
}
