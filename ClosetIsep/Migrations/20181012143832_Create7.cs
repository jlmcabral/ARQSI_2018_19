using Microsoft.EntityFrameworkCore.Migrations;

namespace ClosetIsep.Migrations
{
    public partial class Create7 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Materiais_Acabamentos_AcabementoId",
                table: "Materiais");

            migrationBuilder.DropIndex(
                name: "IX_Materiais_AcabementoId",
                table: "Materiais");

            migrationBuilder.DropColumn(
                name: "AcabementoId",
                table: "Materiais");

            migrationBuilder.AddColumn<long>(
                name: "MaterialId",
                table: "Acabamentos",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Acabamentos_MaterialId",
                table: "Acabamentos",
                column: "MaterialId");

            migrationBuilder.AddForeignKey(
                name: "FK_Acabamentos_Materiais_MaterialId",
                table: "Acabamentos",
                column: "MaterialId",
                principalTable: "Materiais",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Acabamentos_Materiais_MaterialId",
                table: "Acabamentos");

            migrationBuilder.DropIndex(
                name: "IX_Acabamentos_MaterialId",
                table: "Acabamentos");

            migrationBuilder.DropColumn(
                name: "MaterialId",
                table: "Acabamentos");

            migrationBuilder.AddColumn<long>(
                name: "AcabementoId",
                table: "Materiais",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Materiais_AcabementoId",
                table: "Materiais",
                column: "AcabementoId");

            migrationBuilder.AddForeignKey(
                name: "FK_Materiais_Acabamentos_AcabementoId",
                table: "Materiais",
                column: "AcabementoId",
                principalTable: "Acabamentos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
