using Microsoft.EntityFrameworkCore.Migrations;

namespace ClosetIsep.Migrations
{
    public partial class Create15 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Dimensoes_Produtos_ProdutoId",
                table: "Dimensoes");

            migrationBuilder.DropIndex(
                name: "IX_Dimensoes_ProdutoId",
                table: "Dimensoes");

            migrationBuilder.DropColumn(
                name: "ProdutoId",
                table: "Dimensoes");

            migrationBuilder.AlterColumn<string>(
                name: "Nome",
                table: "Restricoes",
                nullable: true,
                oldClrType: typeof(string));

            migrationBuilder.AddColumn<long>(
                name: "DimensaoId",
                table: "Produtos",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Nome",
                table: "Materiais",
                nullable: true,
                oldClrType: typeof(string));

            migrationBuilder.AlterColumn<string>(
                name: "Tipo",
                table: "Dimensoes",
                nullable: true,
                oldClrType: typeof(string));

            migrationBuilder.AlterColumn<string>(
                name: "Nome",
                table: "Acabamentos",
                nullable: true,
                oldClrType: typeof(string));

            migrationBuilder.CreateIndex(
                name: "IX_Produtos_DimensaoId",
                table: "Produtos",
                column: "DimensaoId");

            migrationBuilder.AddForeignKey(
                name: "FK_Produtos_Dimensoes_DimensaoId",
                table: "Produtos",
                column: "DimensaoId",
                principalTable: "Dimensoes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Produtos_Dimensoes_DimensaoId",
                table: "Produtos");

            migrationBuilder.DropIndex(
                name: "IX_Produtos_DimensaoId",
                table: "Produtos");

            migrationBuilder.DropColumn(
                name: "DimensaoId",
                table: "Produtos");

            migrationBuilder.AlterColumn<string>(
                name: "Nome",
                table: "Restricoes",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Nome",
                table: "Materiais",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Tipo",
                table: "Dimensoes",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AddColumn<long>(
                name: "ProdutoId",
                table: "Dimensoes",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AlterColumn<string>(
                name: "Nome",
                table: "Acabamentos",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Dimensoes_ProdutoId",
                table: "Dimensoes",
                column: "ProdutoId");

            migrationBuilder.AddForeignKey(
                name: "FK_Dimensoes_Produtos_ProdutoId",
                table: "Dimensoes",
                column: "ProdutoId",
                principalTable: "Produtos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
