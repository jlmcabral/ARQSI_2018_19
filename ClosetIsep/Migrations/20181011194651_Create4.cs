using Microsoft.EntityFrameworkCore.Migrations;

namespace ClosetIsep.Migrations
{
    public partial class Create4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Material_Acabamento_AcabementoId",
                table: "Material");

            migrationBuilder.DropForeignKey(
                name: "FK_Material_Produtos_ProdutoId",
                table: "Material");

            migrationBuilder.DropForeignKey(
                name: "FK_Restricao_Produtos_ProdutoId",
                table: "Restricao");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Restricao",
                table: "Restricao");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Material",
                table: "Material");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Acabamento",
                table: "Acabamento");

            migrationBuilder.RenameTable(
                name: "Restricao",
                newName: "Restricoes");

            migrationBuilder.RenameTable(
                name: "Material",
                newName: "Materiais");

            migrationBuilder.RenameTable(
                name: "Acabamento",
                newName: "Acabamentos");

            migrationBuilder.RenameIndex(
                name: "IX_Restricao_ProdutoId",
                table: "Restricoes",
                newName: "IX_Restricoes_ProdutoId");

            migrationBuilder.RenameIndex(
                name: "IX_Material_ProdutoId",
                table: "Materiais",
                newName: "IX_Materiais_ProdutoId");

            migrationBuilder.RenameIndex(
                name: "IX_Material_AcabementoId",
                table: "Materiais",
                newName: "IX_Materiais_AcabementoId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Restricoes",
                table: "Restricoes",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Materiais",
                table: "Materiais",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Acabamentos",
                table: "Acabamentos",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Materiais_Acabamentos_AcabementoId",
                table: "Materiais",
                column: "AcabementoId",
                principalTable: "Acabamentos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Materiais_Produtos_ProdutoId",
                table: "Materiais",
                column: "ProdutoId",
                principalTable: "Produtos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Restricoes_Produtos_ProdutoId",
                table: "Restricoes",
                column: "ProdutoId",
                principalTable: "Produtos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Materiais_Acabamentos_AcabementoId",
                table: "Materiais");

            migrationBuilder.DropForeignKey(
                name: "FK_Materiais_Produtos_ProdutoId",
                table: "Materiais");

            migrationBuilder.DropForeignKey(
                name: "FK_Restricoes_Produtos_ProdutoId",
                table: "Restricoes");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Restricoes",
                table: "Restricoes");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Materiais",
                table: "Materiais");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Acabamentos",
                table: "Acabamentos");

            migrationBuilder.RenameTable(
                name: "Restricoes",
                newName: "Restricao");

            migrationBuilder.RenameTable(
                name: "Materiais",
                newName: "Material");

            migrationBuilder.RenameTable(
                name: "Acabamentos",
                newName: "Acabamento");

            migrationBuilder.RenameIndex(
                name: "IX_Restricoes_ProdutoId",
                table: "Restricao",
                newName: "IX_Restricao_ProdutoId");

            migrationBuilder.RenameIndex(
                name: "IX_Materiais_ProdutoId",
                table: "Material",
                newName: "IX_Material_ProdutoId");

            migrationBuilder.RenameIndex(
                name: "IX_Materiais_AcabementoId",
                table: "Material",
                newName: "IX_Material_AcabementoId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Restricao",
                table: "Restricao",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Material",
                table: "Material",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Acabamento",
                table: "Acabamento",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Material_Acabamento_AcabementoId",
                table: "Material",
                column: "AcabementoId",
                principalTable: "Acabamento",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Material_Produtos_ProdutoId",
                table: "Material",
                column: "ProdutoId",
                principalTable: "Produtos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Restricao_Produtos_ProdutoId",
                table: "Restricao",
                column: "ProdutoId",
                principalTable: "Produtos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
